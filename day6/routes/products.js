const express = require('express');
const axios = require('axios');
const router = express.Router();
const { exec } = require('child_process');

let shopifyCommand = 'curl -s -X GET -H "Content-Type: application/json" -H "X-Shopify-Access-Token: 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" "https://jamil-jb.myshopify.com/admin/api/2022-10/products.json"';


router.get('/', (req, res) => {
    exec(shopifyCommand, (error, stdout, stderr) => {
        if(stderr){
            console.error(`exec error: ${stderr}`);
            return;
        }
        const products = JSON.parse(stdout).products;
        let output = '<h1>Products</h1>';
            products.forEach(product => {
                output += `
                    <div style="border: 1px solid black; margin-bottom: 10px; padding: 10px;">
                        <h2>${product.title}</h2>
                        <img style="height: 100px; width: 100px" src="${product.image?.src}" alt="${product.title}" />
                        <p>Price: ${product.variants[0]?.price}</p>
                    </div>
                `;
            });
            res.send(output);
      })
});

module.exports = router;
