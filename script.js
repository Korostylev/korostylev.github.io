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

// function byteXOR(byteArrayData, byteArrayKey) {
//     let out = []
//     let keyID = 0;
//     const maxKeyID = byteArrayKey.length;

//     for (let i = 0; i < byteArrayData.length; i++){
//         out.push(byteArrayData[i] ^ byteArrayKey[keyID]);

//         keyID++;
//         if (keyID >= maxKeyID) keyID = 0;
//     }

//     return new Uint8Array(out);
// }

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
            // console.log(viewKey);
            // console.log(byteXOR(view, viewKey));

            downloadFile(name, byteXOR(view, viewKey));
            // downloadFile(name, view);
            // let s = byteXOR(view, viewKey);
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

            var text = new TextDecoder().decode(file);

            const htmlCode = '<div class="mediaContent"><a>' + text + '</a></div>';
            createText(htmlCode, idDivMedia);
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

            const htmlCode = '<div class="mediaContent"><img src="' + url + '" alt="' + name + '" style="max-width:400px"></div>';
            createText(htmlCode, idDivMedia);
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

            const htmlCode = '<div class="mediaContent"><video src="' + url + '" controls="controls"></video></div>';
            createText(htmlCode, idDivMedia);
        }
    };
    return button;
}




// data: массив элементов для обработки;
// handler: функция, применяемая для обработки каждого отдельного элемента массива;
// callback: дополнительная функция, вызываемая после полной обработки массива.
function ProcessArray(data, handler, callback) {
    let maxtime = 100; // время обработки блоков массива
    let delay = 20; // задержка между двумя процессами обработки блоков
    let queue = data.concat(); // копия исходного массива

    setTimeout(function() {
        let endtime = +new Date() + maxtime;
        do {
            handler(queue.shift());
        } while (queue.length > 0 && endtime > +new Date());
        if (queue.length > 0) {
            setTimeout(arguments.callee, delay);
        }
        else {
            if (callback) callback();
        }
    }, delay);
}
// конец функции ProcessArray
// обработка отдельного элемента массива
function Process(dataitem) {
    console.log(dataitem);
   }
   // функция, вызываемая после завершения обработки
   function Done() {
    console.log("Готово");
   }
   // тестовые данные
   var data = [];
   for (var i = 0; i < 500; i++) data[i] = i;
   // обработка элементов массива
//    ProcessArray(data, Process, Done); 


// =============================================================================================================
// -------------------------------------------------------------------------------------------------------------

function myProcessArray(data, key, handler, callback) {
    const maxtime = 100; // время обработки блоков массива
    const delay = 20; // задержка между двумя процессами обработки блоков
    let queue = new Uint8Array(data); // копия исходного массива
    const lenArr = queue.length;
    let numArr = 0;
    const lenKey = key.length;
    let numKey = 0;

    let out = new Uint8Array(lenArr);

    setTimeout(function() {
        let endtime = +new Date() + maxtime;
        do {
            out[numArr] = handler(queue[numArr], key[numKey]);
            numArr++;
            numKey++;
            if (numKey > lenKey) numKey = 0;
        } while (queue.length > numArr && endtime > +new Date());
        if (queue.length > numArr) {
            setTimeout(arguments.callee, delay);
        }
        else {
            if (callback) callback(out);
        }
    }, delay);
}
// конец функции ProcessArray
// обработка отдельного элемента массива
function myProcess(dataitem, item2) {
    // console.log(dataitem^item2);
    return dataitem^item2;
   }
   // функция, вызываемая после завершения обработки
function myDone(out) {
    console.log("Готово");
    console.log(out);
    downloadFile('file', out)
}
   
// -------------------------------------------------------------------------------------------------------------
// =============================================================================================================

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

    // const fileKey = document.getElementById(idFileKey).files[0];
    // let readerKey = new FileReader();
    // readerKey.readAsArrayBuffer(fileKey);

    // readerKey.onload = function() {
    //     const resultKey = readerKey.result;
    //     const viewKey = new Uint8Array(resultKey);
            
    //     console.log(viewKey);
    //     myProcessArray(viewKey, testKey, myProcess, myDone); 
    // }
});