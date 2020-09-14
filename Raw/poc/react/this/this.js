let myObj = {
    name: "John",
    sayHi: function(){
        console.log("Line no 4");
        console.log(this);
        console.log(this == global);
        console.log("Inside sayHi");
        function inner(){
            console.log("Line No 9");
            console.log(this == global);
            console.log(this.name);
        }
        inner();
        let boundFn = inner.bind(myObj);
        boundFn();
    }
}
myObj.sayHi();