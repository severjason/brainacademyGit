(function ($) {
    $(document).ready(function () {

        let mainObject = new function () {
            this.labArray = [];
            this.mainContent = $("#main_content");
            this.nav = $("nav");
            this.navLink = document.querySelectorAll("ul.nav-tabs > li");
            this.quantityPerSide = 20;
            this.random = function (min, max) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                rand = Math.round(Math.abs(rand));
                return rand;
            };
            this.getCLass = function (number) {
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
            this.generateLabyrinth = function () {
                let lab = document.getElementById("labyrinth");
                let labWidth = lab.offsetWidth;
                lab.innerHTML = " ";
                this.quantityPerSide = $("#labyrinth_level").find("option:selected").data("level");

                createArray();
                for (let i = 0; i < this.quantityPerSide; i++) {
                    for (let j = 0; j < this.quantityPerSide; j++) {
                        lab.innerHTML+= "<div class='square'></div>";
                        let innerDiv = document.querySelector("div.square");
                        innerDiv.style.width = Math.floor(labWidth / this.quantityPerSide) + "px";
                        //innerDiv.style["height"] = Math.floor(labWidth / this.quantityPerSide);


                        /*lab.append(
                            $(innerDiv)
                                .css({
                                    width: Math.floor(labWidth / this.quantityPerSide),
                                    height: Math.floor(labWidth / this.quantityPerSide)
                                })
                                .addClass(this.labArray[i][j])
                        );*/
                    }
                }
/*                for (let i = 0; i < this.quantityPerSide * this.quantityPerSide; i++) {
                    lab.append(
                        $(innerDiv)
                            .css({
                                width: Math.floor(labWidth / this.quantityPerSide),
                                height: Math.floor(labWidth / this.quantityPerSide)
                            })
                            .addClass("br_" + this.random(1, 4) % 4)
                    );
                }*/
            };
            this.ajaxLoad = function (page) {
                if (page != undefined) {
                    $.ajax({
                        url: "partials/" + page + ".html",
                        type: "GET",
                        dataType: "html",
                        beforeSend: function () {
                            mainObject.mainContent.empty();
                        },
                        error: function () {
                            mainObject.mainContent.html('<span class="">DATA LOADING ERROR!</span>');
                        },
                        success: function (response) {
                            mainObject.mainContent.html(response);
                        }
                    });
                }
            }
        };


        let createArray = function () {
            mainObject.labArray = [];
            for (let i = 0; i < mainObject.quantityPerSide; i++) {

                let row = [];

                /*
                 top - 0
                 bottom - 1
                 left - 2
                 right - 3
                 */
                let topLineSwitcher = 0;
                for (let j = 0; j < mainObject.quantityPerSide; j++) {

                    if (i === 0) {
                        let newElement = mainObject.getCLass(mainObject.random(0, 3));

                        if (j === 0 ) {
                            row.push(mainObject.getCLass(0) + mainObject.getCLass(2));
                        }
                        else if (j === mainObject.quantityPerSide - 1) {
                            row.push(mainObject.getCLass(0) + mainObject.getCLass(3));
                        }
                        else {
                            /* if (newElement !== mainObject.getCLass(0)) {
                             topLineSwitcher++;
                             }
                             console.log(topLineSwitcher);
                             if (topLineSwitcher <= 2) {
                             row.push(mainObject.getCLass(mainObject.random(1, 3)));
                             }
                             else {
                             row.push(mainObject.getCLass(0));
                             }*/
                            row.push(mainObject.getCLass(mainObject.random(1, 3)));
                        }
                    }
                    else if (i === mainObject.quantityPerSide - 1 && j === 0) {
                        row.push(mainObject.getCLass(1) + mainObject.getCLass(2));
                    }
                    else if (i === mainObject.quantityPerSide - 1 && j === mainObject.quantityPerSide - 1) {
                        row.push(mainObject.getCLass(1) + mainObject.getCLass(3));
                    }
                    else {
                        row.push(mainObject.getCLass(mainObject.random(0, 3)));
                    }

                }
                mainObject.labArray.push(row);
                row = [];
            }
        };




        //console.table(mainObject.labArray);

        $(document).on("change", mainObject.level, function () {
            mainObject.generateLabyrinth();
        });

        $(document).on("click", "button#generate", function () {
            mainObject.generateLabyrinth();
        });

        $(document).on("click", "ul.nav-tabs > li", function () {
            mainObject.nav.find("li").removeClass("active");
            $(this).addClass("active");
            let page = $(this).data("page");
            let defDiv = $("#default");
            if (page != undefined) {
                defDiv.hide();
                mainObject.ajaxLoad(page);
            }
            else {
                mainObject.mainContent.empty();
                defDiv.show();
            }
        });


/*
        mainObject.navLink.on("click", function () {
            mainObject.nav.find("li").removeClass("active");
            $(this).addClass("active");
            let page = $(this).data("page");
            let defDiv = $("#default");
            if (page != undefined) {
                defDiv.hide();
                mainObject.ajaxLoad(page);
            }
            else {
                mainObject.mainContent.empty();
                defDiv.show();
            }
        });
*/




    });


})(jQuery);
