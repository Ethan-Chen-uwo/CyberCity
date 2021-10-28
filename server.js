var express = require ('express');
var path = require('path');
var https = require('https');
//xkcd url
var prefix = "https://xkcd.com"
var suffix = "/info.0.json";
var port =  process.env.PORT || 3000;

// save the number of latest comic
var maxNum = 1;
//counters save the times that a specific comic has been viewed
var viewCounter = [0];

var app = express();
app.set('view engine','ejs');

// static resource javascript/css
app.use('/',express.static(path.join(__dirname,'public')));

//get the main page
app.get('/',(req,res) => {
    getComic(prefix+suffix,res);
});

function isNum(val){
    var reg = new RegExp("[0-9]");
    return reg.test(val);
}
//get specific comic page with id in url
app.get('/:id',(req,res) => {
    if(isNum(req.params.id)){
        getComic(prefix+"/"+req.params.id+suffix,res);
    }
    else{
        renderError(res);
    }
});

//get random comic
app.get('/random/comic',(req,res) => {
    //get a random number in [1,currentcomicnumber]
    let randomNum = Math.floor(Math.random()*maxNum)+1;
    getComic(prefix+"/"+randomNum+suffix,res);
});



app.listen(port, ()=>{
    console.log('listening at port:' + port);
    //get the number of the current comic first!
    https.get(prefix + suffix,res =>{
        if(res.statusCode != 200){//means we can not connect with xkcd.com
            console.log('cannot connect with xkcd.com');
        }else{//get the current comic data then change the maxnumber and init the counter array
            let data = '';
            res.on('data', (d) => {data += d;});
            res.on('end', () => {let parseData = JSON.parse(data);
                if(parseData.num  > maxNum){
                    viewCounter = Array(parseData.num).fill(0);
                    maxNum = parseData.num;
                }
            });
        }
    })
});



function getComic(url, res) {
    https.get(url, (response) => {
        // console.log("receive json from xkcd:"+url);
        if (response.statusCode != 200) { // send back error page
            console.log("falsecode:" + response.statusCode + "from" + url);
            renderError(res);
        }else{ // got comic data and transfer it to html then send back to client
            renderHtml(response, res);
        }
    });
}

function renderError(res) {
    res.render('page/error');
}

function renderHtml(response, res) {
    let data = '';
    response.on('data', (d) => {//receive data
        data += d;
    });
    response.on('end', () => {//use data to render ejs and send back the html to client
        let parseData = JSON.parse(data);
        // console.log(parseData);
        // if got new leatest comic
        if(parseData.num  > maxNum){
            for(let i=0; i<parseData.num - maxNum; i++){
                viewCounter.push(0);
            }
            maxNum = parseData.num;
        }
        if(parseData.num > 0)
            viewCounter[parseData.num -1]++;
        //give data to template and render html 
        res.render('page/index', {
            year: (!parseData.year)? 'unknown':parseData.year,
            month: (!parseData.month)? 'unknown':parseData.month,
            day: (!parseData.day)? 'unknown':parseData.day,
            img: parseData.img,
            alt: (!parseData.alt)? 'unknown':parseData.alt,
            safetitle: (!parseData.safe_title)? 'unknown':parseData.safe_title,
            transcript: (!parseData.transcript)? 'transcript unavialable':parseData.transcript,
            counter: parseData.num > 0 ? viewCounter[parseData.num -1]:0,
            prevNum: parseData.num > 1 ? parseData.num - 1 : 1,
            nextNum: parseData.num + 1
        });
    });
}

