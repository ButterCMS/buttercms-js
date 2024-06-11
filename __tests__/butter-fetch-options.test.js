import { jest }  from '@jest/globals';
import Butter from "../lib/butter.js";

const butter = Butter(
    "api_token",
    {
        isSSG: true
    }
);

describe(
    "use Butter JS under SSG status",
    () => {
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
          
              return
            }
        );
        
        test(
            "should respond with warning when attempting to cancel request", 
            async () => {
                const warnSpy = jest
                    .spyOn(console, "warn")
                    .mockImplementation(
                        () => {}
                    );

                const singlePageResponse = await butter.page.retrieve(
                    "*",
                    "example-news-page", 
                    {
                      "locale": "en",
                      "preview": 1
                    }
                  )
              
                const response = await singlePageResponse;
                
                butter.page.cancelRequest();

                expect(warnSpy).toBeCalledWith("Butter API running in SSG-mode and does not cancel requests programmatically");
                expect(warnSpy).toHaveBeenCalled();
              
                warnSpy.mockReset();

                return;

          
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
              
              return
          
            }
        );

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
          
    }
)

  
