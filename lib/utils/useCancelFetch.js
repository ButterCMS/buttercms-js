/**
 * Custom hook to create a cancellation controller for fetch requests.
 * 
 * @param {string} type - The type of content for which the fetch request is being made.
 * @returns {Object} An object containing the cancelRequest function and the AbortController instance.
 */
export default function useCancelFetch (type, config) {
    
    // If the configuration indicates that the environment is Static Site Generation (SSG),
    // return a mock controller and a no-op cancelRequest function.
    if (config.isSSG) {
        return {
            cancelRequest: () => {
                console.warn("Butter API running in SSG-mode and does not cancel requests programmatically")
                return
            },
            controller: {}
        }
    }

    /**
     * Instance of AbortController to signal cancellation of fetch requests.
     * 
     * @type {AbortController}
     */
    const controller = new AbortController();

    /**
     * Function to cancel the fetch request.
     * 
     * @async
     * @function cancelRequest
     * @returns {Promise<void>} A promise that resolves when the request is cancelled.
     */
    async function cancelRequest () {
        await controller.abort(
            `${ type }: Request cancelled`
        );

        return
    }

    return {
        cancelRequest,
        controller,
    }
}
