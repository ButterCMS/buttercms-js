import Butter from "../lib/butter.js";

const butter = Butter("api_token");

test(
  "should retrieve a single page", 
  async () => {

    const singlePageResponse = await butter.page.retrieve(
      "*",
      "example-news-page", 
      {
        "locale": "en",
        "preview": 1
      }
    )

    const response = await singlePageResponse;

    await expect(response.data.fields.headline).toEqual("This is an example news page");
    await expect(response.data.slug).toEqual("example-news-page")
    await expect(response.data.page_type).not.toEqual("sport")

    // ensure we can get the page with the real page type attached
    const response2 = await butter.page.retrieve('news', 'example-news-page')

    await expect(response2.data.fields.headline).toEqual("This is an example news page");
    await expect(response2.data.slug).toEqual("example-news-page")
    await expect(response2.data.page_type).not.toEqual("sport")

    return
  }
);

test(
  "should respond with error when access a bad page slug", 
  async () => {
    try {
      const singlePageResponse = await butter.page.retrieve(
        "*",
        "fake-post-slug", 
        {
          "locale": "en",
          "preview": 1
        }
      )
    }
    catch (error) {
      await expect(error).toBeInstanceOf(Error);
      await expect(error.message).toEqual("TypeError: Failed to fetch");
      
    }

    try {
      const singlePageResponse2 = await butter.page.retrieve(
        "*/about",
        "example-news-page", 
        {
          "locale": "en",
          "preview": 1
        }
      )
    }
    catch (error) {
      await expect(error).toBeInstanceOf(Error);
      await expect(error.message).toEqual("TypeError: Failed to fetch");
      
    }
    
    return

  }
);

test(
  "should list pages by single-pages", 
  async () => {
      const response = await butter.page.list('*')
      
      await expect(response.meta.count).toEqual(2);
      await expect(response.data).toHaveLength(2);
  
      const firstPage = response.data[0];
  
      await expect(firstPage).toHaveProperty('slug', 'single-page-1');
      await expect(firstPage).toHaveProperty('fields.title', 'This is a single page');
  
      await expect(firstPage).not.toHaveProperty('date_time');

      return
  }
)

test(
  "should list pages by single-pages and then retrieve a pageTyped page", 
  async () => {
      const response = await butter.page.list('*')
      
      await expect(response.meta.count).toEqual(2);
      await expect(response.data).toHaveLength(2);
  
      const firstPage = response.data[0];
  
      await expect(firstPage).toHaveProperty('slug', 'single-page-1');
      await expect(firstPage).toHaveProperty('fields.title', 'This is a single page');
  
      await expect(firstPage).not.toHaveProperty('date_time');

      const response2 = await butter.page.retrieve('news', 'example-news-page')

      await expect(response2.data.fields.headline).toEqual("This is an example news page");
      await expect(response2.data.slug).toEqual("example-news-page")
      await expect(response2.data.page_type).not.toEqual("sport")
      
      return
  }
)

test(
  "should catch and relay error when page type not found", 
  async () => {
    try {
      await butter.page.list('as')
    }
    catch (error) {
      await expect(error).toBeDefined();
      await expect(error).toBeInstanceOf(Error);
      await expect(error.message).toEqual("Error: Not found");
    }

    return
  }
)
