"use strict";
console.log("Basics");
// JavaScript is a dynamic programming language.
// JavaScript is a lightweight, interpreted, or Just In Time compiled programming language.
// Javascript runtime env consist of javascript engine , globalapi , event loop and callback queue and microsoft queue.
// Everything which needed to run js needed javascript runtime env.
// More modern browsers use a technology known as Just-In-Time (JIT) compilation, which compiles JavaScript to executable
//  bytecode just as it is about to run.
// In the JIT compiler, we have a new component called a monitor (aka a profiler). That monitor watches the code as it runs and

// Identify the hot or warm components of the code eg: repetitive code.
// Transform those components into machine code during run time.
// Optimize the generated machine code.
// Hot swap the previous implementation of the code.

// let const and var difference

// KEYWORD	                               SCOPE	             REDECLARATION & REASSIGNMENT	                  HOISTING
// var                             	Global, Local	             yes & yes	                            yes, with default value
// let	                                Global, Local, Block	     no & yes	                          yes, without default value
// const	                              Global, Local, Block	       no & no	                          yes, without default value
console.log(b); // undefined
// console.log(a);      // errror
let a = 10;
var b = 20;
// c = 20;  inside strict mode it gives error.
// console.log(c);

// # In JavaScript, Hoisting is the default behavior of moving all the declarations at the top of the scope before code
//  execution. Basically, it gives us an advantage that no matter where functions and variables are declared, they are
//  moved to the top of their scope regardless of whether their scope is global or local.
// # It allows us to call functions before even writing them in our code.

// Function with its lexical scope create a closure

// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state
// (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner
// function.

// this : This” keyword refers to an object that is executing the current piece of code
// 1 . Inside global scope this refers to globalObject in both strict and non strict mode .

console.log(this);
function ax() {
  console.log(this); // inside strict mode it gives undefined
}
ax(); // undefined
window.ax(); // window

// the value of this inside a function is detrrmined how it is being called.
// a function insdie a object is called method .

const obj = {
  a: 10,
  myThis: function () {
    console.log(this);
  },
};

obj.myThis();
// Value of this inside arrow function is inclosing lexical scope

const obj2 = {
  a: 10,
  myThisArrow: () => {
    console.log(this);
  },
};

obj2.myThisArrow(); // window

const obj3 = {
  a: 10,
  myThisArrow: function () {
    return () => {
      console.log(this);
    };
  },
};

obj3.myThisArrow()(); // obj3

// inside dom this refers to that element

// PolyFill for reduce

Array.prototype.myReduce = function (func, intialValue) {
  if (this == null)
    throw TypeError("my Reduce can  not be called on null or undefined");
  if (typeof func !== "function")
    throw TypeError("function can not null or undefined");
  let accumulator = intialValue;
  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined)
      accumulator = func(accumulator, this[i], i, this);
    else accumulator = this[i];
  }
  if (accumulator === undefined)
    throw new TypeError(
      "Without initial value can not be called on empty array"
    );
  return accumulator;
};

console.log([].myReduce((a, item) => a + item, 0));

// The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript
//  into pixels on the screen. Optimizing the critical render path improves render performance. The critical rendering
//  path includes the Document Object Model (DOM), CSS Object Model (CSSOM), render tree and layout.

// 1. Document Object Model
// 2. CSS object Model
// 3 . Render Tree
// 4. Layout
// 5. paint

// Memoization :
// Memoization is a technique where the return value of a function is cached based on its input parameters.
// Subsequent calls to the function with the same parameters can then directly return the cached result,
// eliminating the need for repeated computation.

const memoized = (fn) => {
  let catched = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (catched[key]) {
      console.log("Returned from cached");
      return catched[key];
    } else {
      const key = JSON.stringify(args);
      const result = fn.apply(this, args);
      catched[key] = result;
      console.log("returned from computation");
      return result;
    }
  };
};

const add = memoized((a, b) => a + b);

// console.log(add(3, 2));
// console.log(add(3, 2));
// console.log(add(2, 3)); // from computation

const factorial = memoized((n) => {
  if (n === 0 || n === 1) return 1;
  else return n * factorial(n - 1);
});

// console.log(factorial(5));
// console.log(factorial(6));

let catched1 = {};

const factorialnew = (n) => {
  if (catched1[n]) {
    console.log("Returned from catched");
    return catched1[n];
  } else {
    let result = n === 0 || n === 1 ? 1 : n * factorialnew(n - 1);
    catched1[n] = result;
    console.log("returned from computation");
    return result;
  }
};

console.log(factorialnew(6));
console.log(factorialnew(5));
