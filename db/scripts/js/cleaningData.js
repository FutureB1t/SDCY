// npm install d3
// npm install lodash
// npm install node-fetch

// to be able to access the files on the local computer, I have installed http-server
// npm install http-server -g
// cd ~/Desktop/SDCY
// http-server

// Potential things that might be wrong with the data
// 1. Missing values (empty)
// 2. Have null as a value
// 3. Might be missing rows
// 4. Format of the data might be wrong (e.g. date might be in different format than expected)
// 5. Data might have unusual characters


// Discovered data "errors"
// Price might contain $ or not (how to fix: remove all the dollar signs from price columns)


const d3 = require("d3");
const lodash = require("lodash");
const fetch = require("node-fetch");

// example data has 99 "data rows" and 1 "column row"
d3.csv("http://10.0.0.16:8080/db/csv/head_files/product.csv.head.csv").then(function(data) {

  var numberOfRows    = d3.max(data, function(d) { return d.id; });
  var minDefaultPrice = d3.min(data, function(d) { return d.default_price; });
  var maxDefaultPrice = d3.max(data, function(d) { return d.default_price; });

  console.log(data.length);
  console.log(numberOfRows);
  console.log(minDefaultPrice);
  console.log(maxDefaultPrice);
});

