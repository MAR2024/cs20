// JavaScript Document

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mred01:fyHxUhmS7szENUL7@cluster0.gin7l.mongodb.net/companies?retryWrites=true&w=majority";


app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<style>td { padding-right: 30px; padding-bottom: 10px; } body { margin: 35px;} .top {padding-bottom: 20px;}</style>")
   res.write(`<div class = top><strong>You entered the ${req.body.c_or_t}: </strong> ${req.body.ctInput}.</div>`);


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("companies");
  if (req.body.c_or_t == "company") {
	  const query = {company:req.body.ctInput};
	  dbo.collection("companies").find(query).toArray(function(err, result) {
    if (err) throw err;
      if (result.length != 0) {
		res.write("<table>")
		for (i = 0; i < result.length; i++) {
			//console.log("Company: " + result[i].company + "\nTicker: " + result[i].ticker);
			res.write("<tr><td><strong>Company: </strong>" + result[i].company + "</td><td><strong>Ticker</strong>: " + result[i].ticker + "</td></tr>");
			if (i == result.length - 1) {
				res.write("</table>");
				res.end();
			}
		} 
  } else {
			res.write("<p>No Results Found :(</p>");
			res.end();
		}
    db.close();
  });
  } else if (req.body.c_or_t == "ticker") {
	  const query = {ticker: req.body.ctInput };
	  dbo.collection("companies").find(query).toArray(function(err, result) {
    if (err) throw err;
     if (result.length != 0) {
		 res.write("<table><tr><td><strong>Company:</td><td><strong>Ticker</strong>:</td>");
	  for (i = 0; i < result.length; i++) {
		//console.log("Company: " + result[i].company + "\nTicker: " + result[i].ticker);
		  res.write("<tr><td>" + result[i].company + "</td><td>" + result[i].ticker + "</td></tr>");
		  if (i == result.length - 1) {
			  res.write("</table>");
			  res.end();
			}
	  }
  } else {
			res.write("<p>No Results Found :(</p>");
			res.end();
		}
    db.close();
  });
  }
});
});

app.listen(port, () => {
   console.log(`Server running on port${port}`);
});