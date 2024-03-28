const worker = new Worker("worker.js");
const colorbtn = document.getElementById("btn2");
const sumbtn = document.getElementById("btn1");

colorbtn.addEventListener("click", () => {
  console.log(document.body.classList);
  document.body.classList.toggle("app");
});

sumbtn.addEventListener("click", () => {
  worker.postMessage("Hello");
});

worker.onmessage = (message) => {
  alert(`${message.data}`);
};

// Web workers are useful when you have computationally expensive work that just can't be run on the main
// thread without causing long tasks that make the page unresponsive

// As several comments have already pointed out, Workers really are multi-threaded.

// Some points which may help clarify your thinking:

// JavaScript is a language, it doesn't define a threading model, it's not necessarily single threaded
// Most browsers have historically been single threaded (though that is changing rapidly: IE, Chrome, Firefox),
// and most JavaScript implementations occur in browsers
// Web Workers are not part of JavaScript, they are a browser feature which can be accessed through JavaScript.

// Web worker limitations
// Unlike JavaScript that runs on the main thread, web workers lack direct access to the window context.
//  and have limited access to the APIs it provides.
// Web workers are subject to the following constraints:

// Web workers can't directly access the DOM.
// Web workers can communicate with the window context through a messaging pipeline, meaning that a web worker
// can indirectly access the DOM in a way.
// The web worker scope is self, rather than window.
// The web worker scope does have access to JavaScript primitives and constructs, as well as APIs such as
// fetch and a fairly large number of other APIs.
