export class Meter {
    constructor(parent, item, rownumber) {
        this.parent = parent;
        this.item = item;
        this.record = document.createElement("div");
        this.record.className = "row";
        this.record.dataset.rowId = item.id;
        this.record.dataset.rowbumber = rownumber;

        this.inputString = document.createElement("input");
        this.inputString.className = "input_meter";
        this.inputString.id = `input-meter-${this.record.dataset.rowbumber}`;
        this.record.appendChild(this.inputString);
        const cle = document.createElement("div");
        cle.className = "controls";
        const ude = document.createElement("div");
        ude.className = "updown";
        this.up = document.createElement("button");
        this.up.className = "adjust";
        const upim = document.createElement("img");
        upim.src = "./img/expand_less.svg";
        this.up.appendChild(upim);
        this.down = document.createElement("button");
        this.down.className = "adjust";
        const dowim = document.createElement("img");
        dowim.src = "./img/expand_more.svg";
        this.down.appendChild(dowim);
        upim.className = "arrow";
        dowim.className = "arrow";

        ude.appendChild(this.up);
        ude.appendChild(this.down);
        cle.appendChild(ude);
        this.delb = document.createElement("button");
        this.delb.className = "delete";
        this.delb.innerText = "удалить";
        cle.appendChild(this.delb);
        this.record.appendChild(cle);

        this.inputString.value = this.item.name;
        // this.inputString.setAttribute("readonly", true);

        this.applyListeners();
    }

    applyListeners() {
        this.delButtonFunc = this.delRec.bind(this);
        this.delb.addEventListener("click", this.delButtonFunc);

        this.moveUp = this.move.bind(this, this.record.dataset.rowbumber, -1);
        this.up.addEventListener("click", this.moveUp);

        this.moveDown = this.move.bind(this, this.record.dataset.rowbumber, 1);
        this.down.addEventListener("click", this.moveDown);
        this.recEd = this.editRecord.bind(this);
        this.inputString.addEventListener("blur", this.recEd);
    }

    removeListeners() {
        this.delb.removeEventListener("click", this.delButtonFunc);
        this.up.removeEventListener("click", this.moveUp);
        this.down.removeEventListener("click", this.moveDown);
        this.inputString.removeEventListener("blur", this.recEd);
    }

    async delRec() {
        console.log("всё ", this);
        if (
            confirm("Вы уверены? все показания этого счетчика будут удалены!")
        ) {
            console.log("почему? ", this.item);
            const jsn = JSON.stringify({
                id: this.item.id,
            });
            console.log(jsn);
            await fetch("http://127.0.0.1:5000/api/del_rec/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsn,
            });
            this.parent.draw();
        }
    }

    async move(ind, direction) {
        const index = Number(ind);
        const next = index + Number(direction);
        if (next >= 0 || next < this.parent.data.lenght) {
            await fetch("http://127.0.0.1:5000/api/swap/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: this.parent.data[index].id,
                    to: this.parent.data[next].id,
                }),
            });
            this.parent.draw();
        }
    }

    async editRecord() {
        const tempValue = this.inputString.value;
        if (tempValue === this.item.name) {
            return;
        }

        if (tempValue === "") {
            alert("Пустое поле недопустимо!");
            this.inputString.value = this.item.name;
            return;
        }
        let uniqueFlag = true;
        this.parent.data.forEach((item, index) => {
            if (
                item.name === tempValue &&
                this.record.dataset.rowbumber != index
            ) {
                uniqueFlag = false;
            }
        });
        if (!uniqueFlag) {
            alert("Поля с повторяющимися названиями недопустимы!");
            this.inputString.value = this.item.name;
            return;
        }
        await fetch("http://127.0.0.1:5000/api/nameedit/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: this.item.id,
                name: tempValue,
            }),
        });
        this.parent.draw();
    }
}
