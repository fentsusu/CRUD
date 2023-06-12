const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const file = 'file.json';

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Create Read Update Delete');
});

let array1 = [
    {id:1, title:"Title1", description:"This is description of title1"},
    {id:2, title:"Title2", description:"This is description of title2"},
    {id:3, title:"Title3", description:"This is description of title3"},
]; 
 //GET
app.get('/api/array', (req,res)=> {
    res.send(array1);
});

//POST
app.post('/api/array', (req,res)=> {
    if(!req.body.title){
        res.status(400);
        res.send({error: "title required <3"})
    }
    if(!req.body.description){
        res.status(400);
        return res.send({error: "description required <3"})
    }
  console.log(req.body);
  let box = {
    id: array1.length + 1,
    title: req.body.title,
    description: req.body.description
  }
  array1.push(box);
  res.send(array1);
});

//PUT
app.put('/api/array/:id', (req,res)=> {
    let id = req.params.id;
    let index = -1;
    for (let box of array1){
        if (box.id === parseInt(id)){
            index = user.id -1;
        }
    }

    if (index >=0){
        let box = array1[index];
        console.log(box);
    }else{
        res.status(404)
        res.send({error:"id is not correct"})
    }
});

//Server start
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
