'use strict';

function Content(conn) {
  this._conn = conn;
}

Content.prototype = {
  retrieve: function(keys, options) {
    var keys = keys || [];
    var options = options || {};
    var params = Object.assign({keys: keys.join()}, options);

    return this._conn.get('content/', params)
  }
}

module.exports = Content;
