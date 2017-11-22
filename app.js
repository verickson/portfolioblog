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
  get_all_posts().then(function(all_posts){
    res.render('index',{
      title:"Portfolio"
    });
  });
});

//blog page
app.get('/blog', function(req, res){
  res.render('blog',{
    posts: all_posts,
    title:"Blog"
  });
});

//adding posts to the blog page
app.get('/add-blog', function(req, res){
  query('insert into blog (title, posts, posttime) values ($1, $2, $3)', [req.query.title, req.query.posts, req.query.posttime], function(err, result) {
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
var server = app.listen(3999, function(){
  console.log('open http://localhost:3333 in the browser');
});
