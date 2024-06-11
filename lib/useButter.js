import { 
    BASE_PATHS,
    BASE_URL,
    BUTTER_CLIENT_VERSION
} from './constants.js';

import useCancelFetch from './utils/useCancelFetch.js';
import useFetchTimeout from './utils/useFetchTimeout.js';
import useOnError from "./utils/useOnError.js"
import useOnRequest from './utils/useOnRequest.js';
import useOnResponse from './utils/useOnResponse.js';

/**
 * Custom hook to interact with ButterCMS API.
 * 
 * @param {string} type - The type of content to interact with (e.g., 'post', 'page').
 * @param {Object} butterConfig - Configuration object for ButterCMS API requests.
 * @returns {Object} An object containing methods to interact with the specified content type.
 */

export default function useButter (type, butterConfig) {
    const BASE_PATH = getBasePath(type);

    const friendlyType = type.replace(type[0], type[0].toUpperCase());
    
    /**
     * Use the custom hook useCancelFetch to create a cancellation controller for fetch requests.
     * 
     * @const {Object} cancelFetch - An object containing methods to cancel fetch requests.
     * @property {Function} cancelRequest - A function to cancel the fetch request.
     * @property {AbortController} fetchController - An instance of AbortController to signal cancellation of fetch requests.
     */
    const {
        cancelRequest,
        controller: fetchController,
    } = useCancelFetch(friendlyType, butterConfig)


    /**
     * Fetches data from the ButterCMS API at the specified endpoint using provided parameters.
     * 
     * @async
     * @function get
     * @param {string} [apiEndpoint=BASE_PATH] - The API endpoint to send the request to.
     * @param {Object} [localParams={}] - Additional parameters to include in the request.
     * @returns {Promise<Object>} An object containing the data, meta, and any errors from the API response.
     * @throws Will throw an error object containing errors, config, and params if the API response includes errors.
     */
    async function get (apiEndpoint = BASE_PATH, localParams = {}) {
        // Extract apiToken and separate it from the rest of the user's configuration
        const {
            apiToken: auth_token,
            ...userConfig
        } = butterConfig;
        
        // Initialize headers for the request
        const butterHeaders = new Headers({
            "Content-Type": "application/json",
            "X-Butter-Client": `JS/${ BUTTER_CLIENT_VERSION }`
        });
        
        // Append additional header for server-side environments
        if (typeof window === "undefined") {
            butterHeaders.append("Accept-Encoding", "gzip");
        }
        
        // Prepare the request configuration using the onRequest hook
        const {
            config,
            headers,
            params
        } = await useOnRequest(
            apiEndpoint,
            auth_token,
            {
                cancelRequest,
                config: userConfig,
                headers: butterHeaders,
                params: localParams,
                type,
            }
        );
        
        try {
            // Set up fetch timeout and signal
            const {
                cleanup,
                signal
            } = useFetchTimeout(fetchController, friendlyType, config);

            const fetchOptions = config.isSSG
                ? {
                    cache: "no-cache",
                    method: "GET",
                    headers
                }
                : {
                    cache: config.cache,
                    method: "GET",
                    headers,
                    signal
                }

            // Perform the API request
            const response = await fetch(
                `${ apiEndpoint }?${ new URLSearchParams(params) }`,
                fetchOptions
            );
            
            // Clean up after the fetch timeout
            cleanup();
            
            // Check for errors in the response and throw if present
            if (response.status !== 200) {
                throw { response, config, params };
            }
            // Process the response using the onResponse hook
            else {
                // Return the successful response data and metadata
                return await useOnResponse(
                    response,
                    {
                        config,
                        // pass the request as user won't see our
                        // changes for auth_token or testMode
                        // remove testMode params and auth_token in onResponse
                        params,
                        type
                    }
                );
            }
        } catch (errorPayload) {
            if (errorPayload.response) {
                // Process errors using the onError hook with the attached config
                const {
                    detail: errorDetail
                } = await errorPayload.response.json();
                
                useOnError(
                    errorDetail,
                    {
                        config: errorPayload.config,
                        params: errorPayload.params,
                        type
                    }
                );
                
                // Return null data and the errors
                return Promise.reject(
                    new Error(
                        errorDetail
                    )
                );
            } else {
                // Handle fetch abort errors
                // this catches the AbortController, which has a reason of the cancellation
                // if we do not throw/catch the error ourself, 
                // such timing out results in early exception
                // if aborted, we get an early throw
                // and update the error accordingly
                const reportableError = getReportableError({
                    config,
                    errorPayload,
                    fetchController
                })

                // Process the abort error using the onError hook
                useOnError(
                    reportableError,
                    {
                        config,
                        params,
                        type
                    }
                );
                
                return Promise.reject(
                    new Error(
                        reportableError
                    )
                );
            }            
        }
    }

    /**
     * Determines the appropriate error message to report based on the fetch operation context.
     * If the operation is performed in a Static Site Generation (SSG) environment, it directly returns the error payload.
     * Otherwise, it checks if the fetch was aborted and returns the specific abort reason if available, or the general error payload otherwise.
     *
     * @param {Object} kwargs - The arguments object containing necessary properties.
     * @param {Object} kwargs.config - Configuration object which includes environment settings.
     * @param {Object} kwargs.errorPayload - The error payload received from a fetch operation.
     * @param {AbortController} kwargs.fetchController - The controller used to manage the fetch operation, including aborting the fetch.
     * @returns {Object|string} - The error payload or the abort reason based on the fetch operation context.
     */

    function getReportableError (kwargs = {}) {
        const {
            config,
            errorPayload,
            fetchController
        } = kwargs;
        
        if (config.isSSG) {
            return errorPayload;   
        } else {
            const isFetchAbort = fetchController.signal.reason && fetchController.signal.aborted;
            return isFetchAbort
                ? fetchController.signal.reason
                : errorPayload;
        }
    }
    
    /**
     * Retrieves a list of items based on the provided options.
     * 
     * @async
     * @function list
     * @param {Object} [options={}] - Additional options for the request.
     * @returns {Promise<Object>} The result of the list operation.
     */
    async function list (options = {}) {
        return await get(BASE_PATH, options);
    }

    /**
     * Retrieves a specific item based on the provided slug and options.
     * 
     * @async
     * @function retrieve
     * @param {string} slug - The unique identifier for the item to retrieve.
     * @param {Object} [options={}] - Additional options for the request.
     * @returns {Promise<Object>} The result of the retrieve operation.
     */
    async function retrieve (slug, options) {
        return await get(
            `${ BASE_PATH }${ slug }/`, 
            options
        );
    }

    /**
     * Performs a search with the given query and options.
     * 
     * @async
     * @function search
     * @param {string} [query=""] - The search query string.
     * @param {Object} [options={}] - Additional options for the request.
     * @returns {Promise<Object>} The result of the search operation.
     */
    async function search (query = "", options = {}) {
        options.query = query;

        return await get(
            `${ BASE_PATH }search/`,
            options
        );
    }

    return {
        cancelRequest,
        list,
        retrieve,
        search
    };
}

function getBasePath (type) {
    return `${ BASE_URL }/${ BASE_PATHS[type] }/`;
}
