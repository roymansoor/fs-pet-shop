const express = require('express');
const app = express();
const port = 3005;
const { Client } = require('pg');

const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/pets_shop';
const client = new Client({
    connectionString: connectionString
});

client.connect();


///* .get 
app.get('/pets', (req, res) => {
    client.query('SELECT * FROM pets')
        .then(result => {
            //console.log(result.rows[0]);
            res.status(200).send(result.rows);
        })
        .catch(err => console.error(err.stack))
});

//*/

// .post 
app.use(express.json());
app.post('/api/pets', (req, res) => {
    let pet =req.body;
    let name = pet.name;
    let kind = pet.kind;
    let age = pet.age;
    client.query(`INSERT INTO pets (name, kind, age) VALUES ('${name}', '${kind}', ${age}) RETURNING *`)
        .then(result => {
            console.log(result.rows[0])
            res.status(200).send(result.rows)

        })
        .catch(err => console.error(err.stack))
})













/* fetch get
fetch('/pets')
 
client.query('SELECT * FROM pets', (err, res)=> {
    if (err){
        console.log(err.stack)
    }else{
        console.log(res.rows[0])
    }
})
*/





app.get('/', (req, res) => {
    res.send('Hello World!!!');
});




app.listen(port, () => {
    console.log(`200 port ${port}`);
});