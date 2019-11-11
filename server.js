var express = require("express");
var app     = express();
var path    = require("path");
var svgCaptcha = require('svg-captcha');
var bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var port = process.env.PORT || 3000;
var captchatext='';
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
 
app.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create();
     captchatext = captcha.text;
    
    res.set('Content-Type', 'image/svg+xml');
    res.status(200).send(captcha.data);
});

app.post('/validate', function (req, res) {
    if(captchatext== req.body.text)
      res.send(true);
    else
      res.send(false);
});

app.listen(port);

console.log("Running at Port 3000");
