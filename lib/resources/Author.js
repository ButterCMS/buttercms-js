'use strict';

import useButter from "../useButter.js";

/**
 * Creates an object for interacting with author resources in the ButterCMS API.
 * 
 * @param {Object} [config={}] - Configuration options for the ButterCMS service.
 * @property {string} config.apiToken - The API token for the ButterCMS service.
 * @property {string} config.cache - The cache mode for requests (default is "default").
 * @property {Function} config.onError - A function to be called when an error occurs during a request.
 * @property {Function} config.onRequest - A function to be called just before a request is made.
 * @property {Function} config.onResponse - A function to be called when a response is received.
 * @property {boolean} config.testMode - Whether to use test mode or live mode (default is false, which means live mode).
 * @property {number} config.timeout - The timeout for requests in milliseconds (default is 3000ms).
 * @returns {Object} An object containing methods to interact with author resources.
 * @property {Function} cancelRequest - A function to cancel the fetch request.
 * @property {Function} list - A function to retrieve a list of author resources.
 * @property {Function} retrieve - A function to retrieve a specific author resource.
 */
export default function Author (config = {}) {
    const {
        cancelRequest,
        list,
        retrieve
    } = useButter("author", config);
    
    return {
        cancelRequest,
        list,
        retrieve
    }
}
