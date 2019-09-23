'use strict';

var BUTTER_CLIENT_VERSION = '1.1.3';

var axios = require('axios');

var resources = {
  Post: require('./resources/Post'),
  Category: require('./resources/Category'),
  Tag: require('./resources/Tag'),
  Author: require('./resources/Author'),
  Feed: require('./resources/Feed'),
  Content: require('./resources/Content'),
  Page: require('./resources/Page')
}

function Butter(apiToken, testMode, timeout, axiosHook) {
  if (!(this instanceof Butter)) {
    return new Butter(apiToken, testMode, timeout, axiosHook);
  }

  if (!apiToken) {
    throw 'ButterCMS API token not set';
  }

  // Use live mode by default
  var testMode = testMode || false;

  // 3000ms timeout by default
  var timeout = timeout || 3000;

  var requestMethods = this._prepMethods(apiToken, testMode, timeout, axiosHook);

  this._prepResources(requestMethods);
}

Butter.prototype = {
  _prepResources: function(requestMethods) {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](requestMethods);
    }
  },
  _prepMethods: function(apiToken, testMode, timeout, axiosHook) {
    return {
      get: function(url, params) {
        var conn = axios.create({
          baseURL: 'https://api.buttercms.com/v2',
          timeout: timeout,
          headers: {'X-Butter-Client': 'JS/' + BUTTER_CLIENT_VERSION}
        });

        if (axiosHook) {
          axiosHook(conn)
        }

        var params = params || {};

        // Add api token to query string
        params.auth_token = apiToken;

        // Append &test=1&preview=1 query strings
        if (testMode) {
          params.test = 1
          params.preview = 1
        }

        return conn.get(url, {params: params})
      }
    }
  }
}

module.exports = Butter;
