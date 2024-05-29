export default class UserId {
    constructor(parentNode) {
        this.usrId = 1;
        this.record = document.createElement("div");
        this.record.className = "row";
        this.record.classList.add("input");
        this.inputString = document.createElement("input");
        this.inputString.type = "text";
        this.inputString.className = "input_meter";
        this.inputString.placeholder = "Ведите ID пользователя";
        const controls = document.createElement("div");
        controls.className = "controls";
        this.loadButton = document.createElement("button");
        this.loadButton.className = "add";
        this.loadButton.innerText = "загрузить";
        controls.appendChild(this.loadButton);
        this.record.appendChild(this.inputString);
        this.record.appendChild(controls);
        parentNode.appendChild(this.record);
    }

    set usrId(val) {
        this._usrId = val ? val : 1;
    }

    get usrId() {
        return this._usrId;
    }

    getUserId() {
        const uid = parseInt(this.inputString.value);
        this.usrId = uid;
        if (!uid) {
            this.redBlink();
        }
        return this.usrId;
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
