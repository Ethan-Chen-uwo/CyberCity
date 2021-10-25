var express = require ('express');

var app = express();

app.use(express.static(path.join(__dirname,'public')));
// //send current comic 
// app.get('/comic',(req,res) => {

// });
// //send {id} comic 
// app.get('/comic/:id',(req,res) => {

// });


var port =  process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('listening at port' + port);
});