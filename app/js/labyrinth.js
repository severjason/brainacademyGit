"use strict";
(function () {
    document.addEventListener('DOMContentLoaded', function () {

        let labyrinth = new function () {
            let labArray = [];
            let quantityPerSide = 20;
            this.random = function (min, max, exclude = false) {
                let rand = Math.floor(min + Math.random() * (max - min + 1));
                while (exclude === rand) {
                    rand = Math.floor(min + Math.random() * (max - min + 1));
                }

                return rand;
            };
            this.getClass = function (number) {
                let classes = ["top ", "bottom ", "left ", "right "];
                return (number >= 0 && number <= 3) ? classes[number] : "empty ";
            };
            this.generate = function () {
                let labID = document.getElementById("labyrinth");
                let labWidth = labID.offsetWidth;
                labID.innerHTML = "";
                quantityPerSide = document.querySelector("#labyrinth_level option:checked").dataset.level;

                createLabArray();
                fixLabArray();
                for (let i = 0; i < quantityPerSide; i++) {

                    for (let j = 0; j < quantityPerSide; j++) {

                        let newDiv = document.createElement("div");

                        newDiv.className = "square ";
                        newDiv.className += labArray[i][j];
                        let CSS = {
                            "width": Math.floor(labWidth / quantityPerSide) + "px",
                            "height": Math.floor(labWidth / quantityPerSide) + "px"
                        };
                        for (let attribute in CSS) {

                            if (CSS.hasOwnProperty(attribute)) {
                                newDiv.style[attribute] = CSS[attribute];
                            }
                        }
                        labID.appendChild(newDiv);
                    }
                }
            };
            let createLabArray = function () {
                labArray = [];
                for (let i = 0; i < quantityPerSide; i++) {

                    let row = [];
                    /*
                     top - 0
                     bottom - 1
                     left - 2
                     right - 3
                     */
                    let topLineSwitcher = 0;
                    for (let j = 0; j < quantityPerSide; j++) {
                        let newElement = labyrinth.getClass(labyrinth.random(0, 3));
                        row.push(newElement);
                    }
                    labArray.push(row);
                    row = [];
                }
            };

            let fixLabArray = function () {

                for (let i = 0; i < quantityPerSide; i++) {

                    for (let j = 0; j < quantityPerSide; j++) {
                        if (i > 0 && labArray[i - 1][j] === labyrinth.getClass(1) && labArray[i][j] === labyrinth.getClass(0)) {
                            labArray[i - 1][j] = labyrinth.getClass(labyrinth.random(2, 3));
                        }
                    }
                }

                for (let i = 0; i < quantityPerSide; i++) {

                    for (let j = 0; j < quantityPerSide; j++) {

                        if (j > 0 && labArray[i][j - 1] === labyrinth.getClass(3) && labArray[i][j] === labyrinth.getClass(2)) {
                            labArray[i][j - 1] = labyrinth.getClass(100);
                        }
                    }
                }
            }
        };

        document.querySelector("body").addEventListener("click", function (event) {

            if (event.target.id === "generate") {
                labyrinth.generate();
            }
        });


        document.querySelector("body").addEventListener("change", function (event) {

            if (event.target.id === "labyrinth_level") {
                labyrinth.generate();
            }

        });
        
    });
})();
