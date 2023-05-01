const server = require('./mocks/server.js');

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
