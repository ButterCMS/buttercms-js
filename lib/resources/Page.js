'use strict';

function Page(conn) {
  this._conn = conn;
}

Page.prototype = {
  list: function(page_type, options) {
    return this._conn.get('pages/'+page_type+'/', options)
  },
  retrieve: function(page_type, page_slug, options) {
    return this._conn.get('pages/'+page_type+'/'+page_slug+'/', options)
  },
  search: function(query, options) {
    var options = options || {};
    options.query = query || '';

    return this._conn.get('pages/search/', options)
  }
}

module.exports = Page;