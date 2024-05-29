import UserId from "./UserField.js";
import MeterList from "./MeterList.js";

export class NewRecord {
    constructor(parentNode, listNode) {
        this.uidObj = new UserId(parentNode);
        this.parentNode = parentNode;
        this.createForm();
        this.list = new MeterList(this, listNode);
        this.addUsrButton();
    }

    createForm() {
        this.record = document.createElement("div");
        this.record.className = "row";
        this.record.classList.add("input");
        this.inputString = document.createElement("input");
        this.inputString.type = "text";
        this.inputString.className = "input_meter";
        this.inputString.placeholder = "Ведите название счетчика";
        this.inputString.id = "add_new_meter";
        this.inputString.name = "add_new_meter";
        const controls = document.createElement("div");
        controls.className = "controls";
        this.addButton = document.createElement("button");
        this.addButton.className = "add";
        this.addButton.innerText = "добавить";
        controls.appendChild(this.addButton);
        this.record.appendChild(this.inputString);
        this.record.appendChild(controls);
        this.parentNode.appendChild(this.record);
        this.addListeners();
    }

    get usrId() {
        return this.uidObj.usrId;
    }

    addUsrButton() {
        this.uidObj.loadButton.addEventListener("click", () => {
            this.loadDataByUser();
        });
        this.uidObj.record.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                this.loadDataByUser();
            }
        });
    }

    loadDataByUser() {
        this.uidObj.getUserId();
        this.list.draw();
    }

    addListeners() {
        const anr = this.addNewRecord.bind(this);
        this.addButton.addEventListener("click", anr);

        this.record.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                anr();
            }
        });
    }

    async addNewRecord() {
        const meterName = this.inputString.value;
        if (meterName === "") {
            this.redBlink();
            return;
        }
        for (let i = 0; i < this.list.data.length; i++) {
            if (meterName === this.list.data[i].name) {
                alert("Поля с повторяющимися названиями недопустимы!");
                return;
            }
        }

        await fetch("http://127.0.0.1:5000/api/add_rec/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: this.usrId,
                name: meterName,
            }),
        });
        this.inputString.value = "";
        this.list.draw();
    }

    redBlink() {
        this.inputString.classList.add("blanc-error");

        const inter = setInterval(
            () => this.inputString.classList.toggle("blanc-error"),
            60
        );
        setTimeout(() => clearInterval(inter), 180);
    }
}
