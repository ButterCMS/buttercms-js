import Butter from "buttercms";
import type { PostListResponse, PostRetrieveResponse, PostSearchResponse } from "buttercms"

async function testing (apiToken: string) {
  // setup Butter class
  const butter = new Butter(apiToken, false, 3000, { beforeHook: async (url: string, params: unknown) => console.log('BEFORE HOOK:', url, params) })
  
  // test post.list API
  const post_list = await butter.post.list<PostListResponse>({page: 1, page_size: 1})
  console.log('TEST 1: post.list', post_list.data[0].title)
  // test post.retrieve v
  const post_retrieve = await butter.post.retrieve<PostRetrieveResponse>('express-blog-tutorial')
  console.log('TEST 2: post.retrieve', post_retrieve.data.title)
  // test post.search API
  const post_search = await butter.post.search<PostSearchResponse>('express')
  console.log('TEST 3: post.search', post_search.data[0].title)
}

testing('b60a008584313ed21803780bc9208557b3b49fbb')