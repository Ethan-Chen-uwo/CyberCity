var prefix = "https://proxytoxkcd.herokuapp.com/"
var suffix = "info.0.json";
//the max number of comic (the current comic)
var comicNum = 0;
//the number of the comic which show on the page now
var curNum = 0;

//show the comic and the details of the comic
function renderComic(comic){
    let image = document.getElementById("comic");
    let time = document.getElementById("time");
    let title = document.getElementById("safeTitle");

    image.src = comic.img;
    image.alt = comic.alt;
    time.innerText = comic.year+"."+comic.month+"."+comic.day;
    title.innerText = comic.safe_title;
    
    comicNum = comic.num > comicNum? comic.num:comicNum;
    curNum = comic.num;
}

function gotComic(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.send();
    xhr.onload = ()=>{
        if(xhr.status != 200){
            renderError();
        } else {
            console.log(xhr.response);
            renderComic(xhr.response);
        }
    };
    xhr.onprogress = (event) =>{
        console.log(event.loaded);
    };
    xhr.onerror = ()=>{
        renderError();
    };
    
}

gotComic(prefix+suffix);

document.getElementById("nextBut").onclick = ()=>{
    //try to get next comic
    let url = prefix  + (curNum+1) + "/" + suffix;
    console.log(url);
    gotComic(url);
};

document.getElementById("prevBut").onclick = ()=>{
    if(curNum <= 1)
        return;
    let url = prefix + (curNum-1) + "/" + suffix;
    console.log(url);
    gotComic(url);
};

document.getElementById("randomBut").onclick = ()=>{
    let randomNum = Math.floor(Math.random()*comicNum)+1;
    let url = prefix + randomNum + "/" + suffix;
    console.log(url);
    gotComic(url);
};

document.getElementById("jumpBut").onclick = ()=>{
    let number = document.getElementById("inputNum").value;
    //add check
    let url = prefix + number + "/" + suffix;
    console.log(url);
    gotComic(url);
};