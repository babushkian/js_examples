"use strict"
class Tarelka {
    food = ''
    #sauce =''
    // если _salt закомментировать, то в конструкторе будет вызыван метод get, и обе переменные сначала будут undefined
    // по после присвоения обе станут явными. То есть  _salt появится  на моменте this.salt = inner_salt через вызов геттера
    // таким образом объявлять ее напрямую нет необходимости
    _salt = 50;
    constructor(inner_salt=77) {
	// this.salt - это сеттер и при присовении он вызывает метод, где устанавливается  _salt
        this.salt = inner_salt
        console.log('in constructor:', 'public', this.salt, 'hidden', this._salt)
    }
    show(){
        return this.food
    }

    get salt() {
        //так делать нельзя, она вызывает саму себя
        // причем нельзя вызывать  ни this.salt, ни this._salt
        // console.log('in getter:', 'public', this.salt, 'hidden', this._salt)
        return this._salt;
    }

    set salt(value) {
	console.log('add more salt: add:', value, 'public', this.salt, 'hidden', this._salt)
        this._salt = value;
    }


}

const meat = new Tarelka();
const salad = new Tarelka();
Tarelka.food = 'void'
console.log('свойство класса (food) до создания объектов:', Tarelka.food)
meat.food = 'camel'
salad.food = 'tomato'
console.log('meat', meat.food)
console.log('salad', salad.food)
console.log('свойство класса (food) после объявления объектов:', Tarelka.food)
console.log(' show meat', meat.show())
console.log('show salad', salad.show())

const poverty = new Tarelka()
console.log('бедная тарелка, еда в которой явно не объявлена и наследуется от класса', poverty.food)
console.log('meat salt:', meat.salt)
console.log('salted:', meat.salt = 200)
console.log('meat salt:', meat.salt)
