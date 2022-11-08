const express = require('express');
const app = express();
const port = 3005;

//const Client = pg.Client or destructure it like next line
const {Client}= require('pg');

// import config from './config.json' assert{type:'json'};

const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/pets_shop';
const client = new Client({
    connectionString:connectionString
});
//connects to the database server
client.connect();

//parses incoming JSON requests and puts the parsed data in req
app.use(express.json());

// Get all pets

app.get("/pets", (req, res) => {
    client
    .query("SELECT * FROM pets")
    .then((result) => {
        //console.log(result.rows[0]);
        res.status(200).send(result.rows);
    })
    // err.stack represent the stack trace of the error
    .catch((err) => console.error(err.stack));
});


// Get specific pet

app.get("/pets/:id", (req, res) => {
  let id = req.params.id;
  client
    .query(`SELECT * FROM pets WHERE id = ${id}`)
    .then((result) => {
      res.status(200).send(result.rows[0]);
    })
    .catch((err) => console.error(err.stack));
});


// POST to create new pet

app.post("/pet/create", (req, res) => {
  let pet = req.body;
  let name = pet.name;
  let kind = pet.kind;
  let age = pet.age;
  console.log(typeof(name))
  console.log(typeof(undefined))
// cannot validate if name is undfined. 
  if (name ===  undefined || kind === undefined ||age ===undefined || typeof(age) !== 'number'){
    console.log(typeof(name))
    res.send(400)
    console.log('error')
  } else {
    client
      .query(
        `INSERT INTO pets (name, kind, age) VALUES ('${name}', '${kind}', ${age}) RETURNING *`
      )
      .then((result) => {
        console.log(result.rows[0]);
        res.status(200).send(result.rows);
      })
      .catch((err) => console.error(err.stack));
  }
});

//PATCH to update pet name?

app.patch("/pet/update/:id", (req, res) => {
  let id = req.params.id;
  let pet = req.body;
  let name = pet.name;
  let kind = pet.kind;
  let age = pet.aga;

  //console.log(pet)
  client
    // if age is an number, kind is not null, name is not null.

    .query(`UPDATE pets SET name='${name}' WHERE id=${id}`)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => console.error(err.stack));
});

// Delete to delete a pet with id#

app.delete("/pet/delete/:id", (req, res) => {
  client
    .query(`DELETE FROM pets WHERE id = ${req.params.id}`)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => console.error(err.stack));
});


app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`200 port ${port}`);
});
