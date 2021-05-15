// npm install mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SDCY"
});

con.connect(function(error) {
  if (error) console.log(error);

  var sql = `select *
  from Photos p
  inner join Styles s
  inner join Products pr
  on p.StyleID = s.StyleID and s.ProductID = pr.ProductID
  where pr.DefaultPrice > 500
  limit 5;`

  con.query(sql, function(error, res) {

    if (error) console.log(error)
    console.log(res)
  })
});


/*
Assumptions:
1. We are going to use express, AJAX (axios)
2. SQL commands will be run on the Express (server side), not directly from the React side
3. We're going to define app.post('/some_route') to send the data from MySQL using con.connect

app.post('/someroute', function(req, res) {

  var return = [];

  con.connect(function(error) {
    var sql = `some sql code`
    con.query(sql, function(error, res) {
      return = res # this is going to save the MySQL results
    })
  });

  res.send(return)
})
*/