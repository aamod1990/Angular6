# Angular6
Crud Operations Angular 6 With Node 10.7.0
This project is under development
Babel transpiles ES6 to ES5
"babel-preset-es2015": "^6.24.1",
"babel-register": "^6.26.0",
// index.js 
// by requiring `babel/register`, all of our successive `require`s will be Babel'd
require('babel-register')({
   presets: [ 'es2015' ]
});

require('./index');
