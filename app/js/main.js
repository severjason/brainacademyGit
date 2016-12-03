"use strict";
(function () {
    document.addEventListener('DOMContentLoaded', function () {

        class Main {

            /**
             *
             * @param {string} mainContentId
             * @param {string} partialsRoot
             */
            constructor(mainContentId, partialsRoot) {
                this.mainContentId = mainContentId;
                this.partialsRoot = partialsRoot;
                this.mainContent = document.getElementById(this.mainContentId);
            }

            /**
             * Ajax page load
             * @param {string} page
             */
            loadPage(page) {

                let that = this;
                let pageLoaded = new Event("pageLoaded");

                if (page !== undefined) {

                    this.mainContent.innerHTML = "";

                    var xhr = new XMLHttpRequest();

                    xhr.open("GET", `${this.partialsRoot}${page}.html`, true);

                    xhr.onprogress = function () {
                        that.mainContent.innerHTML = "<span class='ajaxInfo'>Loading...</span>";
                    };

                    xhr.onload = function (e) {

                        if (xhr.status === 200) {
                            that.mainContent.innerHTML = xhr.responseText;
                            document.dispatchEvent(pageLoaded);
                        } else {
                            that.mainContent.innerHTML = "<span class='ajaxInfo'>DATA LOADING ERROR!</span>";
                            console.error(xhr.statusText);
                        }
                    };

                    xhr.send(null);
                }
            }

            /**
             * Add event listeners to tabs
             */
            activateTabs() {

                let that = this;
                
                let tabsArray = document.querySelectorAll("ul.nav-tabs li");

                for (let i = 0, tabsLength = tabsArray.length; i < tabsLength; i++) {

                    tabsArray[i].addEventListener("click", function () {

                        let navLiArray = document.querySelectorAll("nav li");

                        for (let i = 0, navLiArrayLength = navLiArray.length; i < navLiArrayLength; i++) {
                            navLiArray[i].classList.remove("active");
                        }

                        this.classList.add("active");

                        let page = this.dataset.page;

                        let defDiv = document.getElementById("default");

                        if (page != undefined) {
                            defDiv.style.display = "none";
                            that.loadPage(page);
                        }
                        else {
                            document.getElementById("main_content").innerHTML = "";
                            defDiv.style.display = "block";
                        }
                    })
                }
            }
        }
        let main = new Main("main_content", "partials/");
        main.activateTabs();
    });
})();
