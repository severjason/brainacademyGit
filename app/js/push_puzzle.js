"use strict";
(function () {

    document.addEventListener('DOMContentLoaded', function () {


        class PushPuzzle {
            /**
             *
             * @param container_id
             * @param puzzle_class
             * @param active_class
             * @param empty_class
             * @param you_won_class
             */
            constructor(container_id, puzzle_class, active_class, empty_class, you_won_class) {
                this.containerId = container_id;
                this.puzzleClass = puzzle_class;
                this.activeClass = active_class;
                this.emptyClass = empty_class;
                this.youWon = you_won_class;
                this.container = document.getElementById(this.containerId);
            }

            /**
             *
             * @param node1
             * @param node2
             */
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

            /**
             *
             * @param min
             * @param max
             * @returns {number}
             */
            static random(min, max) {
                return Math.floor(min + Math.random() * (max - min + 1));
            }

            /**
             *
             * @param node1
             * @param node2
             * @returns {boolean}
             */
            static isOnTheSameRow(node1, node2) {
                return node1.getBoundingClientRect().top === node2.getBoundingClientRect().top;
            }

            /**
             *
             * @param node1
             * @param node2
             * @returns {boolean}
             */
            static isOnTheSameColumn(node1, node2) {
                return node1.getBoundingClientRect().left === node2.getBoundingClientRect().left;
            }

            /**
             * Refresh puzzle game
             */
            refresh() {
                for (var i = 0; i < this.getPuzzleArray().length; i++) {
                    this.container.insertBefore(this.getPuzzleArray()[i], this.getPuzzleArray()[PushPuzzle.random(0, this.getPuzzleArray().length - 1)])
                }
            }

            /**
             *
             * @param node
             */
            activateNode(node) {
                if (document.body.contains(node)) {
                    node.classList.add(this.activeClass);
                }
            }

            /**
             *
             * @param node
             * @returns {boolean}
             */
            nodeIsEmpty(node) {
                return !!node.classList.contains(this.emptyClass);
            }

            /**
             *
             * @param node
             * @returns {boolean}
             */
            nodeIsPuzzle(node) {
                return !!node.classList.contains(this.puzzleClass);
            }

            /**
             * Check if main container exists
             * @returns {boolean}
             */
            isExists() {
                return !!document.getElementById(this.containerId);
            }

            /**
             * Get empty node
             * @returns {Element}
             */
            getEmptyNode() {
                return document.querySelector(`div.${this.puzzleClass}.${this.emptyClass}`);
            }

            /**
             * Get active node
             * @returns {Element}
             */
            getActiveNode() {
                return document.querySelector(`div.${this.puzzleClass}.${this.activeClass}`);
            }

            /**
             *
             * @returns {NodeList}
             */
            getPuzzleArray() {
                return document.querySelectorAll(`#${this.containerId} div.${this.puzzleClass}`);
            }

            /**
             *
             * @param node
             * @returns {number}
             */
            getIndex(node) {
                for (let i = 0; i < this.getPuzzleArray().length; i++) {
                    if (node === this.getPuzzleArray()[i]) {
                        return i;
                    }
                }
            }

            /**
             * Deactivate all
             */
            deactivateAll() {
                for (let i = 0; i < this.getPuzzleArray().length; i++) {
                    this.getPuzzleArray()[i].classList.remove(this.activeClass);
                }
            }

            /**
             * Move puzzle to the right
             */
            moveRight() {
                let rightNode = this.getPuzzleArray()[this.getIndex(this.getEmptyNode()) + 1];
                if ((this.getIndex(this.getEmptyNode()) < this.getPuzzleArray().length - 1) &&
                    (PushPuzzle.isOnTheSameRow(this.getEmptyNode(), rightNode))) {
                    PushPuzzle.swapElements(this.getEmptyNode(), rightNode);
                }
            }

            /**
             * Move puzzle to the left
             */
            moveLeft() {
                let leftNode = this.getPuzzleArray()[this.getIndex(this.getEmptyNode()) - 1];
                if ((this.getIndex(this.getEmptyNode()) > 0) &&
                    (PushPuzzle.isOnTheSameRow(this.getEmptyNode(), leftNode))) {
                    PushPuzzle.swapElements(this.getEmptyNode(), leftNode);
                }
            }

            /**
             * Move puzzle to the top
             */
            moveTop() {
                let topNode = this.getPuzzleArray()[this.getIndex(this.getEmptyNode()) + 4];
                if ((this.getIndex(this.getEmptyNode()) < this.getPuzzleArray().length - 4) &&
                    (PushPuzzle.isOnTheSameColumn(this.getEmptyNode(), topNode))) {
                    PushPuzzle.swapElements(this.getEmptyNode(), topNode);
                }
            }

            /**
             * Move puzzle down
             */
            moveDown() {
                let downNode = this.getPuzzleArray()[this.getIndex(this.getEmptyNode()) - 4];
                if ((this.getIndex(this.getEmptyNode()) > 3) &&
                    (PushPuzzle.isOnTheSameColumn(this.getEmptyNode(), downNode))) {
                    PushPuzzle.swapElements(this.getEmptyNode(), downNode);
                }
            }

            /**
             * hide youWon container
             */
            hideYouWon() {
                document.getElementById(this.youWon).style.display = "none";
            }

            /**
             * Show youWon container
             */
            showYouWon() {
                let youWon = document.getElementById(this.youWon);
                youWon.innerHTML = "You won!";
                youWon.style.width = this.container.getBoundingClientRect().width + "px";
                youWon.style.height = this.container.getBoundingClientRect().height + "px";
                youWon.style.lineHeight = this.container.getBoundingClientRect().height + "px";
                youWon.style.display = "block";
            }

            checkIfYouWon() {
                var wonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
                var counter = 0;
                for (let i = 0; i < wonArray.length; i++) {
                    let puzzle = +this.getPuzzleArray()[i].innerHTML;
                    if (puzzle === wonArray[i]) {
                        counter++;
                    }
                }
                if (counter === wonArray.length) {

                    this.showYouWon();
                }
            }

        }

        var puzzle = new PushPuzzle("pushpuzzle_table", "puzzle", "active", "empty", "you_won");
        puzzle.refresh();

        document.querySelector("body").addEventListener("click", function (event) {

            if (event.target.id === "refresh_button") {
                puzzle.hideYouWon();
                puzzle.refresh();
            }

            if (puzzle.isExists()) {

                if (puzzle.nodeIsPuzzle(event.target) && !puzzle.nodeIsEmpty(event.target)) {

                    puzzle.deactivateAll();
                    puzzle.activateNode(event.target);

                }
                else if (puzzle.nodeIsEmpty(event.target)) {

                    if (puzzle.getActiveNode()) {

                        var activeElement = puzzle.getActiveNode();

                        if ((PushPuzzle.isOnTheSameRow(event.target, activeElement) ||
                            PushPuzzle.isOnTheSameColumn(event.target, activeElement)) &&
                            (puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) + 1) ||
                            puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) - 1) ||
                            puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) + 4) ||
                            puzzle.getIndex(event.target) === (puzzle.getIndex(activeElement) - 4))) {
                            PushPuzzle.swapElements(activeElement, event.target);
                            puzzle.checkIfYouWon();
                        }
                    }
                }
                else {
                    puzzle.deactivateAll();
                }
            }
        });

        document.querySelector("body").addEventListener("keydown", function (event) {

            if (event.keyCode === 37) {
                puzzle.deactivateAll();
                puzzle.moveRight();
                puzzle.checkIfYouWon();
            }
            if (event.keyCode === 38) {
                puzzle.deactivateAll();
                puzzle.moveTop();
                puzzle.checkIfYouWon();
            }
            if (event.keyCode === 39) {
                puzzle.deactivateAll();
                puzzle.moveLeft();
                puzzle.checkIfYouWon();
            }
            if (event.keyCode === 40) {
                puzzle.deactivateAll();
                puzzle.moveDown();
                puzzle.checkIfYouWon();
            }
        });

    });
}());
