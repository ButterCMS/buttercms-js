import fetch from '../lib/utilities/fetch'

import fetchMock from 'jest-fetch-mock'

// using spy to hide console logs from test output
jest.spyOn(console,'log').mockReturnValue()

describe('fetch', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('success', async () => {
    fetchMock.mockResponse(JSON.stringify({ hello: 'world' }));

    await fetch('https://example.co.uk', {}, 0)

    expect(fetchMock).toHaveBeenCalledWith('https://example.co.uk', {})
  })
  test('fail: zero retries', async () => {
    fetchMock.mockResponse('fail', {
      headers: { 'content-type': 'text/plain; charset=UTF-8' },
      status: 500,
      statusText: 'Whoops!'
    })

    await fetch('https://example.co.uk', {}, 0)

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
  test.only('fail: one retry', async () => {
    fetchMock.mockResponse('fail', {
      headers: { 'content-type': 'text/plain; charset=UTF-8' },
      status: 500,
      statusText: 'Whoops!'
    })

    await fetch('https://example.co.uk', {}, 1)

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
  test('fail: three retries', async () => {
    fetchMock.mockResponse('fail', {
      headers: { 'content-type': 'text/plain; charset=UTF-8' },
      status: 500,
      statusText: 'Whoops!'
    })

    await fetch('https://example.co.uk', {}, 3)

    expect(fetchMock).toHaveBeenCalledTimes(4)
  })
  test('fail: with one retry then success', async () => {
    fetchMock.mockResponses(
      [ 'fail', { status: 500, statusText: 'Whoops!' } ],
      [ 'success', { status: 200 } ]
    )

    const response = await fetch('https://example.co.uk', {}, 2)

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(response.ok).toBeTruthy()
  })
})