var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'o2'
});
 
conn.connect();
const express = require('express');
const fs = require('fs');
const { runInNewContext } = require('vm');
const app = express();
app.locals.pretty = true;
app.set('views', './views_sql');
app.set('view engine', 'jade');
app.use(express.urlencoded({extended:true}))
app.get('/topic/add', function(req, res){
    var sql = 'SELECT id, title FROM topic'
    conn.query(sql, function(err, rows, fields){
        res.render('add', {topics:rows})
    });
})
app.post('/topic/add', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) values(?, ?, ?)';
    conn.query(sql, [title, description, author], function(err, result, fields){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        else{
            res.redirect('/topic/'+result.insertId);
        }
    })
})
app.get(['/topic/:id/edit'], function(req, res){
    var sql = 'SELECT id, title FROM topic'
    conn.query(sql, function(err, rows, fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, row, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('edit', {topics:rows, topic:row[0]})
                }
            })
        }
        else{
            console.log('There is no id.');
            res.status(500).send('Internal Server Error');
        }
    })
})
app.post('/topic/:id/edit', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    var sql = 'update topic set title=?, description=?, author=? where id=?';
    conn.query(sql, [title, description, author, id], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else{
            res.redirect('/topic/'+id);
        }
    })
});
app.get('/topic/:id/delete', function(req, res){
    var sql = 'SELECT id, title FROM topic';
    var id = req.params.id;
    conn.query(sql, function(err, rows){
        var sql = 'select * from topic where id=?';
        conn.query(sql, [id], function(err, row){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            else{
                if(row.length == 0){
                    console.log('There is no record.');
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('delete', {topics:rows, topic:row[0]});
                }
            }
        })
    })
})
app.post('/topic/:id/delete', function(req, res){
    var id = req.params.id;
    var sql = 'delete from topic where id=?';
    conn.query(sql, [id], function(err, result){
        res.redirect('/topic');
    })
});
app.get(['/topic', '/topic/:id'], function(req, res){
    var sql = 'SELECT id, title FROM topic'
    conn.query(sql, function(err, rows, fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, row, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('view', {topics:rows, topic:row[0]})
                }
            })
        }
        else{
            res.render('view', {topics:rows});
        }
    })
})
app.listen(3000, function(){
    console.log('Connected, 3000 port!');
})