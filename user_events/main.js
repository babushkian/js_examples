class Increment {
  constructor() {
    this.input = document.getElementsByTagName("input")[0];
    this.input.value = 0;
    this.plusOne = document.getElementById("one");
    this.plusTen = document.getElementById("ten");
    this.plusTen.addEventListener("click", () => {
      this.plusN(10);
    });

    this.plusOne.addEventListener("click", () => {
      this.plusN(1);
    });
  }

  plusN(n) {
    this.input.value = parseInt(this.input.value) + n;
    const event = new Event("updateNumber", {
      bubbles: true,
      cancelable: true,
    });
    this.input.dispatchEvent(event);

    console.log(this.input.value);
  }
}

class ShowCounter {
  constructor(input) {
    this.input = input;
    this.show = document.querySelector(".show");
  }

  update() {
    this.show.innerText = `Счетчик: ${this.input.value}`;
  }
}

class View {
  constructor() {
    this.enlarger = new Increment();
    this.out = new ShowCounter(this.enlarger.input);
    this.embrace = document.querySelector(".embrace");
    this.out.update();
    this.embrace.addEventListener("updateNumber", (event) => {
      event.stopPropagation();
      this.out.update();
    });
    console.log("Создаем объекты");
  }
}

const v = new View();
document.addEventListener("updateNumber", () => {
  alert("Всплыло до самого верха");
});
