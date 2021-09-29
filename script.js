const idDivMedia = "divOutMedia";
const idDivListFiles = "divOutListFiles";
const idFileKey = "fileKey";
const idFiles = "multiFileDate";

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
    let out = []
    let keyID = 0;
    const maxKeyID = byteArrayKey.length;

    for (let i = 0; i < byteArrayData.length; i++){
        out.push(byteArrayData[i] ^ byteArrayKey[keyID]);

        keyID++;
        if (keyID >= maxKeyID) keyID = 0;
    }

    return new Uint8Array(out);
}

function createText(text, containerId) {
    let a = document.createElement('a');
    a.innerHTML = text;
    document.getElementById(containerId).appendChild(a);
}

function createDownloadButton(file, containerId) {
    const name = file.name;

    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Скачать");
    button.setAttribute("name", name);
    button.appendChild(buttonText);
    button.type = "button";
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
        }
    };
    document.getElementById(containerId).appendChild(button);
}
function createOpenImageButton(file, containerId) {
    const name = file.name;

    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Открыть как картинку");
    button.setAttribute("name", name);
    button.appendChild(buttonText);
    button.type = "button";
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

            const htmlCode = '<br><img src="' + url + '" alt="' + name + '" style="max-width:400px;width:100%">';
            createText(htmlCode, idDivMedia);
        }
    };
    document.getElementById(containerId).appendChild(button);
}
function createOpenVideoButton(file, containerId) {
    const name = file.name;

    button = document.createElement("BUTTON");
    buttonText = document.createTextNode("Открыть как видео");
    button.setAttribute("name", name);
    button.appendChild(buttonText);
    button.type = "button";
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

            const htmlCode = '<br><video src="' + url + '" controls="controls"></video>';
            createText(htmlCode, idDivMedia);
        }
    };
    document.getElementById(containerId).appendChild(button);
}

document.getElementById('btnEncryptor').addEventListener('click', function() {
    const containerId = idDivListFiles;
    const filesDate = document.getElementById(idFiles).files;

    for (const el of filesDate) {        
        createText('<br>' + el.name + '  :  ', containerId);
        createDownloadButton(el, containerId);
        createOpenImageButton(el, containerId);
        createOpenVideoButton(el, containerId);
    }
});