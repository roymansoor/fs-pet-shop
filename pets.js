const { setFips } = require('crypto');
var fs = require('fs');
//import { exit } from 'node:process'
//var data = require('./pets.json')
//console.log(`Usage: node pets.js [read | create | update | destroy]`)
//console.log(data)
var userInput = process.argv[2]
var userInputIndex = process.argv[3]


function read (){
    fs.readFile('pets.json', 'utf8', function(error, data){
        var data = JSON.parse(data);
        if(error){
            console.error('something went wrong')
        }else if(userInputIndex < data.length && userInputIndex >= 0 ) {
            console.log(data[userInputIndex])  
         } else if (userInputIndex === undefined){
           console.log(data)
        }  else{
            console.error('Usage: node pets.js read INDEX')
            process.exit(1);
        }
    })
  
}



// var age = parseInt(process.argv[3])
// var kind = process.argv[4]
// var name = process.argv[5]

// var newItem = {};
// newItem.age = age;
// newItem.kind = kind;
// newItem.name = name;
// newItem = JSON.stringify(newItem);
//console.log(newItem)
function create(){
fs.readFile('pets.json', 'utf8', function(error, data){
    if(error){
        console.error('something went wrong')
    }else {
        var oldData = JSON.parse(data)

        var age = parseInt(process.argv[3])
        var kind = process.argv[4]
        var name = process.argv[5]
        
        var newItem = {};
        newItem.age = age;
        newItem.kind = kind;
        newItem.name = name;
        oldData.push(newItem)
        oldData = JSON.stringify(oldData);
        fs.writeFile('pets.json', oldData, (err)=>{
            if (err){
                console.log(err)
            }else{
                console.log('Item Added Successfully!')
            }
        })
    }
})
}


//data = data.push(newItem)

// fs.appendFile('pets.json'.length, newItem, (err)=> {
//     if(err){
//         console.log(err)
//     } else{
//         console.log('Item Added Successfully!')
//     }
// })





if(userInput=== undefined || userInput!== 'read' || userInput!== 'create' || userInput!== 'update' || userInput!== 'destroy' ){
    console.error('Usage: node pets.js [read | create | update | destroy]')
    if (userInput === 'read' ){
        read();

    }else if(userInputIndex === undefined || process.argv[4] === undefined || process.argv[5]===undefined){
        console.error('Usage: node pets.js update INDEX AGE KIND NAME')
    }
    else if(userInput === 'create' && userInputIndex !== undefined && process.argv[4] !== undefined && process.argv[5]!==undefined){
        create()
    }
    
}






// } else if(userInput!== 'read' || userInput!== 'create' || userInput!== 'update' || userInput!== 'destroy' ){
//     console.error('Wrong input.')
// }else{
   
// }


//console.log('he')

//




//console.log(userResponse)

// var read = require('./pets.json')



