const express = require('express');
const fs = require('fs') 
const app = express();
const port = 3000;

app.get('/getData', (req, res) => {
    res.send('thisFile.txt');
});
