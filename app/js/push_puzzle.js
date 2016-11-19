"use strict";
(function () {

    document.addEventListener('DOMContentLoaded', function () {

        class PushPuzzle {

            constructor(container_id, puzzle_class, active_class, empty_class) {
                this.containerId = container_id;
                this.puzzleClass = puzzle_class;
                this.activeClass = active_class;
                this.emptyClass = empty_class;
            }

            static swapElements(node1, node2) {

                if (document.body.contains(node1) && document.body.contains(node2)) {

                    var node1Clone = node1.cloneNode(true);
                    var node2Clone = node2.cloneNode(true);

                    node1.parentNode.insertBefore(node2Clone, node1);
                    node2.parentNode.insertBefore(node1Clone, node2);

                    node1.parentNode.removeChild(node1);
                    node2.parentNode.removeChild(node2);
                }
                else throw Error("Can`t swap nodes - some of them doesn`t exist!");

            }

            static random(min, max) {
                return Math.floor(min + Math.random() * (max - min + 1));
            }

            activateNode(node) {
                if (document.body.contains(node)) {
                    node.classList.add(this.activeClass);
                }
            }

            nodeIsEmpty(node) {
                return !!node.classList.contains(this.emptyClass);
            }

            nodeIsPuzzle(node) {
                return !!node.classList.contains(this.puzzleClass);
            }

            isExists() {
                return !!document.getElementById(this.containerId);
            }

            getActiveNode() {
                return document.querySelector(`div.${this.puzzleClass}.${this.activeClass}`);
            }

            getPuzzleArray() {
                return document.querySelectorAll(`#${this.containerId} div.${this.puzzleClass}`);
            }

            getIndex(node) {
                for (let i = 0; i < this.getPuzzleArray().length; i++) {
                    if (node === this.getPuzzleArray()[i]) {
                        return i;
                    }
                }
            }

            deactivateAll() {
                for (let i = 0; i < this.getPuzzleArray().length; i++) {
                    this.getPuzzleArray()[i].classList.remove(this.activeClass);
                }
            }
        }

        var puzzle = new PushPuzzle("pushpuzzle_table", "puzzle", "active", "empty");

        document.querySelector("body").addEventListener("click", function (event) {
            if (event.target.id === "refresh_button") {
                var keyArray = document.querySelectorAll("#pushpuzzle_table div.puzzle");
                var numbersDiv = document.getElementById("pushpuzzle_table");

                for (var i = 0; i < keyArray.length; i++) {
                    numbersDiv.insertBefore(keyArray[i], keyArray[PushPuzzle.random(0, keyArray.length - 1)])
                }
            }

            if (puzzle.isExists()) {

                if (puzzle.nodeIsPuzzle(event.target) && !puzzle.nodeIsEmpty(event.target)) {

                    puzzle.deactivateAll();
                    puzzle.activateNode(event.target);

                }
                else if (puzzle.nodeIsEmpty(event.target)) {

                    if (puzzle.getActiveNode()) {

                        var activeElement = puzzle.getActiveNode();

                        if ((event.target.getBoundingClientRect().top === activeElement.getBoundingClientRect().top ||
                            event.target.getBoundingClientRect().left === activeElement.getBoundingClientRect().left) &&
                            (puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) + 1) ||
                            puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) - 1) ||
                            puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) + 4) ||
                            puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) - 4))) {
                            PushPuzzle.swapElements(activeElement, event.target);
                        }

                    }
                }
                else {
                    puzzle.deactivateAll();
                }


            }
        });


    });
}());
