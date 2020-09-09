"use strict";

let myObj = {
    name: "John",
    sayHi: function() {
        console.log("Line No 6");
        console.log(this);
        let inner = () => {
            console.log("Line No 11");
            console.log(this.name);
        }
        inner();
    }
}
myObj.sayHi();