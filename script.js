const idDivMedia = "divOutMedia";
const idDivListFiles = "divOutListFiles";
const idFileKey = "fileKey";
const idFiles = "multiFileDate";
const testKey = new Uint8Array([2,1,4,7,8,15]);

function downloadFile(filename, data) 
{
    var a = document.createElement('a');
    a.style = "display: none";  
    var blob = new Blob([data], {type: "application/octet-stream"});
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); 
        }, 2000);
}

function byteXOR(byteArrayData, byteArrayKey) {
    let out = new Uint8Array(byteArrayData.length);
    let keyID = 0;
    const maxKeyID = byteArrayKey.length;

    for (let i = 0; i < byteArrayData.length; i++){
        out[i] = byteArrayData[i] ^ byteArrayKey[keyID];

        keyID++;
        if (keyID >= maxKeyID) keyID = 0;
    }
    return out;
}

function createText(text, containerId) {
    let a = document.createElement('a');
    a.innerHTML = text;
    document.getElementById(containerId).appendChild(a);
}
function returnHTML(text) {
    let a = document.createElement('a');
    a.innerHTML = text;
    a.className = "lineListText";
    return a;
}

function createDownloadButton(file) {
    const name = file.name;

    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Скачать");
    button.setAttribute("name", name);
    button.appendChild(buttonText);
    button.type = "button";
    button.className = "lineListButton";
    button.onclick = function() {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        const fileKey = document.getElementById(idFileKey).files[0];
        let readerKey = new FileReader();
        readerKey.readAsArrayBuffer(fileKey);

        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);

            const resultKey = readerKey.result;
            const viewKey = new Uint8Array(resultKey);
            
            console.log(view);

            downloadFile(name, byteXOR(view, viewKey));
        }
    };
    return button;
}
function createOpenTextButton(file) {
    const name = file.name;

    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Открыть как текст");
    button.setAttribute("name", name);
    button.appendChild(buttonText);
    button.type = "button";
    button.className = "lineListButton";
    button.onclick = function() {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        const fileKey = document.getElementById(idFileKey).files[0];
        let readerKey = new FileReader();
        readerKey.readAsArrayBuffer(fileKey);

        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);

            const resultKey = readerKey.result;
            const viewKey = new Uint8Array(resultKey);

            const file = byteXOR(view, viewKey);

            let text = new TextDecoder().decode(file);


            let div = document.createElement('div');
            div.className = "mediaContent";
            let a = document.createElement('a');
            a.innerHTML = text;
            a.className = "minText";
            a.addEventListener('click', function() {
                // console.log('text');
                var i_path = $(this).text();
                $('body').append('<div id="overlay"></div><div id="magnify"><div class="bigTextBG"><a>'+i_path+'</a></div><div id="close-popup"><i></i></div></div>');
                $('#magnify').css({
                left: ($(document).width() - $('#magnify').outerWidth())/2,
                        top: ($(window).height() - $('#magnify').outerHeight())/2
                });
                $('#overlay, #magnify').fadeIn('fast');
            });
            div.appendChild(a);

            document.getElementById(idDivMedia).appendChild(div);
        }
    };
    return button;
}
function createOpenImageButton(file) {
    const name = file.name;

    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Открыть как картинку");
    button.setAttribute("name", name);
    button.appendChild(buttonText);
    button.type = "button";
    button.className = "lineListButton";
    button.onclick = function() {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        const fileKey = document.getElementById(idFileKey).files[0];
        let readerKey = new FileReader();
        readerKey.readAsArrayBuffer(fileKey);

        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);

            const resultKey = readerKey.result;
            const viewKey = new Uint8Array(resultKey);

            const file = byteXOR(view, viewKey);

            let blob = new Blob([file], {type: "application/octet-stream"});
            let url = window.URL.createObjectURL(blob);

            let div = document.createElement('div');
            div.className = "mediaContent";
            let img = document.createElement('img');
            img.className = "minImg";
            img.src = url;
            img.alt = name;
            img.addEventListener('click', function() {
                var i_path = $(this).attr('src');
                $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
                $('#magnify').css({
                left: ($(document).width() - $('#magnify').outerWidth())/2,
                        top: ($(window).height() - $('#magnify').outerHeight())/2
                });
                $('#overlay, #magnify').fadeIn('fast');
            });
            div.appendChild(img);

            document.getElementById(idDivMedia).appendChild(div);
        }
    };
    return button;
}
function createOpenVideoButton(file) {
    const name = file.name;

    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Открыть как видео");
    button.setAttribute("name", name);
    button.appendChild(buttonText);
    button.type = "button";
    button.className = "lineListButton";
    button.onclick = function() {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        const fileKey = document.getElementById(idFileKey).files[0];
        let readerKey = new FileReader();
        readerKey.readAsArrayBuffer(fileKey);

        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);
            
            const resultKey = readerKey.result;
            const viewKey = new Uint8Array(resultKey);

            const file = byteXOR(view, viewKey);

            let blob = new Blob([file], {type: "application/octet-stream"});
            let url = window.URL.createObjectURL(blob);

            const htmlCode = '<div class="mediaContent"><video src="' + url + '" controls="controls" class="minVideo"></video></div>';
            createText(htmlCode, idDivMedia);
        }
    };
    return button;
}

document.getElementById('btnEncryptor').addEventListener('click', function() {
    const containerId = idDivListFiles;
    const filesDate = document.getElementById(idFiles).files;

    for (const el of filesDate) {
        let div = document.createElement('div');
        div.className = "lineList";

        let divIn = document.createElement('div');
        divIn.className = "lineButtons";
        divIn.appendChild(createDownloadButton(el));
        divIn.appendChild(createOpenTextButton(el));
        divIn.appendChild(createOpenImageButton(el));
        divIn.appendChild(createOpenVideoButton(el));

        div.appendChild(returnHTML(el.name));
        div.appendChild(divIn);

        document.getElementById(containerId).appendChild(div);
    }
});

  $(function(){  
    // закрывашка
    $('body').on('click', '#close-popup, #overlay', function(event) {
      event.preventDefault();
      $('#overlay, #magnify').fadeOut('fast', function() {
        $('#close-popup, #magnify, #overlay').remove();
      });
    });
  });
