"use strict";
(function () {
    document.addEventListener('DOMContentLoaded', function () {

        let labyrinth = new function () {
            let labArray = [];
            let mainContent = document.getElementById("main_content");
            //this.navLink = document.querySelectorAll("ul.nav-tabs > li");
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
                return (number >=0 && number <= 3) ? classes[number] : "empty ";
            };
            this.generate = function () {
                let labID = document.getElementById("labyrinth");
                let labWidth = labID.offsetWidth;
                labID.innerHTML = "";
                quantityPerSide = document.querySelector("#labyrinth_level option:checked").dataset.level;

                createLabArray();
                fixLabArray();
                for (let i = 0; i < quantityPerSide; i++) {

                    //let newTr = document.createElement("tr");

                    for (let j = 0; j < quantityPerSide; j++) {

                        let newDiv = document.createElement("div");

                        newDiv.className = "square ";
                        newDiv.className += labArray[i][j];
                        let CSS = {
                            "width": Math.floor(labWidth / quantityPerSide) + "px",
                            "height": Math.floor(labWidth / quantityPerSide) + "px"
                       /*     "marginTop": - (+newDiv.classList.contains("top") + newDiv.classList.contains("bottom")) + "px",
                            "marginRight": - (+newDiv.classList.contains("left") + newDiv.classList.contains("right")) + "px",
                            "marginBottom":  - (+newDiv.classList.contains("top") + newDiv.classList.contains("bottom")) + "px",
                            "marginLeft": - (+newDiv.classList.contains("left") + newDiv.classList.contains("right")) + "px"*/
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

                if (page !== undefined) {

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
                        row.push(newElement);
                        /*if (i === 0) {

                            if (j === 0) {
                                row.push(labyrinth.getClass(0) + labyrinth.getClass(2));
                            }
                            else if (j === quantityPerSide - 1) {
                                row.push(labyrinth.getClass(0) + labyrinth.getClass(3));
                            }
                            else {
                                /!* if (newElement !== labyrinth.getClass(0)) {
                                 topLineSwitcher++;
                                 }
                                 console.log(topLineSwitcher);
                                 if (topLineSwitcher <= 2) {
                                 row.push(labyrinth.getClass(labyrinth.random(1, 3)));
                                 }
                                 else {
                                 row.push(labyrinth.getClass(0));
                                 }*!/
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
*/
                    }
                    labArray.push(row);
                    row = [];
                }
            };

            let fixLabArray = function () {

                for (let i = 0; i < quantityPerSide; i++) {

                    for (let j = 0; j < quantityPerSide; j++) {
                        //console.log(labArray[i-1][j] === labyrinth.getClass(1));
                        if (i > 0 && labArray[i-1][j] === labyrinth.getClass(1) && labArray[i][j] === labyrinth.getClass(0)) {
                            labArray[i-1][j] = labyrinth.getClass(labyrinth.random(2, 3));
                        }
                    }
                }

                for (let i = 0; i < quantityPerSide; i++) {

                    for (let j = 0; j < quantityPerSide; j++) {

                        if (j > 0 && labArray[i][j-1] === labyrinth.getClass(3) && labArray[i][j] === labyrinth.getClass(2)) {
                            labArray[i][j-1] = labyrinth.getClass(100);
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

        let tabsArray = document.querySelectorAll("ul.nav-tabs li");

        for (let i = 0, tabsLength = tabsArray.length; i < tabsLength; i++) {
            tabsArray[i].addEventListener("click", function () {

                let navLiArray = document.querySelectorAll("nav li");

                for(let i = 0, navLiArrayLength = navLiArray.length; i < navLiArrayLength; i++){
                    navLiArray[i].classList.remove("active");
                }

                /*document.querySelectorAll("nav li").forEach(function (li) {
                    li.classList.remove("active")
                });*/

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
        }


        /*document.querySelectorAll("ul.nav-tabs li").forEach(function (li) {

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
        });*/
        
    });



})();
