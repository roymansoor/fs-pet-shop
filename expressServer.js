// requiring express and save it to a variable.
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
//var petsfile = require('./pets.json')
const fs = require('fs');
const { request } = require('http');

//const userInput = express.json()
//console.log(userInput)
//console.log(req.path)

app.get('/pets', (req, res)=>{

    //res.json({data: {message: 'pest is here'}})
    fs.readFile('pets.json', 'utf8', (error, data )=>{
        const pets = JSON.parse(data)
        console.log(req.path)
        res.status(200).json(pets)
    }) 
})
app.get('/pets/:id', (req, res, next)=>{
    //res.status(200).json(petsfile[req.params.id])
    fs.readFile('pets.json', 'utf8', (error, data )=>{
        const pets = JSON.parse(data)
        console.log(req.path)
        if(req.params.id < pets.length && req.params.id >= 0){
        res.status(200).json(pets[req.params.id])
        }
        else {
            next()
        }
    })
})

app.use((req, res, next)=>{
    console.error('Not Found')
    res.send('Page Not Found')
    res.status(404)//.json({error:{message: 'Not Found'}})
})













app.listen(PORT, ()=> {
    console.log(`Server runnin on ${PORT}`)
})






