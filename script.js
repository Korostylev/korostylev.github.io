const idDivMedia = "divOutMedia";
const idDivListFiles = "divOutListFiles";
const idFileKey = "fileKey";
const idFiles = "multiFileDate";
const testKey = new Uint8Array([2,1,4,7,8,15]);

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);

            const fileKey = document.getElementById(idFileKey).files[0];
            let readerKey = new FileReader();
            readerKey.readAsArrayBuffer(fileKey);

            readerKey.onload = function() {
                const resultKey = readerKey.result;
                const viewKey = new Uint8Array(resultKey);

                console.log(view);
                console.log(viewKey);
                downloadFile(name, byteXOR(view, viewKey));
            }
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

        // Новое
        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);

            const fileKey = document.getElementById(idFileKey).files[0];
            let readerKey = new FileReader();
            readerKey.readAsArrayBuffer(fileKey);

            readerKey.onload = function() {
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

                // Новое
        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);

            const fileKey = document.getElementById(idFileKey).files[0];
            let readerKey = new FileReader();
            readerKey.readAsArrayBuffer(fileKey);

            readerKey.onload = function() {
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

                // Новое
        reader.onload = function() {
            const result = reader.result;
            const view = new Uint8Array(result);

            const fileKey = document.getElementById(idFileKey).files[0];
            let readerKey = new FileReader();
            readerKey.readAsArrayBuffer(fileKey);

            readerKey.onload = function() {
                const resultKey = readerKey.result;
                const viewKey = new Uint8Array(resultKey);

                const file = byteXOR(view, viewKey);

                let blob = new Blob([file], {type: "application/octet-stream"});
                let url = window.URL.createObjectURL(blob);

                const htmlCode = '<div class="mediaContent"><video src="' + url + '" controls="controls" class="minVideo"></video></div>';
                createText(htmlCode, idDivMedia);
            }
        }
    };
    return button;
}

document.getElementById('btnGenKey').addEventListener('click', function() {
    let arrKey = [];

    const lenKey = getRandomInRange(200000,300000);
    for (i = 0; i < lenKey; i++) {
        // console.log(i + ' - ' + getRandomInRange(0, 256));
        arrKey.push(getRandomInRange(0, 255));
    }
    // console.log(arrKey);

    const view = new Uint8Array(arrKey);
    // console.log(view);

    downloadFile('key', view);

    // console.log(255^254);
});

function dlAll(filesDate, viewKey, start, end, delay) {
    if(start >= end) {
        console.log("End!");
        return false;
    }

    const name = filesDate[start].name;
    
    let reader = new FileReader();
    reader.readAsArrayBuffer(filesDate[start]);
    
    reader.onload = function() {
        const result = reader.result;
        const view = new Uint8Array(result);

        downloadFile(name, byteXOR(view, viewKey));
    }

    console.log(name + ' DL ' + start);
    setTimeout(() => {
      dlAll(filesDate, viewKey, start + 1, end, delay);
    }, delay * 1000);
}

document.getElementById('btnDLall').addEventListener('click', function() {
    const filesDate = document.getElementById(idFiles).files;

    const fileKey = document.getElementById(idFileKey).files[0];
    let readerKey = new FileReader();
    readerKey.readAsArrayBuffer(fileKey);

    readerKey.onload = function() {
        const resultKey = readerKey.result;
        const viewKey = new Uint8Array(resultKey);

        dlAll(filesDate, viewKey, 0, filesDate.length, 1);
    }
});

function openImgAll(filesDate, viewKey, start, end, delay) {
    if(start >= end) {
        console.log("End!");
        return false;
    }

    const name = filesDate[start].name;
    
    let reader = new FileReader();
    reader.readAsArrayBuffer(filesDate[start]);
    
    reader.onload = function() {
        const result = reader.result;
        const view = new Uint8Array(result);

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

    console.log(name + ' OPENED ' + start);
    setTimeout(() => {
        openImgAll(filesDate, viewKey, start + 1, end, delay);
    }, delay * 1000);
}

document.getElementById('btnOpenImgAll').addEventListener('click', function() {
    const filesDate = document.getElementById(idFiles).files;

    const fileKey = document.getElementById(idFileKey).files[0];
    let readerKey = new FileReader();
    readerKey.readAsArrayBuffer(fileKey);

    readerKey.onload = function() {
        const resultKey = readerKey.result;
        const viewKey = new Uint8Array(resultKey);

        openImgAll(filesDate, viewKey, 0, filesDate.length, 0.3);
    }
});

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

document.getElementById('btnInfo').addEventListener('click', function() {
    var i_path = 'Данный проект не является коммерческим. Он создан в ознакомительных целях и не несет высокой криптостойкости. Автор не несет ответственности за потерю целостности данных. Все операции над данными осуществляются локально (без загрузки на сервер), поэтому возможность дешифровать данные есть только у Вас. <br>Уточнения для использования сервиса:<br>1. В поле "Ключ" вибирается файл, который будет являться ключем шифровки и дешифровки файла.<br>2. Чтобы дешифровать файл необходимо применить повторную шифровку с тем же ключем к уже ранее зашифрованному файлу.<br>3. На странице без скачивания на компьютер может отобразиться информация только если она была верно дешифрована и выбрано верное представление данных.';
    $('body').append('<div id="overlay"></div><div id="magnify"><div class="bigTextBG"><a>'+i_path+'</a></div><div id="close-popup"><i></i></div></div>');
    $('#magnify').css({
    left: ($(document).width() - $('#magnify').outerWidth())/2,
            top: ($(window).height() - $('#magnify').outerHeight())/2
    });
    $('#overlay, #magnify').fadeIn('fast');
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
