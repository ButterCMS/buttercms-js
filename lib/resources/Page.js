'use strict';

import useButter from "../useButter.js";

/**
 * Creates an object for interacting with page resources in the ButterCMS API.
 * 
 * @param {Object} [config={}] - Configuration options for the ButterCMS service.
 * @property {string} config.apiToken - The API token for the ButterCMS service.
 * @property {string} config.cache - The cache mode for requests (default is "default").
 * @property {Function} config.onError - A function to be called when an error occurs during a request.
 * @property {Function} config.onRequest - A function to be called just before a request is made.
 * @property {Function} config.onResponse - A function to be called when a response is received.
 * @property {boolean} config.testMode - Whether to use test mode or live mode (default is false, which means live mode).
 * @property {number} config.timeout - The timeout for requests in milliseconds (default is 3000ms).
 * @returns {Object} An object containing methods to interact with page resources.
 * @property {Function} cancelRequest - A function to cancel the fetch request.
 * @property {Function} list - A function to retrieve a list of page resources.
 * @property {Function} retrieve - A function to retrieve a specific page resource.
 * @property {Function} search - A function to search within page resources.
 */
export default function Page (config = {}) {
    const {
        cancelRequest,
        retrieve,
        search
    } = useButter("page", config);

    return {
        cancelRequest,
        /**
         * Retrieves a list of page resources from the ButterCMS API.
         * 
         * @async
         * @function list
         * @param {string} pageType - The type of page to retrieve.
         * @param {Object} options - Additional options for the request.
         * @returns {Promise<Object>} A promise that resolves to the list of page resources.
         */
        async list (pageType, options) { 
            return await retrieve(
                pageType,
                options,
            ); 
        },
        /**
         * Retrieves a specific page resource from the ButterCMS API.
         * 
         * @async
         * @function retrieve
         * @param {string} pageType - The type of page to retrieve.
         * @param {string} pageSlug - The slug of the specific page to retrieve.
         * @param {Object} options - Additional options for the request.
         * @returns {Promise<Object>} A promise that resolves to the specific page resource.
         */
        async retrieve (pageType, pageSlug, options) { 
            return await retrieve(
                `${ pageType }/${ pageSlug }`,
                options,
            ); 
        },
        search,
    }
};
