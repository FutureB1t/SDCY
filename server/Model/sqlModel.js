var mysql = require('mysql');
var config = require('../../config')

var con = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: config.MYSQL_PASSWORD,
  database: "SDCY"
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

exports.getRelatedProducts = (req, res) => {

    con.connect(function(error) {
        
        if (error) console.log(error);
        
        var sqlQuery = `

            select RelatedID
            from Related
            where ProductID = ${req.params.id};
        `
        
        con.query(sqlQuery, function(error, data) {
            
            if (error) console.log(error)
            res.send(data)
        })
    });
}

exports.getProductCard = (req, res) => {

    var sqlQuery = `

        select Products.ProductID, Products.Name, Products.Category, Products.DefaultPrice, Styles.StyleID, Styles.StyleName, Photos.ThumbnailURL
        from Products
        inner join Styles
        inner join Photos
        on Products.ProductID = Styles.ProductID and Styles.StyleID = Photos.StyleID
        where Products.ProductID = ${req.params.id};
    `
    
    con.query(sqlQuery, function(error, data) {
        
        if (error) console.log(error)
        res.send(data)
    })
}

exports.getProductRating = (req, res) => {

  var sqlQuery = `

      select avg(Rating) as rating
      from Reviews
      where ProductID = ${req.params.id};
  `
  
  con.query(sqlQuery, function(error, data) {
      
      if (error) console.log(error)
      res.send(data)
  })
}
