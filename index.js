

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name.toUpperCase();
  }
  set name(value) {
    if (!value) throw new Error("Name cannot be empty");
    this._name = value;
  }
}
const p = new Person();
p.name = "kk";
console.log(p.name); 