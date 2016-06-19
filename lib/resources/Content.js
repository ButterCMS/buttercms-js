'use strict';

function Content(conn) {
  this._conn = conn;
}

Content.prototype = {
  retrieve: function(keys) {
    var keys = keys || [];

    return this._conn.get(`content`, {keys: keys.join()})
  }
}

module.exports = Content;
