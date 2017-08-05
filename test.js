var butter = require('./lib/butter')('b60a008584313ed21803780bc9208557b3b49fbb');
//var butter = require('./lib/butter')('b60a008584313ed21803780bc9208557b3b49fbb', false, 1); // Network timeout

// butter.content.retrieve(["abis_team"], {locale: 'es'})
//   .then(function(response) {
//     console.log(response.data.data)
//   }).catch(function(response) {
//     console.log(response)
//   });

// butter.post.list({page: 1, page_size: 10})
//   .then(function(response) {
//     console.log(response.data)
//   }).catch(function(response) {
//     console.log(response)
//   });

// butter.tag.list()
//   .then(function(response) {
//     console.log(response)
//   }).catch(function(response) {
//     console.log(response)
//   });

// butter.post.retrieve("directly-import-pdfs-into-your-blog-post")
//   .then(function(response) {
//     console.log(response)
//   }).catch(function(response) {
//     console.log(response)
//   });

// butter.content.retrieve(["landing_pages"])
//   .then(function(response) {
//     console.log(response.data.data)
//   }).catch(function(response) {
//     console.log(response)
//   });

// butter.post.retrieve("directly-import-pdfs-into-your-blog-post")
//   .handle(function(error) {
//     return error.timeout;
//   })
//   .executeWithAutoRetry(3)
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(response) {
//     console.log(response);
//   });
