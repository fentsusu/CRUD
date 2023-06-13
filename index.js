const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const storage_path = './file_storage';
let file_list = fs.readdirSync(storage_path);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send("Welcome!");
});

app.get('/:route_name', (req, res) => {
    const { route_name } = req.params;
    if (file_list.includes(route_name)) {
        const file = JSON.parse(fs.readFileSync("./file_storage/" + route_name));
        res.status(200).send(file);
    } else {
        res.status(404).send("File is not found!");
    }
});

app.post('/:route_name', (req, res) => {
    const file_name = req.params['route_name'];
    if (file_name.endsWith(".json")) {
        if (file_list.includes(file_name)) {
            res.status(403).send("File is already existed");
        } else {
            fs.writeFileSync("./file_storage/" + file_name, JSON.stringify(req.body));
            file_list = fs.readdirSync(storage_path);
            res.status(200).send("Store file " + file_name + " successfully.");
        }
    } else {
        res.status(400).send("Please submit only json file");
    }
});

app.put('/:route_name', (req, res) => {
    const file_name = req.params['route_name'];
    if (file_name.endsWith(".json")) {
        if (file_list.includes(file_name)) {
            fs.writeFileSync("./file_storage/" + file_name, JSON.stringify(req.body));
            file_list = fs.readdirSync(storage_path);
            res.status(200).send("Replace " + file_name + " successfully.");
        } else {
            res.status(404).send("File is not existed");
        }
    } else {
        res.status(400).send("Please submit only json file");
    }
});

app.delete('/:route_name', (req, res) => {
    const file_name = req.params['route_name'];
    if (file_name.endsWith(".json")) {
        if (file_list.includes(file_name)) {
            fs.unlinkSync("./file_storage/" + file_name);
            res.status(200).send("Remove " + file_name + " successfully.");
        } else {
            res.status(404).send("File is not existed");
        }
    } else {
        res.status(400).send("Please submit only json file");
    }
});

app.listen(3000);
