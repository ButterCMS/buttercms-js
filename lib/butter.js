'use strict';

import { BUTTER_CLIENT_VERSION } from './constants.js';

import Author from './resources/Author.js';
import Category from './resources/Category.js';
import Content from './resources/Content.js';
import Feed from './resources/Feed.js';
import Page from './resources/Page.js';
import Post from './resources/Post.js';
import Tag from './resources/Tag.js';


/**
 * An object mapping the names of resources to their corresponding modules.
 * Each module provides methods for interacting with a specific type of resource in the ButterCMS API.
 * 
 * @type {Object}
 * @property {Object} Author - The module for interacting with author resources.
 * @property {Object} Category - The module for interacting with category resources.
 * @property {Object} Content - The module for interacting with content resources.
 * @property {Object} Feed - The module for interacting with feed resources.
 * @property {Object} Page - The module for interacting with page resources.
 * @property {Object} Post - The module for interacting with post resources.
 * @property {Object} Tag - The module for interacting with tag resources.
 */
const resources = {
    Author,
    Category,
    Content,
    Feed,
    Page,
    Post,
    Tag,
}

/**
 * Default export function for the ButterCMS library.
 * 
 * @param {string} apiToken - The API token for the ButterCMS service.
 * @param {Object} [options={}] - Optional configuration options for the ButterCMS service.
 * @throws Will throw an error if the API token is not set.
 * @returns {Butter} An instance of the ButterCMS service.
 */
export default function (apiToken, options = {}) {
    if (!apiToken) {
        throw 'ButterCMS API token not set';
    }

    if (!(this instanceof Butter)) {
        return new Butter(apiToken, options);
    }

    return Butter
};

/**
 * The Butter function is the main entry point for interacting with the ButterCMS API.
 * It takes an API token and an options object as parameters, and returns an object
 * that provides methods for interacting with different types of resources in the API.
 * 
 * @param {string} apiToken - The API token for the ButterCMS service.
 * @param {Object} options - Configuration options for the ButterCMS service.
 * @property {string} options.cache - The cache mode for requests (default is "default").
 * @property {Function} options.onError - A function to be called when an error occurs during a request.
 * @property {Function} options.onRequest - A function to be called just before a request is made.
 * @property {Function} options.onResponse - A function to be called when a response is received.
 * @property {boolean} options.testMode - Whether to use test mode or live mode (default is false, which means live mode).
 * @property {number} options.timeout - The timeout for requests in milliseconds (default is 3000ms).
 * @returns {Object} An object that provides methods for interacting with the ButterCMS API.
 */
function Butter (apiToken, options ) {
    const {
        cache = "default",
        onError = null,
        onRequest = null, 
        onResponse = null, 
        testMode = false, 
        timeout = 3000, 
    } = options;

    const config = {
        apiToken,
        cache,
        onError,
        onRequest,
        onResponse,
        testMode,
        timeout,
    }

    return {
        version: BUTTER_CLIENT_VERSION,
        ...mapResources(resources, config)
    }
}

/**
 * Maps resource functions to their respective keys in lowercase.
 * 
 * @param {Object} resources - An object containing resource functions.
 * @param {Object} config - The configuration object to pass to each resource function.
 * @returns {Object} An object with the same keys as `resources`, but in lowercase, and values as the result of calling the respective function with `config`.
 */
function mapResources (resources, config) {
    return Object.keys(resources)
        .reduce(
            (funcs, key) => ({
            ...funcs,
            [key.toLocaleLowerCase()]: resources[key](config)
        }),
        {}
    )
}
