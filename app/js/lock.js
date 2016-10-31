(function () {

    document.addEventListener('DOMContentLoaded', function () {

        var Input = function (inputid) {

            var inputId = document.getElementById(inputid);

            const PIN = "512";

            return {
                insert: function (newValue) {
                    if (inputId.value.length < PIN.length) {
                        inputId.value += "" + newValue;
                    }
                },
                clear: function () {
                    inputId.value = "";
                },
                del: function () {
                    inputId.value = inputId.value.slice(0, -1);
                },
                /**
                 * @return {boolean}
                 */
                PINisValid: function () {
                    return inputId.value === PIN;
                },
                random: function (min, max) {
                    return Math.floor(min + Math.random() * (max - min + 1));
                }
            }
        };

        var Lock = function (lockid, upperlockid) {

            var lockId = document.getElementById(lockid);
            var upperLock = document.getElementById(upperlockid);

            return {
                shake: function () {
                    lockId.classList.add("animated");

                    setTimeout(function () {
                        lockId.classList.toggle("animated");
                    }, 200);
                },
                open: function () {
                    upperLock.classList.add("open");
                },
                isOpen: function () {
                    return upperLock.classList.contains("open");
                },
                close: function () {
                    upperLock.classList.toggle("open");
                },
                hide: function () {
                    lockId.classList.add("hidden-lock");

                    setTimeout(function () {
                        lockId.classList.add("hidden");
                    }, 1000);
                }
            }
        };

        var input = new Input("number_input");
        var lock = new Lock("lock_container", "upper_lock");


        var checkPIN = function () {

            if (input.PINisValid()) {
                lock.open();
                lock.hide();
            }
            else {
                if (!lock.isOpen()) {
                    input.clear();
                    lock.shake();

                    var keyArray = document.querySelectorAll(".number_key");
                    var keyArrayLength = keyArray.length;
                    var numbersDiv = document.getElementById("lock_numbers");

                    for (var i = 0; i < keyArrayLength; i++) {
                        numbersDiv.insertBefore(keyArray[i], keyArray[input.random(0, keyArrayLength - 1)])
                    }
                    var clearKey = document.getElementById("clear_input");
                    numbersDiv.insertBefore(clearKey, document.querySelectorAll(".number_key")[keyArrayLength - 1]);
                }
            }
        };


        document.querySelector("body").addEventListener("click", function (event) {

            var target = event.target;

            if (target.classList.contains("number_key")) {
                var value = parseInt(target.innerHTML, 10);
                input.insert(value);
            }

            if (target.id === "clear_input") {
                input.clear();
            }

            if (target.id === "delete_number") {
                input.del();
            }

            if (target.id === "enter_button") {
                checkPIN();
            }

        });
        document.querySelector("body").addEventListener("keydown", function (event) {

            if (event.keyCode === 8) {
                input.del();
            }

            if (event.keyCode === 46) {
                input.clear();
            }

            if (event.keyCode === 13) {
                checkPIN();
            }
        });

    });


}());