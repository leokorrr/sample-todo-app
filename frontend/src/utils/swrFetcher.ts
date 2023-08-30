import { HTTPMethods } from '../types'

export const swrFetcher = (
  url: string,
  params: { method: HTTPMethods; body?: string } = { method: 'GET' }
) =>
  fetch(url, {
    ...params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())
