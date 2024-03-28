console.log("events");

// An event is a signal that something has happened. All DOM nodes generate such signals (but events are not
//     limited to DOM).

// Event handlers
// To react on events we can assign a handler – a function that runs in case of an event.

// Handlers are a way to run JavaScript code in case of user actions.

// 1. HTML-attribute
// A handler can be set in HTML with an attribute named on<event>.

// For instance, to assign a click handler for an input, we can use onclick, like here:

// <input value="Click me" onclick="alert('Click!')" type="button"></input>

{
  /* <script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" onclick="countRabbits()" value="Count rabbits!"></input> */
}

// 2 . DOM property :
// We can assign a handler using a DOM property on<event>.

// For instance, elem.onclick:

// <input id="elem" type="button" value="Click me">
// <script>
//   elem.onclick = function() {
//     alert('Thank you');
//   };
// </script>

// As there’s only one onclick property, we can’t assign more than one event handler.

// Accessing the element: this
// The value of this inside a handler is the element. The one which has the handler on it.

// In the code below button shows its contents using this.innerHTML:

// <button onclick="alert(this.innerHTML)">Click me</button>

// Don’t use setAttribute for handlers.

// Such a call won’t work:

// // a click on <body> will generate errors,
// // because attributes are always strings, function becomes a string
// document.body.setAttribute('onclick', function() { alert(1) });

// addEventListener
// The fundamental problem of the aforementioned ways to assign handlers is that we can’t assign multiple handlers to
// one event.
// The syntax to add a handler:

// element.addEventListener(event, handler, [options]);
// event
// Event name, e.g. "click".
// handler
// The handler function.
// options
// An additional optional object with properties:
// once: if true, then the listener is automatically removed after it triggers.
// capture: the phase where to handle the event, to be covered later in the chapter Bubbling and capturing.
// For historical reasons, options can also be false/true, that’s the same as {capture: false/true}.
// passive: if true, then the handler will not call preventDefault(), we’ll explain that later in Browser default
// actions.

// element.removeEventListener(event, handler, [options]);
// To remove a handler we should pass exactly the same function as was assigned.

const btn1 = document.getElementById("btn1");

function clickHandlers() {
  console.log("clicked");
}
btn1.addEventListener("click", clickHandlers, [{ once: true }]);

// Event object :

// When an event happens, the browser creates an event object, puts details into it and passes it as
// an argument to the handler.

// Bubbling
// The bubbling principle is simple.

// When an event happens on an element, it first runs the handlers on it, then on its parent,
// then all the way up on other ancestors.

{
  /* <form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>; */
}

// A click on the inner <p> first runs onclick:

// On that <p>.
// Then on the outer <div>.
// Then on the outer <form>.
// And so on upwards till the document object.

// event.target :
// The most deeply nested element that caused the event is called a target element, accessible as event.target.

// Stopping bubbling

// event.stopPropagation().
// For instance, here body.onclick doesn’t work if you click on <button>:

// <body onclick="alert(`the bubbling doesn't reach here`)">
//   <button onclick="event.stopPropagation()">Click me</button>
// </body>

// Capturing
// There’s another phase of event processing called “capturing”. It is rarely used in real code, but sometimes can be useful.

// The standard DOM Events describes 3 phases of event propagation:

// Capturing phase – the event goes down to the element.
// Target phase – the event reached the target element.
// Bubbling phase – the event bubbles up from the element.

// To catch an event on the capturing phase, we need to set the handler capture option to true:

// elem.addEventListener(..., {capture: true})

// // or, just "true" is an alias to {capture: true}
// elem.addEventListener(..., true)

// Event delegation
// Capturing and bubbling allow us to implement one of the most powerful event handling patterns called event delegation.

// The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.

// In the handler we get event.target to see where the event actually happened and handle it.

const ul1 = document.getElementById("ul1");
ul1.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.tagName.toLowerCase() === "li") console.log(e.target.innerHTML);
});

// Browser default actions
// Many events automatically lead to certain actions performed by the browser.

// For instance:

// A click on a link – initiates navigation to its URL.
// A click on a form submit button – initiates its submission to the server.
// Pressing a mouse button over a text and moving it – selects the text.

// We Can stop that by preventDefault()
