const fs = require('fs');
//Sync
var data = fs.readFileSync('test.txt', {encoding:'utf8'});
console.log(data);

//Async
console.log(2);
var data = fs.readFile('test.txt', {encoding:'utf8'}, function(err, data){
    console.log(3);
    console.log(data);
});
console.log(4);