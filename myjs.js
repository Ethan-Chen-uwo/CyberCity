var prefix = "https://proxytoxkcd.herokuapp.com/"
//got current comic
function gotComic(url) {
    console.log("fuck")
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.send();
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

gotComic(prefix+"comic");
gotComic(prefix+"comic/124");

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