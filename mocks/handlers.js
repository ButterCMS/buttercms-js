import { http, HttpResponse } from 'msw'
import page from "./responses/page/page.json";
import pageList from "./responses/page/list.json";

const singlePostHandler = http.get(
  "https://api.buttercms.com/v2/pages/*/example-news-page/", 
  () => HttpResponse.json(page)
)

const failedSinglePostHandler = http.get(
  "https://api.buttercms.com/v2/pages/*/fake-post-slug/", 
  () => HttpResponse.error("Failed to fetch")
)

const failedSinglePostWithGlobHandler = http.get(
  "https://api.buttercms.com/v2/pages/*/about/fake-post-slug/", 
  () => HttpResponse.error("Failed to fetch")
)

const listPageHandlerError = http.get(
  "https://api.buttercms.com/v2/pages/as/", 
  () => HttpResponse.json(
      { 
        detail: "Error: Not found",
      },
      {
        status: 404
      }
    )
)

const listPageHandler = http.get(
  "https://api.buttercms.com/v2/pages/*/", 
  () => HttpResponse.json(pageList)
)



export default [
  singlePostHandler,
  failedSinglePostHandler,
  failedSinglePostWithGlobHandler,
  listPageHandlerError,
  listPageHandler,
];
