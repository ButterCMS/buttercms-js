/**
 * if user has supplied a onRequest hook, process hook and return any updated 
 * headers, configuration (known as options to user), and params
 * 
 * otherwise, return unaltered payload
 * apiEndpoint can not be altered
 * 
 * 
 * @param {string} apiEndpoint - The API endpoint to be called.
 * @param {Object} kwargs - An object containing configurations and parameters for the request.
 * @param {Object} kwargs.config - An object containing hooks and additional configurations.
 * @param {Function} kwargs.config.onError - A function to be called on error.
 * @param {Function} kwargs.config.onRequest - A function to be called before the request is made.
 * @param {Function} kwargs.config.onResponse - A function to be called after the response is received.
 * @param {Headers} kwargs.headers - Headers to be sent with the request.
 * @param {Object} kwargs.params - Parameters to be sent with the request.
 * @returns {Promise<Object>} - An object containing the final configuration, headers, and parameters for the request.
 */

export default async function useOnRequest (apiEndpoint, authToken, kwargs) {
    const {
        onError, // removing from whats passed to hook
        onRequest, // removing from whats passed to hook
        onResponse, // removing from whats passed to hook
        ...hookConfig
    } = kwargs.config;

    if (onRequest) {
        const {
            headers,
            options,
            params
        } = await onRequest(
            apiEndpoint,
            {
                cancelRequest: kwargs.cancelRequest,
                headers: kwargs.headers,
                options: hookConfig,
                params: kwargs.params,
                type: kwargs.type
            }
        );

        return {
            config: {
                ...options,
                // add hooks back into config to be used later
                onError, 
                onRequest, 
                onResponse, 
            },
            headers,
            params: generateRequiredParams(params, authToken, options)
        };
    }

    return {
        ...kwargs,
        params: generateRequiredParams(kwargs.params, authToken, hookConfig)
    };
};


/**
 * Generates the required parameters for the request, including the authentication token and test mode indicators.
 * 
 * @param {Object} params - The original parameters for the request.
 * @param {string} authToken - The authentication token to be used for the request.
 * @param {Object} config - The configuration object that may contain the test mode flag.
 * @returns {Object} The combined parameters including the required auth_token, and test and preview flags if in test mode.
 */
function generateRequiredParams (params, authToken, config) {
    // if params get a custom auth_token, we'll rewrite with the real one
    const requiredParams = {
        auth_token: authToken
    };

    // Append &test=1&preview=1 query strings
    if (config.testMode) {
        requiredParams.test = 1;
        requiredParams.preview = 1;
    };

    // if we update params directly, the onRequestHook will report the above changes to params {}
    // as its the same object
    return { 
        ...params,
        ...requiredParams 
    }
}
