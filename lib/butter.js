'use strict';

const axios = require('axios');

var resources = {
  Post: require('./resources/Post'),
  Category: require('./resources/Category'),
  Author: require('./resources/Author'),
  Feed: require('./resources/Feed'),
  Content: require('./resources/Content')
}

function Butter(apiToken) {
  if (!(this instanceof Butter)) {
    return new Butter(apiToken);
  }

  if (!apiToken) {
    throw 'ButterCMS API token not set';
  }

  var requestMethods = this._prepMethods(apiToken);

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
  _prepMethods: function(apiToken) {
    return {
      get: function(url, params) {
        var conn = axios.create({
          baseURL: 'https://api.buttercms.com/v2',
          timeout: 3000
        });

        var params = params || {};

        // Add api token to query string
        params.auth_token = apiToken;

        return conn.get(url, {params: params})
      }
    }
  }
}

module.exports = Butter;
