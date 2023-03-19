import Butter from "./lib/butter";

async function testing (apiToken: string) {
  const butter = new Butter(apiToken)
  const post_list = await butter.post.list({page: 1, page_size: 1})
  console.log('TEST 1:', post_list.data[0].title)
  const post_retrieve = await butter.post.retrieve('express-blog-tutorial')
  console.log('TEST 2:', post_retrieve.data.title)
}

testing('b60a008584313ed21803780bc9208557b3b49fbb')