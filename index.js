const animal = {
  eat() {
    console.log("Eating");
  },
};
const dog = {}
dog.__proto__ = animal;
dog.bark = function(){
    console.log("woof")
}

dog.eat()
dog.bark()