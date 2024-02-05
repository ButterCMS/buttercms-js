/**
 * Custom hook to handle errors by invoking the onError callback with the errors and relevant parameters.
 * 
 * @param {Array} errors - An array of errors to be handled.
 * @param {Object} kwargs - An object containing additional keyword arguments.
 * @param {Object} kwargs.config - Configuration options, including callbacks for onError, onRequest, and onResponse.
 * @param {Object} kwargs.params - Parameters for the request, including auth_token, test, and preview.
 * @param {string} kwargs.type - The type of the operation that triggered the error.
 * @returns {Object} An object containing the data (always null) and the errors.
 */
export default function useOnError (errors, kwargs) {
    const {
        onError, // Callback function to be invoked when an error occurs.
        onRequest, // Callback function to be invoked just before a request is made (not used here).
        onResponse, // Callback function to be invoked when a response is received (not used here).
        ...hookConfig
    } = kwargs.config;

    const {
        auth_token, // Authentication token (not passed to the hook).
        test, // Flag indicating whether the operation is a test (not passed to the hook).
        preview, // Flag indicating whether the operation is a preview (not passed to the hook).
        ...customParams
    } = kwargs.params

    // if onError is supplied, then call the function with the errors and relevant parameters
    if (onError) {
        onError(
            errors, 
            {
                options: hookConfig,
                params: customParams, 
                type: kwargs.type
            }
        )
    }

    return
}
