require('@babel/register');

const router = require('../src/components/Routes').default;
const Sitemap = require('react-router-sitemap').default;

(
    new Sitemap(router)
        .build('https://www.sebcode.com')
        .save('./public/sitemap.xml')
); 

// Only shows this message after everything works well.
console.log("The sitemap was built.");