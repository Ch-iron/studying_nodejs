var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'o2'
});
 
conn.connect();
 
conn.query('SELECT * FROM topic', function (err, rows, fields) {
  if (err) throw err;
  console.log(rows);
  /*for(var i = 0; i < rows.length; i++){
      console.log(rows[i].title);
  }*/
});
/*var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
var params = ['Supervisor', 'Watcher', 'graphittie'];
conn.query(sql, params, function(err, rows, fields){
    if (err) throw err;
    console.log(rows);
});*/
/*var sql = 'UPDATE topic SET title=?, description=? WHERE id=?';
var params = ['NPM', 'leezche', '1'];
conn.query(sql, params, function(err, rows, fields){
    if (err) throw err;
    console.log(rows);
});*/
/*var sql = 'DELETE FROM topic WHERE id=?';
var params = ['1'];
conn.query(sql, params, function(err, rows, fields){
    if (err) throw err;
    console.log(rows);
});*/

conn.end();