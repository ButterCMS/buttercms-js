'use strict';

var axios = require('axios');

var resources = {
  Post: require('./resources/Post'),
  Category: require('./resources/Category'),
  Tag: require('./resources/Tag'),
  Author: require('./resources/Author'),
  Feed: require('./resources/Feed'),
  Content: require('./resources/Content')
}

function Butter(apiToken, testMode, timeout) {
  if (!(this instanceof Butter)) {
    return new Butter(apiToken, testMode, timeout);
  }

  if (!apiToken) {
    throw 'ButterCMS API token not set';
  }

  // Use live mode by default
  var testMode = testMode || false;

  // 3000ms timeout by default
  var timeout = timeout || 3000;

  var requestMethods = this._prepMethods(apiToken, testMode, timeout);

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
  _prepMethods: function(apiToken, testMode, timeout) {
    return {
      get: function(url, params) {
        var conn = axios.create({
          baseURL: 'https://api.buttercms.com/v2',
          timeout: timeout
        });

        var params = params || {};

        // Add api token to query string
        params.auth_token = apiToken;

        // Append &test=1 query string
        if (testMode) {
          params.test = 1
        }

        return conn.get(url, {params: params})
      }
    }
  }
}

module.exports = Butter;
