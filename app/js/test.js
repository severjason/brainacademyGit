function flatArray(arr) {

    var newArray = [];

    return function flat(arr) {

        for (var i = 0, arrLength = arr.length; i < arrLength; i++) {

            (Array.isArray(arr[i])) ? flat(arr[i]) : newArray.push(arr[i]);
        }

        return newArray;
    }(arr);
}

function compareArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i= 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
var source = [1,2,3,[4,7]];


function urlArgs(query) {
    var args = {};
    var pairs = query.split("&");

    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }

    return args;
}

var args = urlArgs(location.search.substring(1));
var q = args.q || "";
var n = args.n ? parseInt(args.n):10;

var ajaxRequest = function (method, url) {


    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onload = function (e) {

        if (xhr.status === 200) {
            console.log(xhr.responseText);
            return xhr.responseText;
        } else {
            console.error(xhr.statusText);
        }
    };

    xhr.send(null);

};



