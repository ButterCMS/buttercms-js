import { jest } from '@jest/globals';
import Butter from '../lib/butter.js';

const nativeFetch = global.fetch;
const nativeTimeout = AbortSignal.timeout;
const nativeAny = AbortSignal.any;

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
  global.fetch = nativeFetch;
  AbortSignal.timeout = nativeTimeout;
  AbortSignal.any = nativeAny;
  jest.useRealTimers();
});

function pendingFetch() {
  global.fetch = jest.fn((_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  }));
}

async function reachFetch() {
  for (let i = 0; i < 10 && !global.fetch.mock.calls.length; i++) await Promise.resolve();
  expect(global.fetch).toHaveBeenCalledTimes(1);
}

describe.each(['any', 'timeout'])('without AbortSignal.%s', (missing) => {
  beforeEach(() => { AbortSignal[missing] = undefined; });

  test('retrieves data and clears its timeout', async () => {
    global.fetch = jest.fn(async () => new Response(JSON.stringify({ data: 'example' })));
    const result = await Butter('api_token').page.retrieve('*', 'example');
    expect(result.data).toEqual({ data: 'example' });
    expect(jest.getTimerCount()).toBe(0);
    await jest.runAllTimersAsync();
  });

  test('times out an unfinished request', async () => {
    pendingFetch();
    const request = Butter('api_token', { timeout: 25 }).page.retrieve('*', 'example');
    const rejected = expect(request).rejects.toThrow('Request timed out after 25ms.');
    await reachFetch();
    await jest.advanceTimersByTimeAsync(25);
    await rejected;
    expect(jest.getTimerCount()).toBe(0);
  });

  test('cancels a request and clears its timeout', async () => {
    pendingFetch();
    const client = Butter('api_token', { timeout: 25 });
    const request = client.page.retrieve('*', 'example');
    const rejected = expect(request).rejects.toThrow('Request cancelled');
    await reachFetch();
    client.page.cancelRequest();
    await rejected;
    expect(jest.getTimerCount()).toBe(0);
    await jest.runAllTimersAsync();
  });

  test('clears its timeout after a network error', async () => {
    global.fetch = jest.fn(async () => { throw new Error('offline'); });
    await expect(Butter('api_token').page.retrieve('*', 'example')).rejects.toThrow('offline');
    expect(jest.getTimerCount()).toBe(0);
    await jest.runAllTimersAsync();
  });
});

test('uses the native combined signal when both methods are available', async () => {
  const timeoutSignal = new AbortController().signal;
  const combinedSignal = new AbortController().signal;
  AbortSignal.timeout = jest.fn(() => timeoutSignal);
  AbortSignal.any = jest.fn(() => combinedSignal);
  global.fetch = jest.fn(async () => new Response('{}'));
  await Butter('api_token', { timeout: 25 }).page.retrieve('*', 'example');
  expect(AbortSignal.timeout).toHaveBeenCalledWith(25);
  expect(AbortSignal.any).toHaveBeenCalledWith([expect.any(AbortSignal), timeoutSignal]);
  expect(global.fetch.mock.calls[0][1].signal).toBe(combinedSignal);
  expect(jest.getTimerCount()).toBe(0);
});
