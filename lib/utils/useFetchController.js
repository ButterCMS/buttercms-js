/**
 * Provides a controller to manage fetch requests with capabilities to abort requests and handle errors.
 * 
 * @param {string} type - The type of the request, used to prefix error messages.
 * @returns {Object} An object containing methods and properties to manage fetch requests.
 */
export default function useFetchController(type) {
    /**
     * Instance of AbortController to signal cancellation of fetch requests.
     * 
     * @type {AbortController}
     */
    let controller = new AbortController();
    
    /**
     * Prefix for error messages, initialized based on the request type and URL.
     * 
     * @type {string}
     */
    let errorMessagePrefix = "";
    
    /**
     * Sets the error message prefix using the request type and URL.
     * 
     * @param {string} url - The URL to append to the error message prefix.
     */
    function applyRequestUrlForErrorMessages(url) {
        errorMessagePrefix = `${type} (${url})`;
    }

    /**
     * Generates a full error message string using the current error message prefix.
     * 
     * @param {string} message - The error message to append to the prefix.
     * @returns {string} The full error message.
     */
    function generateErrorMessage(message) {
        return `${errorMessagePrefix}: ${message}`;
    }

    
    /**
     * Cancels the ongoing fetch request by aborting the associated AbortController.
     * It also logs a cancellation message using the generated error message.
     * 
     * @async
     * @function cancelRequest
     * @returns {Promise<void>} A promise that resolves when the request has been aborted.
     */
    function cancelRequest() {
        controller.abort(
            generateErrorMessage("Request cancelled")
        );

        return;
    }

    /**
     * Aborts the current request due to a timeout.
     * 
     * @param {number} timeout - The timeout duration in milliseconds after which the request was aborted.
     * @returns {void}
     */
    function abortOnTimeout(timeout) {
        controller.abort(
            generateErrorMessage(`Request timed out after ${timeout}ms.`)
        );

        return;
    }

    /**
     * Cleans up resources by nullifying the AbortController to prevent memory leaks.
     */
    function cleanup() {
        controller = null;
    }

    /**
     * Determines the type of fetch error based on the error payload and timeout.
     * 
     * @param {Object} errorPayload - The error object thrown by the fetch operation.
     * @param {number} timeout - The timeout value in milliseconds after which the request is considered to have timed out.
     * @returns {string|Object} The error message or the original error payload if no specific fetch error is determined.
     */
    function determineFetchError(errorPayload, timeout) {
        const isFetchAbort = controller && controller.signal.reason && controller.signal.aborted;
        const isTimeoutError = errorPayload.name === "TimeoutError";

        if (isFetchAbort) {
            return controller.signal.reason;
        }

        if (isTimeoutError) {
            return generateErrorMessage(`Request timed out after ${timeout}ms.`);
        }

        // Garbage collect the controller after its use
        cleanup();

        return errorPayload;
    }

    return {
        abortOnTimeout,
        applyRequestUrlForErrorMessages,
        cancelRequest,
        cleanup,
        controller,
        determineFetchError,
        signal: controller.signal
    }
}
