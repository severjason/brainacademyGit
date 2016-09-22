(function ($) {
    $(document).ready(function () {

        let mainObject = new function () {
            this.mainContent = $("div#main_content");
            this.nav = $("nav");
            this.navLink = $("ul.nav-tabs > li");
            this.quantityPerSide = 20;
            this.random = function (min, max) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                rand = Math.round(rand);
                return rand;
            };
            this.generateLabyrinth = function () {
                let lab = $("#labyrinth");
                let labWidth = lab.width();
                let innerDiv = "<div class='square'></div>";
                lab.empty();
                this.quantityPerSide = $("#labyrinth_level").find("option:selected").data("level");
                for (let i = 0; i < this.quantityPerSide * this.quantityPerSide; i++) {
                    lab.append(
                        $(innerDiv)
                            .css({
                                width:Math.floor(labWidth / this.quantityPerSide),
                                height:Math.floor(labWidth / this.quantityPerSide)
                            })
                            .addClass("br_" + this.random(1,4) % 4)
                    );
                }
            };
            this.ajaxLoad = function (page) {
                if(page != undefined) {
                    $.ajax({
                        url:"partials/" + page + ".html",
                        type: "GET",
                        dataType: "html",
                        beforeSend: function() {
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


        $(document).on("change", mainObject.level, function () {
            mainObject.generateLabyrinth();
        });

        $(document).on("click", "button#generate", function () {
            console.log("ok");
            mainObject.generateLabyrinth();
        });


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
    });

     
})(jQuery);
