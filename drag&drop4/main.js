// сделано по уроку
// https://www.youtube.com/watch?v=wv7pvH1O5Ho&t=500s

const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");
const richestPeople = [
    "Исмаил Альтшулер",
    "Вячеслав Ванесян",
    "Закир Вятчин",
    "Сергей Кузьминых",
    "Анатолий Ларин",
    "Марат Майоров",
    "Артем Маслюков",
    "Антон Сергеев",
    "Адам Хруцкий",
    "Юрий Цветков",
];

const listItems = [];

let dragStartIndex;
createList();

function createList() {
    richestPeople
        .map((a) => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement("li");
            listItem.setAttribute("data-index", index);
            listItem.innerHTML = `<span class="number"> ${index + 1} </span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person} </p>
        </div>
        `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function dragOver(e) {
    e.preventDefault();
}

function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
    this.classList.add("over");
}

function dragLeave() {
    this.classList.remove("over");
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll(".draggable-list li");

    draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", dragStart);
    });
    dragListItems.forEach((item) => {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);
    });
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem
            .querySelector(".draggable")
            .innerText.trim();
        if (personName !== richestPeople[index]) {
            listItem.classList.add("wrong");
        } else {
            listItem.classList.remove("wrong");
            listItem.classList.add("right");
        }
    });
}

check.addEventListener("click", checkOrder);
