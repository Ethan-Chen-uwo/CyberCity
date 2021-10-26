var express = require ('express');
var path = require('path');
var https = require('https');

var prefix = "https://xkcd.com"
var suffix = "/info.0.json";
var port =  process.env.PORT || 3000;

var maxNum = 1;

var app = express();
app.set('view engine','ejs');

// static resource js/css
//app.use('/',express.static(path.join(__dirname,'public')));
//dynamic send back html
//send current comic 
app.get('/',(req,res) => {
    //fetch xkcd
    getComic(prefix+suffix,res, req);
});

app.get('/:id',(req,res) => {
    getComic(prefix+"/"+req.params.id+suffix,res,req);
});

app.get('/random/comic',(req,res) => {
    let randomNum = Math.floor(Math.random()*maxNum)+1;
    console.log("randomguy"+randomNum);
    getComic(prefix+"/"+randomNum+suffix,res,req);
});

app.listen(port, ()=>{
    console.log('listening at port' + port);
});

function getComic(url, res, req) {
    https.get(url, (response) => {
        console.log("receive json from xkcd"+url);
        if (response.statusCode != 200) {
            console.log("falsecode:" + response.statusCode);
            res.render('page/error', (err,html)=>{
                res.send(html);
            });
        }else{
            let data = '';
            response.on('data', (d) => {
                data += d;
            });
            response.on('end', () => {
                let parseData = JSON.parse(data);
                // console.log(parseData);
                maxNum = maxNum>parseData.num ? maxNum:parseData.num;
                res.render('page/index', {
                    year: parseData.year,
                    month: parseData.month,
                    day: parseData.day,
                    img: parseData.img,
                    alt: parseData.alt,
                    safetitle: parseData.safe_title,
                    transcript: parseData.transcript,
                    prevNum: parseData.num > 1 ? parseData.num - 1 : 1,
                    nextNum: parseData.num + 1
                },(err,html)=>{
                    res.send(html);
                });
            });
        }
        

    });
}
