/**
 * Processes the response from an API call using the provided hooks and parameters.
 * 
 * @param {Response} response - The response object from the fetch API call.
 * @param {Object} kwargs - An object containing configurations and parameters.
 * @param {Object} kwargs.config - An object containing hook functions and additional configurations.
 * @param {Function} kwargs.config.onResponse - A function to be called after the response is received.
 * @param {Object} kwargs.params - Parameters that were sent with the request.
 * @returns {Promise<Object>} - The parsed JSON response from the API call.
 */

export default async function useOnResponse (response, kwargs) {
    const {
        onError, // removing from whats passed to hook
        onRequest, // removing from whats passed to hook
        onResponse, // removing from whats passed to hook
        ...hookConfig
    } = kwargs.config;

    const {
        auth_token, // removing from whats passed to hook
        test, // removing from whats passed to hook
        preview, // removing from whats passed to hook
        ...customParams
    } = kwargs.params

    if (onResponse) {
        // Clone the response so the user can parse the body in a custom way.
        // The original response will be returned as JSON.
        const hookResponse = response.clone()

        // Call the onResponse hook with the cloned response and user parameters.
        await onResponse(
            hookResponse,
            {
                options: hookConfig,
                params: customParams,
                type: kwargs.type
            }
        )
    }

    // Parse and return the response as JSON.
    // The expected structure is { data, [meta, errors] }.
    return await response.json()
}
