// require('jest-fetch-mock').enableMocks()

import { GlobalWithFetchMock } from 'jest-fetch-mock';

const customGlobal = global as unknown as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

jest.setMock('isomorphic-unfetch', fetch);
