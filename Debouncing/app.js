console.log("Looged");

// Debouncing in JavaScript is a technique used to limit the number
//  of times a function gets called, particularly in scenarios where
//   an event may trigger the function rapidly, such as with user input
//    like scrolling, resizing the window, or typing. Debouncing
//    ensures that the function is only executed after a certain
//    amount of time has passed since the last invocation of the
//    function. This helps in optimizing performance by reducing
//    unnecessary function calls.

const inputBox = document.getElementById("searchInput");

function debounce(func, delay) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;
    console.log("arguments", args);
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const goodFunction = debounce(getData, 500);
function getData(e) {
  console.log("called");
  console.log(e.target);
}

inputBox.addEventListener("keyup", goodFunction);

const btn1 = document.getElementById("throtleButton");

const throttleFunc = function (func, gap) {
  return function () {
    let context = this;

    let args = arguments;
    let timerId = setTimeout(() => {
      func.apply(context, args);
    }, gap);
  };
};

const clickMe = (e) => {
  console.log("Button Clicked", e);
};

const throttleGood = throttleFunc(clickMe, 1000);
btn1.addEventListener("click", throttleGood);
