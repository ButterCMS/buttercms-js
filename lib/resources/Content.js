'use strict';

var _ = require('lodash');

function Content(conn) {
  this._conn = conn;
}

Content.prototype = {
  retrieve: function(keys, options) {
    var keys = keys || [];
    var options = options || {};
    var params = _.merge({keys: keys.join()}, options);

    return this._conn.get('content', params)
  }
}

module.exports = Content;
