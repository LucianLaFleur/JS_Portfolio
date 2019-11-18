const express = require('express');

const app = express();

// Middleware working example
// app.use(function(req, res, next){
//   console.log(Date.now());
//   next();
// });


// index route, deal with request and response
app.get('/', (req, res) => {
  res.send('INDEX');
})

// About Route
app.get('/about', (req, res) => {
  res.send('ABOUT');
})

const port = 5000;

app.listen(port, ()=>{
  console.log(`Server started on port ${port}`)
});