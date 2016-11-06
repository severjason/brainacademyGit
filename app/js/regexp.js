"use strict";
(function () {
    document.addEventListener("DOMContentLoaded", function () {

        var text = document.getElementById("log_file_text").innerHTML;
        var resultText = document.getElementById("result");
        var regexpIP = /((\d{1,3}\.){3}\d{1,3})/gim;
        var regexpDate = /(\d{2}[\/]\w{3}[\/]\d{4})/gim;
        var arr;
        var resultIP = [];
        var resultDate = [];

        while(( arr = regexpIP.exec(text)) !== null) {
            resultIP.push(arr[0]);
        }

        while(( arr = regexpDate.exec(text)) !== null) {
            resultDate.push(arr[0]);
        }

        for (var i = 0; i < resultIP.length; i++) {
            resultText.innerHTML += resultDate[i] + " - " + resultIP[i] + "<br>";
        }

    });

})();
