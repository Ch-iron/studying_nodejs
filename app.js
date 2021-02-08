const express = require('express');

const app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.get('/template', function(req, res){
    res.render('temp', {time:Date(), _title:'Jade'});
})
app.get('/', function(req, res){
    res.send('Hello home page');
})
app.get('/dynamic', function(req, res){
    var lis = '';
    for(var i = 0; i < 5; i++){
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>test</title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
                ${lis}
            </ul>
            ${time}
        </body>
    </html>`;
    res.send(output);
})
app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/pikachu.jpg">');
})
app.get('/login', function(req, res){
    res.send('Login please');
})
app.listen(3000, function(){
    console.log('Connected 3000 port!');
});