import Butter from '../lib/butter'

import fetchMock from 'jest-fetch-mock'

describe('ButterCMS Main Package', () => {
  test('initializes', () => {
    const butter = new Butter('123')
    expect(typeof butter).toBe('object')
  })

  test('throws error when undefined/invalid token passed', () => {
    // ignore ts warning so we can test non-ts environment where TS won't pickup missing token param
    // @ts-ignore
    expect(() => new Butter()).toThrow('ButterCMS API token not set')
    // ignore ts warning so we can test non-ts environment where TS won't pickup missing token param
    // @ts-ignore
    expect(() => new Butter(123)).toThrow('ButterCMS API token not set')
  })

  test('has expected resources defined', () => {
    const butter = new Butter('123')

    expect(typeof butter.author).toBe('object')
    expect(typeof butter.category).toBe('object')
    expect(typeof butter.content).toBe('object')
    expect(typeof butter.feed).toBe('object')
    expect(typeof butter.page).toBe('object')
    expect(typeof butter.post).toBe('object')
    expect(typeof butter.tag).toBe('object')
  })

  test('throws error on failure', async () => {
    fetchMock.mockResponse('fail', {
      status: 500
    });

    const butter = new Butter('123', undefined, undefined, { retries: 0 })
    
    await expect(async () => butter.post.list()).rejects.toThrowError('ButterCMS: Api Error, Status: INTERNAL SERVER ERROR')
  })
})