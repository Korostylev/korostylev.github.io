const key = 12
const strKey = 'pass'

function dec2bin(dec){
    return (dec>>> 0).toString(2);
}
function bin2dec(bin){
    return parseInt(bin, 2).toString(10);
}
function xorForString(str){
    const arr = str.split('')
    // for (let i = 0; i < str.length; i++){
    //     console.log(str[i])
    // }
    
    // console.log(arr)

    let newArr = []

    for (let el of arr){
        const code = el.charCodeAt()
        // const bin = dec2bin(code)
        const newSymbol = String.fromCharCode(code^key)
        newArr.push(newSymbol)
        console.log(el, code, newSymbol)
    }

    console.log(newArr.join(''))
    return newArr.join('')
}

function xorForStringKeyString(str, key){
    const arr = str.split('')

    const arrKey = key.split('')
    const maxNumKey = arrKey.length
    let idKey = 0

    let newArr = []
    for (const el of arr){
        const code = el.charCodeAt()
        const keyCode = arrKey[idKey].charCodeAt()

        idKey++
        if (idKey >= maxNumKey) idKey = 0

        const newSymbol = String.fromCharCode(code^keyCode)
        newArr.push(newSymbol)
        // console.log(el, code, newSymbol)
    }

    // console.log(newArr.join(''))
    return newArr.join('')
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

let num = 20
let str = 'Hello World!'

// console.log('num: ', num)
// console.log('str: ', str)

// console.log('dec2bin num: ', dec2bin(num))

// let out = str.charCodeAt(0)
// console.log(out)

// xorForString(xorForString(str))

// xorForStringKeyString(xorForStringKeyString(str, strKey), strKey)


// document.querySelector('button').addEventListener('click', function() {
//     const file = document.getElementById('file').files[0];
//     const fileName = file.name;
//     let reader = new FileReader();
//     reader.readAsText(file);
//     reader.onload = function() {
//         const result = reader.result;
//         // console.log(result);

//         // const outputText = xorForStringKeyString(result, strKey)
//         // // document.write('<br><a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(outputText) + '" download="' + fileName + '">Файл</a>');
//         // downloadFile(fileName, outputText)
//         downloadFile(fileName, result)
//     }
//     reader.onerror = function() {
//       console.log(reader.error);
//     }
//   });

function byteXOR(byteArrayData, byteArrayKey) {
    let out = []
    // for (const el of byteArrayData) {
    //     out.push(el^key);
    // }

    // console.log(byteArrayData.length)

    let keyID = 0;
    const maxKeyID = byteArrayKey.length;

    for (let i = 0; i < byteArrayData.length; i++){
        out.push(byteArrayData[i] ^ byteArrayKey[keyID]);

        keyID++;
        if (keyID >= maxKeyID) keyID = 0;
    }

    return new Uint8Array(out);
}

document.querySelector('button').addEventListener('click', function() {
    const fileDate = document.getElementById('fileDate').files[0];
    const fileKey = document.getElementById('fileKey').files[0];
    const fileName = fileDate.name;

    let reader = new FileReader();
    reader.readAsArrayBuffer(fileDate);
    let readerKey = new FileReader();
    readerKey.readAsArrayBuffer(fileKey);


    reader.onload = function() {
        const result = reader.result;
        const view = new Uint8Array(result);

        const resultKey = readerKey.result;
        const viewKey = new Uint8Array(resultKey);
            
        downloadFile(fileName, byteXOR(view, viewKey));
    }
    reader.onerror = function() {
      console.log(reader.error);
    }
  });

// Создание файла для скачивания
// let text = 'как записать строку в файл ".txt" с помощью js?';
// document.write('<br><a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(text) + '" download="text.txt">text.txt</a>');