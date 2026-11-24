import { http, HttpResponse } from "msw";

import Butter from "../lib/butter.js";
import { server } from "../mocks/server.js";

const butter = Butter("api_token");

function captureRequestHeaders() {
  const captured = {};

  server.use(
    http.get("https://api.buttercms.com/v2/posts/", ({ request }) => {
      captured.headers = request.headers;

      return HttpResponse.json({ data: [], meta: {} });
    })
  );

  return captured;
}

test("should not send Content-Type on GET requests", async () => {
  const captured = captureRequestHeaders();

  await butter.post.list();

  expect(captured.headers.has("content-type")).toBe(false);
});

test("should send X-Butter-Client in Node.js", async () => {
  const captured = captureRequestHeaders();

  await butter.post.list();

  expect(captured.headers.get("x-butter-client")).toMatch(/^JS\//);
});

test("should not send X-Butter-Client outside Node.js", async () => {
  const captured = captureRequestHeaders();
  const versions = Object.getOwnPropertyDescriptor(process, "versions");

  Object.defineProperty(process, "versions", { value: {}, configurable: true });

  try {
    await butter.post.list();
  } finally {
    Object.defineProperty(process, "versions", versions);
  }

  expect(captured.headers.has("x-butter-client")).toBe(false);
});
