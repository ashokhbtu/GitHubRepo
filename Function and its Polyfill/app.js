console.log("This is function and their polyfill");

Function.prototype.myBind = function (...args) {
  let obj = this;

  return function (...args2) {
    const myThis = args[0];
    const args1 = args.slice(1);
    obj.apply(myThis, [...args1, ...args2]);
  };
};

const person1 = {
  name: "Ashok Kumar",
};

function myPrint(city, age) {
  console.log(`My name is ${this.name} from ${city} and age ${age}`);
}

const myNewPrint = myPrint.myBind(person1, "Mumbai");
myNewPrint(34);

console.log(!!45); // true
console.log(eval("10*10+5")); // 105 evaluated as a expression
console.log(parseInt("7*6", 10)); // 7 as once non digit corrector occurs its automatically get terminated

// The String.raw() static method is a tag function of template literals.
const filePath = String.raw`C:\Development\profile\aboutme.html`;

console.log(`The file was uploaded from: ${filePath}`);
// Expected output: "The file was uploaded from: C:\Development\profile\aboutme.html"

let person = { name: "Kiran" };

const members = [person];
person = null;

console.log(members); // [{name : "Kiran"}]  // as intially both person and members referencing {name: "Kiran"} after
// that person started to refernce null.

// Template literals are string literals that support expression interpolation and multiple lines:

// Tagged template literals
// Tagged template literals let you parse a template literal with a function. Formally, a tagged template literal
// is a function call whose arguments come from a template literal. Syntactically, this looks like a function identifier
//  followed by a template literal.

// Core Web Vitals are a set of specific factors that Google considers crucial for delivering a good user experience on
// the web. These factors focus on key aspects of web performance, such as loading time, interactivity, and visual
// stability. Google uses Core Web Vitals as part of its Page Experience signals for ranking web pages in search results.
// The Core Web Vitals include the following metrics:

// Largest Contentful Paint (LCP): LCP measures the loading performance of a web page. It represents the time taken for
// the largest content element (such as an image or text block) to become visible within the viewport. An LCP score below
//  2.5 seconds is considered good.

// First Input Delay (FID): FID measures the responsiveness of a web page. It quantifies the delay between the user's
//  first interaction (e.g., clicking a button or tapping a link) and the browser's response to that interaction. An FID
//  score below 100 milliseconds is considered good.

// Cumulative Layout Shift (CLS): CLS measures the visual stability of a web page. It quantifies the amount of unexpected
// layout shifts that occur during the page's lifespan. Layout shifts happen when page content moves around unexpectedly,
//  often due to images or ads loading dynamically. A CLS score below 0.1 is considered good.
