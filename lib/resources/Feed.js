'use strict';

function Feed(conn) {
  this._conn = conn;
}

Feed.prototype = {
  retrieve: function(type, options) {
    return this._conn.get(`feeds/${type}`, {params: options})
  }
}

module.exports = Feed;
