const express = require('express');
const fs = require('fs');
const { runInNewContext } = require('vm');
const app = express();
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(express.urlencoded({extended:true}))
app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    })
})
app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id, 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {title:id, topics:files, description:data});
            })
        }
        else{
            res.render('view', {topics:files, title:'Welcome', description:'Hello JavaScript'});
        }
    })
})
app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+ title, description, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    })
})

app.listen(3000, function(){
    console.log('Connected, 3000 port!');
})