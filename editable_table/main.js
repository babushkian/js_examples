"use strict";

const anus = document.querySelector("table");

document.querySelector("table").onclick = function (event) {
    //console.log(event.target);
    if (event.target.tagName !== "TD") return false;
    makeinput(event);
};

function makeinput(event) {
    const t = event.target;
    console.log(event.target.innerText);
    const inp = document.createElement("input");
    inp.type = "text";
    inp.value = t.innerText;
    inp.className = "cell-input";
    console.log(t.children[0]);
    t.innerText = "";
    t.appendChild(inp);
    inp.focus();
    t.classList.add("selected");
    inp.addEventListener("blur", () => {
        t.innerHTML = inp.value;
        t.classList.remove("selected");
    });
}
