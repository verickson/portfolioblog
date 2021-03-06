var express = require('express');
var app = express();
var query = require('./query');

var all_posts = [];

function get_all_posts(){
  return new Promise(function(resolve, reject){
    query('select * from blog order by id desc', function(err, result) {
      if(err){
        reject(err);
      }
      resolve(result.rows);
    });
  });
}

app.set('view engine', 'pug');

//home page
app.get('/', function(req, res){
  res.render('index',{
    title:"Portfolio"
  });
});

//blog page
app.get('/blog', function(req, res){
  get_all_posts().then(function(all_posts){
    res.render('blog',{
      blogposts: all_posts,
      title:"Blog"
    });
  });
});

//adding posts to the blog page
app.get('/add-blog', function(req, res){
  query('insert into blog (title, posts) values ($1, $2)', [req.query.title, req.query.posts], function(err, result) {
    if(err){
      console.log(err);
      return done (client);
    }
    console.log('Blog posted.');
  });
  return res.redirect('/blog');
});

//error message for other pages
app.get('*', function(req, res){
  res.status(404).send('page not found!');
});

//server location
var server = app.listen(3333, function(){
  console.log('open http://localhost:3333 in the browser');
});
