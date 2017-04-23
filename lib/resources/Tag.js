'use strict';

function Tag(conn) {
  this._conn = conn;
}

Tag.prototype = {
  list: function(options) {
    return this._conn.get('tags/', options)
  },
  retrieve: function(slug, options) {
    return this._conn.get('tags/'+slug+'/', options)
  }
}

module.exports = Tag;
