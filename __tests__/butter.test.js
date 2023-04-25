const butter = require('../lib/butter')('api_token');

test('should retrive a single page', async () => {
  const singlePageResponse = await butter.page.retrieve('*', 'example-news-page', {
    "locale": "en",
    "preview": 1
  })

  const response = await singlePageResponse.data;
  const status_code = await singlePageResponse.status;

  await expect(status_code).toEqual(200);

  await expect(response.data.fields.headline).toEqual("This is an example news page");
  await expect(response.data.slug).toEqual("example-news-page")
  await expect(response.data.page_type).not.toEqual("sport")
});

test('should list pages by single-pages', async () => {
  const singlePageResponse = await butter.page.list('*')

  const response = await singlePageResponse.data;
  const status_code = await singlePageResponse.status;

  await expect(status_code).toEqual(200);

  await expect(response.meta.count).toEqual(2);
  await expect(response.data).toHaveLength(2);

  const firstPage = response.data[0];

  await expect(firstPage).toHaveProperty('slug', 'single-page-1');
  await expect(firstPage).toHaveProperty('fields.title', 'This is a single page');

  await expect(firstPage).not.toHaveProperty('date_time');
})
