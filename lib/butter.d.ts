declare var Butter: (apiToken: string, testMode?: boolean, timeout?: number) => ButterStatic;

declare interface ButterResponse {
  data?: any;
  status?: number;
  statusText?: string;
  headers?: any;
  config?: any;
}

declare interface ButterPostMethods {
  retrieve(slug: string, params?: any): Promise<ButterResponse>;
  list(params?: any): Promise<ButterResponse>;
  search(query: string, params?: any): Promise<ButterResponse>;
}

declare interface ButterCategoryMethods {
  retrieve(slug: string, params?: any): Promise<ButterResponse>;
  list(params?: any): Promise<ButterResponse>;
}

declare interface ButterTagMethods {
  retrieve(slug: string, params?: any): Promise<ButterResponse>;
  list(params?: any): Promise<ButterResponse>;
}

declare interface ButterAuthorMethods {
  retrieve(slug: string, params?: any): Promise<ButterResponse>;
  list(params?: any): Promise<ButterResponse>;
}

declare interface ButterFeedMethods {
  retrieve(slug: string, params?: any): Promise<ButterResponse>;
}

declare interface ButterPageMethods {
  retrieve(page_type: string, page_slug: string, params?: any): Promise<ButterResponse>;
  list(page_type: string, params?: any): Promise<ButterResponse>;
}

declare interface ButterContentMethods {
  retrieve(keys: Array<string>, params?: any): Promise<ButterResponse>;
}

declare interface ButterStatic {
  post: ButterPostMethods;
  category: ButterCategoryMethods;
  tag: ButterTagMethods;
  author: ButterAuthorMethods;
  feed: ButterFeedMethods;
  page: ButterPageMethods;
  content: ButterContentMethods;
}

declare module "buttercms" {
  export = Butter;
}
