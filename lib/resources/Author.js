'use strict';

function Author(conn) {
  this._conn = conn;
}

Author.prototype = {
  list: function(options) {
    return this._conn.get('authors', {params: options})
  },
  retrieve: function(slug, options) {
    return this._conn.get(`authors/${slug}`, {params: options})
  }
}

module.exports = Author;
