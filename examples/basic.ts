import Butter from "../lib/butter";

async function testing (apiToken: string) {
  // setup Butter class
  const butter = new Butter(apiToken, false, 3000, /*{ 
    beforeHook: async (url: string, params: unknown) => console.log('BEFORE HOOK:', url, params)
  }*/)
  
  //////////////////
  // POSTS
  //////////////////
  // test post.list API
  const post_list = await butter.post.list({page: 1, page_size: 1})
  console.log('TEST 1: post.list', post_list.data[0].title)
  // test post.retrieve v
  const post_retrieve = await butter.post.retrieve('express-blog-tutorial')
  console.log('TEST 2: post.retrieve', post_retrieve.data.title)
  // test post.search API
  const post_search = await butter.post.search('express')
  console.log('TEST 3: post.search', post_search.data[0].title)

  // test page.list API
  interface PageType {
    marketing_team_notes: string;
    page_h1: string;
    full_seo: {
      seo_title: string;
      meta_description: string;
      open_graph_title: string;
      open_graph_description: string;
      open_graph_image: string;
      twitter_card_title: string;
      twitter_card_description: string;
      twitter_card_image: string;
      canonical_url: string;
    },
    page_body: string
  }
  const page_list = await butter.page.list<PageType>('*', { page: 1, page_size: 1 })
  console.log('TEST 4: page.list', page_list.data[0].name)

  const page_retrieve = await butter.page.retrieve<PageType, '*', 'headless-cms-buyers-guide'>('*', 'headless-cms-buyers-guide')
  console.log('TEST 5: page.retrieve', page_retrieve.data.name)

  const page_search = await butter.page.search<PageType, '*'>('Headless CMS Buyer\'s Guide', { page: 1, page_size: 1, page_type: '*' })
  console.log('TEST 6: page.search', page_search.data[0].name)

  //////////////////
  // CONTENT
  //////////////////
  // test content.retrieve API
  // TODO: Get example content types:
  // const content = await butter.content.retrieve(['*'])
  // console.log('content.retrieve', content)
}

testing('b60a008584313ed21803780bc9208557b3b49fbb')