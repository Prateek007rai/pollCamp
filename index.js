const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');
const sassMiddleware =require('node-sass-middleware');



app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}));



app.use(express.urlencoded({ extended: true }));


app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



//set up the routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
      console.log(`Error running the server on port: ${err}`);
      return;
    }
    console.log(`Server is running on port no. :: ${port}`);
  });