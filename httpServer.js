'user strict';


const fs = require('fs');
const http = require('http');

//var userInput = process.argv[1]
//console.log(userInput)

const petRegExp = /^\/pets\/(.*)$/;

const port = process.env.PORT || 8001;

const server = http.createServer(function (req, res) {

    if (req.method === 'GET' && req.url === '/pets') {
        fs.readFile('pets.json', 'utf8', function (error, data) {
            if (error) {
                console.log('Something Wrong')
            } else {
                //console.log(data)
                res.statusCode = 200;
                res.end(data)
            }
        })
      
    } 


    else if (req.method === 'GET' && req.url === `/pets/${1}`) {
        fs.readFile('pets.json', 'utf8', function (error, data) {
            if (error) {
                console.log('Something Wrong')
            } else {
                //console.log(data[0])
                res.statusCode = 200;
                var data = JSON.parse(data);
                var output = data[0]
                var output = JSON.stringify(output)
               //console.log(userInput)
                res.end(output)
                //console.log(petRegExp)
                //[RegExp.prototype.test()]['test']
                var something =String.prototype.match()[req.url]
                console.log(something)
            }
        })
    }




    else {
        res.statusCode = 404;
        res.end('Not Found')
    }







})
server.listen(port, function () {
    console.log('Listening on port ', port);
})