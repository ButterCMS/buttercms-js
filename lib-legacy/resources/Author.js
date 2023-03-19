'use strict';

function Author(conn) {
  this._conn = conn;
}

Author.prototype = {
  list: function(options) {
    return this._conn.get('authors/', options)
  },
  retrieve: function(slug, options) {
    return this._conn.get('authors/'+slug+'/', options)
  }
}

module.exports = Author;
