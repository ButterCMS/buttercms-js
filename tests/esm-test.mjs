// ESM Import
import ButterCMS from '../dist/butter.esm.js';

// Test instance
const butter = ButterCMS('test_token');
console.log('ButterCMS ESM instance:', butter);

// Test methods
const methods = ['post', 'page', 'content', 'category', 'tag', 'author', 'feed'];
methods.forEach(method => {
    console.log(`Checking ${method} method exists in ESM instance:`, !!butter[method]);
}); 
