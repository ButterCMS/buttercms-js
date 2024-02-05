/**
 * Sets a timeout for a fetch request and provides a cleanup function to clear the timeout.
 * 
 * @param {AbortController} controller - The AbortController instance used to signal cancellation of fetch requests.
 * @param {string} type - The type of content for which the fetch request is being made.
 * @param {number} timeout - The duration in milliseconds after which the fetch request should be cancelled.
 * @returns {Object} An object containing a cleanup function to clear the timeout and the AbortSignal to be used with fetch requests.
 */
export default function useFetchTimeout (controller, type, timeout) {
    
    /**
     * Sets a timeout using `setTimeout` that will call the `abort` method on the provided
     * AbortController instance after the specified duration. The timeout ID is stored in `id`.
     * 
     * @returns {number} The timeout ID which is a numerical ID representing the timer created by `setTimeout`.
     */
    const id = setTimeout(
        () => {
            controller.abort(
                `${ type }: Request timed out after ${ timeout }ms.`
            )
        }, 
        timeout
    );

    return {
        cleanup: () => clearTimeout(id),
        signal: controller.signal,
    }
}
