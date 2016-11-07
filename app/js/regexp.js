"use strict";
(function () {
    document.addEventListener("DOMContentLoaded", function () {

        var text = document.getElementById("log_file_text").innerHTML;
        var resultText = document.getElementById("result");

        var resultIP = text.match(/((\d{1,3}\.){3}\d{1,3})/gim);
        var resultDate = text.match(/(\d{2}[\/]\w{3}[\/]\d{4})/gim);

        for (var i = 0; i < resultIP.length; i++) {
            resultText.innerHTML += resultDate[i] + " - " + resultIP[i] + "<br>";
        }

    });

})();
