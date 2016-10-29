(function () {

    document.addEventListener('DOMContentLoaded', function () {

        var Input = function () {

            var inputId = document.getElementById("number_input");

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

        var Lock = function () {

            let lockId = document.getElementById("lock_container");
            let upperLock = document.getElementById("upper_lock");
            //let successID = document.getElementById("success");

            return {
                shake:function () {
                    lockId.classList.add("animated");

                    setTimeout(function () {
                        lockId.classList.toggle("animated");
                    }, 200);
                },
                open:function () {
                    upperLock.classList.add("open");
                    //successID.classList.toggle("show");
                    return this;
                },
                isOpen:function () {
                    return upperLock.classList.contains("open");
                },
                close:function () {
                    upperLock.classList.toggle("open");
                },
                hide:function () {
                    lockId.classList.add("hidden-lock");

                    setTimeout(function () {
                        lockId.classList.add("hidden");
                    },1000);
                }
            }
        };

        var input = new Input();
        var lock = new Lock();


        var checkPIN = function () {

            if (input.PINisValid()) {
                lock.open().hide();
                //lock.hide();
            }
            else {
                if(!lock.isOpen()) {

                    input.clear();
                    lock.shake();

                    let keyArray = document.querySelectorAll(".number_key");
                    let keyArrayLength = keyArray.length;
                    let numbersDiv = document.getElementById("lock_numbers");

                    for (let i = 0; i < keyArrayLength; i++) {
                        numbersDiv.insertBefore(keyArray[i], keyArray[input.random(0, keyArrayLength - 1)])
                    }
                    let clearKey = document.getElementById("clear_input");
                    numbersDiv.insertBefore(clearKey, document.querySelectorAll(".number_key")[keyArrayLength - 1]);
                }
            }
        };





        document.querySelector("body").addEventListener("click", function (event) {

            var target = event.target;

            if (target.classList.contains("number_key")) {
                let value = parseInt(target.innerHTML, 10);
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