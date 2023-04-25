const msw = require("msw");
const page = require('./responses/page/page.json');
const pageList = require('./responses/page/list.json');

const singlePostHandler =
  msw.rest.get("https://api.buttercms.com/v2/pages/*/example-news-page/", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(page));
  })

const failedSinglePostHandler =
  msw.rest.get("https://api.buttercms.com/v2/pages/*/fake-post-slug/", (_, res, ctx) => {
    return res(ctx.status(401));
  })

const listPageHandler =
  msw.rest.get("https://api.buttercms.com/v2/pages/*/", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(pageList)
    )
  })

module.exports = [
  singlePostHandler,
  failedSinglePostHandler,
  listPageHandler,
];
