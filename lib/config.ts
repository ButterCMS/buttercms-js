export const BUTTER_CLIENT_VERSION = "1.2.5";
export const BUTTER_BASE_API_URL = "https://api.buttercms.com/v2";
export const BUTTER_BASE_HEADERS = {
	"X-Butter-Client": `JS/${BUTTER_CLIENT_VERSION}`,
  // detect if library is called in server side
  'Accept-Encoding': typeof window === 'undefined' ? 'gzip' : ''
}
