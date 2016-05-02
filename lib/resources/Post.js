'use strict';

function Post(conn) {
  this._conn = conn;
}

Post.prototype = {
  list: function(options) {
    return this._conn.get('posts', options)
  },
  retrieve: function(slug, options) {
    return this._conn.get(`posts/${slug}`, options)
  }
}

module.exports = Post;
