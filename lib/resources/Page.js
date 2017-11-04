'use strict';

function Page(conn) {
  this._conn = conn;
}

Page.prototype = {
  list: function(key, options) {
    return this._conn.get('pages/'+key+'/', options)
  },
  retrieve: function(key, slug, options) {
    return this._conn.get('pages/'+key+'/'+slug+'/', options)
  }
}

module.exports = Page;
