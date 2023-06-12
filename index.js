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
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const dataFilePath = 'Data.json';

// Create an empty array to store records
let dataArray = [];

// Read data from the file
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    if (!data) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    // Return an empty array if the file is not found or is empty
    return [];
  }
}

// Write data to the file
function writeData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath, jsonData, 'utf8');
}

// Get all records
app.get('/records', (req, res) => {
  const records = readData();
  res.json(records);
});

// Get a single record by ID
app.get('/records/:id', (req, res) => {
  const records = readData();
  const record = records.find(r => r.id === parseInt(req.params.id));
  if (!record) return res.status(404).send('Record not found');
  res.json(record);
});

// Create a new record
app.post('/records', (req, res) => {
  const records = readData();
  const newRecord = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description
  };
  records.push(newRecord);
  writeData(records);
  res.status(201).json(newRecord);
});

// Update a record by ID
app.put('/records/:id', (req, res) => {
  const recordId = parseInt(req.params.id); // Parse the ID as an integer
  const { title, description } = req.body;

  // Read the existing records from the file
  dataArray = readData();

  // Find the record with the matching ID
  const record = dataArray.find(record => record.id === recordId);
  if (!record) {
    return res.status(404).send('Record not found');
  }

  // Update the record with new values
  record.title = title;
  record.description = description;

  // Write the updated records back to the file
  writeData(dataArray);

  res.send('Data has been updated successfully');
});

// Delete a record by ID
app.delete('/records/:id', (req, res) => {
  const records = readData();
  const record = records.find(r => r.id === parseInt(req.params.id));
  if (!record) return res.status(404).send('Record not found');
  const index = records.indexOf(record);
  records.splice(index, 1);
  writeData(records);
  res.send({
    status: 'Data has been deleted successfully',
    deletedRecord: record
  });
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
