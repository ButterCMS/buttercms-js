// ESM Import
import Butter from '../dist/butter.esm.js';

// CommonJS Import
const ButterCJS = require('../dist/butter.umd.cjs');

// Test ESM
const butterESM = Butter('test_token');
console.log('ESM Butter instance:', butterESM);

// Test CommonJS
const butterCJS = ButterCJS('test_token');
console.log('CommonJS Butter instance:', butterCJS);

// Test both instances have the same methods
const methods = ['post', 'page', 'content', 'category', 'tag', 'author', 'feed'];
methods.forEach(method => {
    console.log(`Checking ${method} method exists in both instances:`);
    console.log('ESM:', !!butterESM[method]);
    console.log('CommonJS:', !!butterCJS[method]);
}); 
