// повезло, нашел способ передавать функцию, созданную с помощью bind
// а миенно через свойство объекта. Созданная функция присваивается
// как атрибут объекта, а потом удаляется из слушатебя через контекст

"use strict";

const mytable = document.querySelector("table");

// mouseover / mouseout

mytable.addEventListener("endOfEditing", (e) => {
    mytable.addEventListener("click", callEdit);
});

mytable.addEventListener("endOfEditing", () =>
    console.log("Событие - не редатируем!")
);

function callEdit(e) {
    const cell = e.target;
    if (cell.closest("span")) {
        console.log("удалить слушатель кликов с таблицы", cell.parentNode);
        mytable.removeEventListener("click", callEdit);
        const pu = new Popup(cell);
        pu.create();
    }
}

mytable.dispatchEvent(new CustomEvent("endOfEditing"));

// IDE сама подсказывает сделать из функции класс, потому что внутри нее используется this
class Popup {
    constructor(cell) {
        this.cell = cell;
    }
    create() {
        this.popup = document.createElement("div");
        this.popup.className = "popup";
        this.popup.classList.add("active");

        const frm = document.createElement("form");
        frm.className = "popup_elements";

        this.popupInput = document.createElement("input");
        this.popupInput.type = "text";
        this.popupInput.value = this.cell.innerText;

        const ctrl = document.createElement("div");
        ctrl.className = "controls";
        const confirmButton = document.createElement("button");
        confirmButton.className = "commit";
        confirmButton.innerText = "V";
        const cancelButton = document.createElement("button");
        cancelButton.className = "cancel";
        cancelButton.innerText = "X";

        const box = this.cell.parentNode.getBoundingClientRect();
        this.popup.style.transform = `translate(${box.x}px, ${
            box.y + window.scrollY
        }px)`;

        ctrl.appendChild(confirmButton);
        ctrl.appendChild(cancelButton);
        frm.appendChild(this.popupInput);
        frm.appendChild(ctrl);
        this.popup.appendChild(frm);
        document.body.appendChild(this.popup);
        this.popupInput.focus();

        confirmButton.addEventListener("click", this.applyEdit.bind(this));
        cancelButton.addEventListener("click", this.closePopup.bind(this));

        this.popup.addEventListener("submit", (e) => e.preventDefault());
        this.keyboardListener = this.trackInsert.bind(this);
        document.addEventListener("keyup", this.keyboardListener);
    }

    trackInsert(e) {
        console.log("клавиши завершения редактирования. this:", this);
        const k = e.key;
        switch (k) {
            case "Escape":
                this.closePopup();
                break;
            case "Enter":
                this.applyEdit();
                break;
        }
    }

    applyEdit() {
        console.log("popup:", this.popup, "cell:", this.cell);

        this.cell.innerText = this.popupInput.value;
        this.closePopup();
    }

    closePopup() {
        console.log(
            "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
        );
        document.removeEventListener("keyup", this.keyboardListener);
        mytable.dispatchEvent(new CustomEvent("endOfEditing"));
        this.popup.remove();
    }
}
