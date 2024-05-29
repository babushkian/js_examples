console.log("OK");

let lists = document.querySelectorAll(".list");
const leftBox = document.getElementById("left");
const rightBox = document.getElementById("right");
let selected;
rightBox.addEventListener("dragover", (e) => e.preventDefault());
leftBox.addEventListener("dragover", (e) => e.preventDefault());
lists.forEach((l) =>
    l.addEventListener("dragstart", (e) => {
        selected = e.target;
    })
);

rightBox.addEventListener("drop", dropNote);
leftBox.addEventListener("drop", dropNote);

function dropNote(event, a) {
    console.log(selected);
    console.log(a);
    this.appendChild(selected);
    selected = null;
}
