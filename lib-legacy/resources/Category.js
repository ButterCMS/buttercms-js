'use strict';

function Category(conn) {
  this._conn = conn;
}

Category.prototype = {
  list: function(options) {
    return this._conn.get('categories/', options)
  },
  retrieve: function(slug, options) {
    return this._conn.get('categories/'+slug+'/', options)
  }
}

module.exports = Category;
