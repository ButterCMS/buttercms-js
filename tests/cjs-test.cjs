// CommonJS Import
const Butter = require('../dist/butter.umd.cjs');

// Test CommonJS
const butterCJS = Butter('test_token');
console.log('CommonJS Butter instance:', butterCJS);

// Test methods
const methods = ['post', 'page', 'content', 'category', 'tag', 'author', 'feed'];
methods.forEach(method => {
    console.log(`Checking ${method} method exists in CommonJS instance:`, !!butterCJS[method]);
}); 
