// сделано о уроку:
// https://www.youtube.com/watch?v=-9qu_Z0D84g&t=1112s
"use strict";
const dragAndDrop = () => {
    const card = document.querySelector(".js-card");
    const cells = document.querySelectorAll(".js-cell");
    console.log(cells);

    const dragStart = function () {
        setTimeout(() => {
            this.classList.add("hide");
        }, 0);
    };
    const dragEnd = function () {
        setTimeout(() => {
            this.classList.remove("hide");
        }, 0);
    };

    const dragOver = function (evt) {
        evt.preventDefault();
    };
    const dragEnter = function () {
        evt.preventDefault();
        this.classList.add("hovered");
    };
    const dragLeave = function () {
        this.classList.remove("hovered");
    };
    const dragDrop = function () {
        this.append(card);
        this.classList.remove("hovered");
    };

    cells.forEach((cell) => {
        cell.addEventListener("dragover", dragOver);
        cell.addEventListener("dragover", dragEnter);
        cell.addEventListener("dragleave", dragLeave);
        cell.addEventListener("drop", dragDrop);
    });

    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
};

dragAndDrop();
