"use strict";
let myObj = {
    name: "Steve",
    sayHi: function() {
        function inner() {
            console.log("Line No 11");
            console.log(this.name);
        }
        inner();
        let bindInner = inner.bind(myObj, null);
        bindInner();
    }
}
myObj.sayHi();