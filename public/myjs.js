showTrans();

function showTrans(){
   var transDiv =  document.getElementById('trans');
   console.log(transDiv.innerHTML);
   transDiv.innerHTML = parseTrans(transDiv.innerHTML);
}

function parseTrans(transcript){
    //create the block to show transcript
    let ret = '<span>Show Transcript</span> <div class="transContent">';
    let tsArray = transcript.split(/\n/);
    tsArray.forEach(element => {
        switch (element[0]) {
            case '[': 
                ret+='<p class="aside">' + element.replace(/[\[\]]/g,'') + '</p>';
                break;
            case '{':
                ret+='<p class="titleText">' + element.replace(/[\{\}]/g,'') + '</p>';
                 break;
            case '&': // innerHTML transfer << to &lt;&lt;
                if(element.match(/&lt;&lt;/)){
                    console.log(element);
                    ret+='<p class="sound">' + '🎵' +element.replace(/&lt;&lt;|&gt;&gt;/g,'') + '</p>';
                    break;
                }
            default:
                ret+='<p class="subtitle">' + element + '</p>';
                break;
        }
    });
    ret += '</div>'
    return ret;
}

