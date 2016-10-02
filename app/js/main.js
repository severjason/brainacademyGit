"use strict";
(function () {
    document.addEventListener('DOMContentLoaded', function () {

        let labyrinth = new function () {
            let labArray = [];
            let mainContent = document.getElementById("main_content");
            //this.navLink = document.querySelectorAll("ul.nav-tabs > li");
            let quantityPerSide = 20;
            this.random = function (min, max, exclude = false) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                rand = Math.round(Math.abs(rand));
                while (exclude === rand) {
                    rand = min - 0.5 + Math.random() * (max - min + 1);
                    rand = Math.round(Math.abs(rand));
                }
                return rand;
            };
            this.getClass = function (number) {
                switch (number) {
                    case 0:
                        return "top ";
                        break;
                    case 1:
                        return "bottom ";
                        break;
                    case 2:
                        return "left ";
                        break;
                    case 3:
                        return "right ";
                        break;
                    default:
                        return "empty ";
                        break;
                }
            };
            this.generate = function () {
                let labID = document.getElementById("labyrinth");
                let labWidth = labID.offsetWidth;
                labID.innerHTML = "";
                quantityPerSide = document.querySelector("#labyrinth_level option:checked").dataset.level;

                createLabArray();

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
            this.ajaxLoad = function (page) {

                if (page != undefined) {

                    mainContent.innerHTML = "";

                    var request = new XMLHttpRequest();

                    request.open("GET", "partials/" + page + ".html", true);

                    request.onprogress = function () {
                        mainContent.innerHTML = "<span class='ajaxInfo'>Loading...</span>";
                    };

                    request.onload = function (e) {

                        if (request.readyState === 4) {

                            // Check if the get was successful.
                            if (request.status === 200) {
                                mainContent.innerHTML = request.responseText;
                            } else {
                                mainContent.innerHTML = "<span class='ajaxInfo'>DATA LOADING ERROR!</span>";
                                console.error(request.statusText);
                            }
                        }
                    };

                    request.send(null);
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

                        if (i === 0) {

                            if (j === 0) {
                                row.push(labyrinth.getClass(0) + labyrinth.getClass(2));
                            }
                            else if (j === quantityPerSide - 1) {
                                row.push(labyrinth.getClass(0) + labyrinth.getClass(3));
                            }
                            else {
                                /* if (newElement !== labyrinth.getClass(0)) {
                                 topLineSwitcher++;
                                 }
                                 console.log(topLineSwitcher);
                                 if (topLineSwitcher <= 2) {
                                 row.push(labyrinth.getClass(labyrinth.random(1, 3)));
                                 }
                                 else {
                                 row.push(labyrinth.getClass(0));
                                 }*/
                                row.push(labyrinth.getClass(labyrinth.random(1, 3)));
                            }
                        }
                        else if (j === 0) {
                            if (i === quantityPerSide - 1) {
                                row.push(labyrinth.getClass(1) + labyrinth.getClass(2));
                            }
                            else {
                                row.push(labyrinth.getClass(2) + labyrinth.getClass(labyrinth.random(0, 3, 2)));
                            }
                        }
                        else if (j === quantityPerSide - 1) {
                            if (i === quantityPerSide - 1) {
                                row.push(labyrinth.getClass(1) + labyrinth.getClass(3));
                            }
                            else {
                                row.push(labyrinth.getClass(3) + labyrinth.getClass(labyrinth.random(0, 2)));
                            }
                        }
                        else {
                            row.push(newElement);
                        }

                    }
                    labArray.push(row);
                    row = [];
                }
            };
        };


        document.querySelector("#labyrinth_level").addEventListener("change", function () {
            labyrinth.generate();
        });

        document.querySelector("button#generate").addEventListener("click", function () {
            labyrinth.generate();
        });

        document.querySelectorAll("ul.nav-tabs li").forEach(function (li) {

            li.addEventListener("click", function () {
                document.querySelectorAll("nav li").forEach(function (li) {
                    li.classList.remove("active")
                });

                this.classList.add("active");

                let page = this.dataset.page;

                let defDiv = document.getElementById("default");

                if (page != undefined) {
                    defDiv.style.display = "none";
                    labyrinth.ajaxLoad(page);
                }
                else {
                    document.getElementById("main_content").innerHTML = "";
                    defDiv.style.display = "block";
                }

            })
        });
        
    });


})();
