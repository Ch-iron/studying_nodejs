const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: '1232352q',
    resave: false,
    saveUninitialized: true
}))
app.get('/auth/login', function(req, res){
    var output = `
    <h1>Login</h1>
    <form action="/auth/login", method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;
    res.send(output);
})
app.get('/welcome', function(req, res){
    if(req.session.displayname){
        res.send(`
        <h1>Hello, ${req.session.displayname}</h1>
        <a href="/auth/logout">logout</a>
        `);
    }
    else{
        res.send(`
        <h1>Welcome</h1>
        <a href="/auth/login">Login</a>
        `);
    }
    
})
app.get('/auth/logout', function(req, res){
    delete req.session.displayname;
    res.redirect('/welcome');
})
app.post('/auth/login', function(req, res){
    var user = {
        username:'admin',
        password:'admin',
        displayname : 'egoing'
    };
    var uname = req.body.username;
    var pwd = req.body.password;
    if(uname == user.username && pwd == user.password){
        req.session.displayname = user.displayname;
        res.redirect('/welcome');
    }
    else{
        res.send('Who are you? <a href="/auth/login">login</a>');
    }
})
app.get('/count', function(req, res){
    if(req.session.count){
        req.session.count = req.session.count + 1;    
    }
    else{
        req.session.count = 1;
    }
    res.send('count : ' + req.session.count);
})

app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
})