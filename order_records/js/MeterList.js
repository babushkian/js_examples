import { Meter } from "./Meter.js";

export default class MeterList {
    static recId = 0;
    constructor(parent, meterList) {
        console.log(window.location.href);
        this.parent = parent;
        this.meterList = meterList;
        this.recs = [];
        this.draw();
    }
    clear() {
        this.meterList.innerHTML = "";
        this.recs.forEach((item) => {
            item.removeListeners();
        });
    }

    removeRecordsListeners() {
        this.recs.forEach((item) => {
            item.removeListeners();
        });
    }

    async draw() {
        this.data = await this.getRecords();
        this.clear();
        this.data.sort((a, b) => a.order - b.order);
        this.data.forEach((item, index) => {
            this.showRecord(item, index);
        });
    }

    showRecord(item, index) {
        const m = new Meter(this, item, index);
        this.meterList.appendChild(m.record);
        this.recs.push(m);
    }

    async getRecords() {
        URL = `http://127.0.0.1:5000/api/${this.parent.usrId}/`;
        const meters = await fetch(URL);
        return await meters.json();
    }
}
