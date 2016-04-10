'use strict';

function Category(conn) {
  this._conn = conn;
}

Category.prototype = {
  list: function(options) {
    return this._conn.get('categories', {params: options})
  },
  retrieve: function(slug, options) {
    return this._conn.get(`categories/${slug}`, {params: options})
  }
}

module.exports = Category;
