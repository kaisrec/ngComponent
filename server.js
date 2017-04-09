var express = require('express'),
    app = express(),
    port = 3000,
    path = require('path'),
    agences = require('./agences.json');
    
app.use('/', express.static(path.join(__dirname,'public')));
app.get('/agences',function(req,res){
  res.json(agences);
});
app.listen(port, function () {
    console.log('Server running on http://localhost:3000');
    });

