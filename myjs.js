var prefix = "https://xkcd.com"
var suffix = "/info.0.json"
//got current comic
function gotComic(url) {
    console.log("fuck")
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    //xhr.setRequestHeader("Access-Control-Allow-Origin",prefix);
    xhr.send();
    xhr.timeout = 10000;
    xhr.onload = ()=>{
        if(xhr.status != 200){
            
        } else {
            console.log(xhr.response);
        }
    };
    xhr.onprogress = (event) =>{
        console.log(event.loaded);
    };
    xhr.onerror = ()=>{
        console.log("error");
    };
    
}

gotComic(prefix+suffix);

//got next comic
//got previous comicßß
// {
//     mouth,
//     num,
//     link,
//     year,
//     news,
//     safe_title,
//     transcript,
//     alt,
//     img,
//     safe_title
//     day
// }