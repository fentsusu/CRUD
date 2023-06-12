const express = require('express');
const fs = require('fs') 
const app = express();
const port = 3000;

app.get('/getData', (req, res) => {
    res.send('thisFile.txt');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

app.post('/postData', (req, res) => {
    res.send('Hello World!2');
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
