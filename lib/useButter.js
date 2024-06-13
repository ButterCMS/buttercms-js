import { 
    BASE_PATHS,
    BASE_URL,
    BUTTER_CLIENT_VERSION
} from './constants.js';

import useFetchController from "./utils/useFetchController.js";
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
export default function useButter(type, butterConfig) {
    const BASE_PATH = getBasePath(type);

    const friendlyType = type.replace(type[0], type[0].toUpperCase());

    const {
        applyRequestUrlForErrorMessages,
        cancelRequest,
        cleanup,
        determineFetchError,
        signal
    } = useFetchController(friendlyType);

    /**
     * Fetches data from the ButterCMS API at the specified endpoint using provided parameters.
     * 
     * @async
     * @function
     * @param {string} [apiEndpoint=BASE_PATH] - The API endpoint to send the request to.
     * @param {Object} [localParams={}] - Additional parameters to include in the request.
     * @returns {Promise<Object>} An object containing the data, meta, and any errors from the API response.
     * @throws Will throw an error object containing errors, config, and params if the API response includes errors.
     */
    async function get(apiEndpoint = BASE_PATH, localParams = {}) {
        const {
            apiToken: auth_token,
            ...userConfig
        } = butterConfig;

        const butterHeaders = new Headers({
            "Content-Type": "application/json",
            "X-Butter-Client": `JS/${BUTTER_CLIENT_VERSION}`
        });

        if (typeof window === "undefined") {
            butterHeaders.append("Accept-Encoding", "gzip");
        }

        // Sets the error message prefix based on the API endpoint
        // It is crucial for generating meaningful error messages for debugging.
        applyRequestUrlForErrorMessages(apiEndpoint);

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
            // use static abortSignal timeout functionality to relay a cancelation 
            // when timeout is reached
            const timeoutSignal = AbortSignal.timeout(config.timeout);

            const response = await fetch(
                `${apiEndpoint}?${new URLSearchParams(params)}`,
                {
                    cache: config.cache,
                    method: "GET",
                    headers,
                    // use either the above timeout o
                    // r the explicity AbortController cancelRequest to cancel request
                    signal: AbortSignal.any([signal, timeoutSignal])
                }
            );

            cleanup();

            if (response.status !== 200) {
                throw { response, config, params };
            } else {
                return await useOnResponse(
                    response,
                    {
                        config,
                        params,
                        type
                    }
                );
            }
        } 
        /**
         * Handles errors that occur during the fetch operation.
         * If the error contains a response, it processes the JSON to extract the error detail,
         * logs the error using `useOnError`, and rejects the promise with the extracted error detail.
         * If the error does not contain a response, it determines the fetch error, logs it,
         * performs cleanup, and rejects the promise with the determined error.
         * 
         * @param {Object} errorPayload - The error object caught from the fetch operation.
         * @returns {Promise<never>} A promise that always rejects with an error.
         */
        catch (errorPayload) {
            if (errorPayload.response) {
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

                return Promise.reject(
                    new Error(
                        errorDetail
                    )
                );
            } else {
                const reportableError = determineFetchError(
                    errorPayload,
                    config.timeout
                );

                useOnError(
                    reportableError,
                    {
                        config,
                        params,
                        type
                    }
                );

                cleanup();

                return Promise.reject(
                    new Error(
                        reportableError
                    )
                );
            }
        }
    }

    /**
     * Retrieves a list of items based on the provided options.
     * 
     * @async
     * @function
     * @param {Object} [options={}] - Additional options for the request.
     * @returns {Promise<Object>} The result of the list operation.
     */
    async function list(options = {}) {
        return await get(BASE_PATH, options);
    }

    /**
     * Retrieves a specific item based on the provided slug and options.
     * 
     * @async
     * @function
     * @param {string} slug - The unique identifier for the item to retrieve.
     * @param {Object} [options={}] - Additional options for the request.
     * @returns {Promise<Object>} The result of the retrieve operation.
     */
    async function retrieve(slug, options) {
        return await get(
            `${BASE_PATH}${slug}/`,
            options
        );
    }

    /**
     * Performs a search with the given query and options.
     * 
     * @async
     * @function
     * @param {string} [query=""] - The search query string.
     * @param {Object} [options={}] - Additional options for the request.
     * @returns {Promise<Object>} The result of the search operation.
     */
    async function search(query = "", options = {}) {
        options.query = query;

        return await get(
            `${BASE_PATH}search/`,
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

/**
 * Constructs the base path for the specified content type.
 * 
 * @param {string} type - The type of content to interact with.
 * @returns {string} The base path for the specified content type.
 */
function getBasePath(type) {
    return `${BASE_URL}/${BASE_PATHS[type]}/`;
}
