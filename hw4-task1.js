var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var template = require('consolidate').handlebars;

var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use( bodyParser.urlencoded() );
app.use( bodyParser.json() ); 

app.get('/', function (req, res) {
  res.send( getForm() );
});

app.post('/', function (req, res) {
  var form = getForm(req.body.name);
  if (req.body.news=='Все новости') {
    request('http://www.newsru.com/allnews/', function (error, response, html) {
      if ( !error && response.statusCode == 200 ) {
        var $ = cheerio.load(html);
        res.render('main', {  
          title1: $('.body-page-center-column>div:nth-of-type(2)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews1: $('.body-page-center-column>div:nth-of-type(2)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title2: $('.body-page-center-column>div:nth-of-type(3)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews2: $('.body-page-center-column>div:nth-of-type(3)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title3: $('.body-page-center-column>div:nth-of-type(4)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews3: $('.body-page-center-column>div:nth-of-type(4)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title4: $('.body-page-center-column>div:nth-of-type(5)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews4: $('.body-page-center-column>div:nth-of-type(5)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title5: $('.body-page-center-column>div:nth-of-type(6)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews5: $('.body-page-center-column>div:nth-of-type(6)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
        });
      };
    });
  };

  if (req.body.news=='Новости России') {
    request('http://www.newsru.com/russia/', function (error, response, html) {
      if ( !error && response.statusCode == 200 ) {
        var $ = cheerio.load(html);
        res.render('main', {  
          title1: $('.body-page-center-column>div:nth-of-type(3)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews1: $('.body-page-center-column>div:nth-of-type(3)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title2: $('.body-page-center-column>div:nth-of-type(4)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews2: $('.body-page-center-column>div:nth-of-type(4)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title3: $('.body-page-center-column>div:nth-of-type(5)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews3: $('.body-page-center-column>div:nth-of-type(5)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title4: $('.body-page-center-column>div:nth-of-type(6)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews4: $('.body-page-center-column>div:nth-of-type(6)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title5: $('.body-page-center-column>div:nth-of-type(7)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews5: $('.body-page-center-column>div:nth-of-type(7)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
        });
      };
    });
  };

  if (req.body.news=='Новости мира') {
    request('http://www.newsru.com/world/', function (error, response, html) {
      if ( !error && response.statusCode == 200 ) {
        var $ = cheerio.load(html);
        res.render('main', {  
          title1: $('.body-page-center-column>div:nth-of-type(3)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews1: $('.body-page-center-column>div:nth-of-type(3)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title2: $('.body-page-center-column>div:nth-of-type(4)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews2: $('.body-page-center-column>div:nth-of-type(4)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title3: $('.body-page-center-column>div:nth-of-type(5)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews3: $('.body-page-center-column>div:nth-of-type(5)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title4: $('.body-page-center-column>div:nth-of-type(6)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews4: $('.body-page-center-column>div:nth-of-type(6)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
          title5: $('.body-page-center-column>div:nth-of-type(7)>div:nth-of-type(2)>a:nth-of-type(1)').text().trim(),
          textNews5: $('.body-page-center-column>div:nth-of-type(7)>div:nth-of-type(2)>a:nth-of-type(2)').text().trim(),
        });
      };
    });
  };
});



var getForm = function (name, surname) {
  return '<form action="/" method="post">'+
  '<select class="type_news" id="news" name="news">'+
  '<option selected="selected">Все новости</option>'+
  '<option>Новости России</option>'+
  '<option>Новости мира</option>'+
  '</select>'+
  '<input type="submit"/>'+
  '</form>';
};


app.listen(8000, function () {
  console.log('Server was running on: ', 8000);
});