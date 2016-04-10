'use strict';

const axios = require('axios');

var resources = {
  Post: require('./resources/Post'),
  Category: require('./resources/Category'),
  Author: require('./resources/Author'),
  Feed: require('./resources/Feed')
}

function Butter(apiToken) {
  if (!(this instanceof Butter)) {
    return new Butter(apiToken);
  }

  if (!apiToken) {
    throw 'ButterCMS API token not set';
  }

  this.conn = axios.create({
    baseURL: 'https://api.buttercms.com/v2',
    timeout: 1000,
    headers: {'Authorization': `Token ${apiToken}`}
  });

  this._prepResources();
}

Butter.prototype = {
  _prepResources: function() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this.conn);
    }
  },
}

module.exports = Butter;
