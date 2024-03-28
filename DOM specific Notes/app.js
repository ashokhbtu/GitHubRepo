console.log("Consoled");
console.log(document.body.childNodes);
console.log(document.body.children);
console.log(document.querySelectorAll("ul > li:last-child")); // 2 nodes
console.log(document.querySelector(".test1")); //li

console.log(document.getElementById("test1").innerHTML); // test1
console.log(document.body.innerHTML);
const ele3 = document.getElementById("test3");
ele3.hidden = true;
// setInterval(() => (ele3.hidden = !ele3.hidden), 1000);

const ul1pre = document.createElement("li");
ul1pre.innerHTML = "Ul1pre";

const ul1append = document.createElement("li");
ul1append.innerHTML = "Ul1app";

const ul1 = document.getElementById("ul1");
ul1.append(ul1append);
ul1.prepend(ul1pre);
