"use strict";
console.log("Jai Mata Di");
// The Object type represents one of JavaScript's data types. It is used to store various keyed collections and more
// complex entities. Objects can be created using the Object() constructor or the object initializer / literal syntax.
// Deleting a property from an object
// There isn't any method in an Object itself to delete its own properties (such as Map.prototype.delete()).
// To do so, one must use the delete operator.

const obj1 = {
  a: 10,
  b: 78,
};
console.log(obj1);
delete obj1.a;
console.log(obj1); // a property will be removed

// null-prototype objects
// Almost all objects in JavaScript ultimately inherit from Object.prototype
// However, you may create null-prototype objects using
const obj = Object.create(null);
const obj2 = { __proto__: null };
// An object with a null prototype can behave in unexpected ways, because it doesn't inherit any object methods
// from Object.prototype.

// You can also revert a null-prototype object back to an ordinary object using Object.setPrototypeOf(nullProtoObj,
//     Object.prototype).

// Object coercion
// Many built-in operations that expect objects first coerce their arguments to objects. The operation can be summarized as follows:

// Objects are returned as-is.
const obj3 = Object(null);
console.log(obj3); // emplty object
const obj4 = Object([3, 5, 6, 90, 65]);
console.log(obj4);
// undefined and null throw a TypeError.
// The Object() function: Object(x) uses the same algorithm to convert x, except that undefined and null
//  don't throw a TypeError, but return a plain object.
// Number, String, Boolean, Symbol, BigInt primitives are wrapped into their corresponding object wrappers.

// Object() constructor
// The Object() constructor turns the input into an object

const primtObj = Object(2);
console.log(primtObj); // Numerr{2},

const o1 = {};
o1.constructor === Object; // true

const o2 = new Object();
o2.constructor === Object; // true

const a1 = [];
a1.constructor === Array; // true

const a2 = new Array();
a2.constructor === Array; // true

const n = 3;
n.constructor === Number; // true

// Object.assign()
// The Object.assign() static method copies all enumerable own properties from one or more source objects to a target
//  object. It returns the modified target object.
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
// Properties in the target object are overwritten by properties in the sources if they have the same key.
// Both String and Symbol properties are copied.

// In case of an error, for example if a property is non-writable, a TypeError is raised, and the target object is
// changed if any properties are added before the error is raised.

// PolyFill for Object.assign
if (typeof Object.assign !== "function") {
  Object.assign = function (target, varArgs) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// Object.create()
// The Object.create() static method creates a new object, using an existing object as the prototype of the newly created object.
let o12 = {};
// Is equivalent to:
let o13 = Object.create(Object.prototype);

let o14 = Object.create(Object.prototype, {
  // foo is a regular data property
  foo: {
    writable: true,
    configurable: true,
    value: "hello",
  },
  // bar is an accessor property
  bar: {
    configurable: false,
    get() {
      return 10;
    },
    set(value) {
      console.log("Setting `o.bar` to", value);
    },
  },
});

// Create a new object whose prototype is a new, empty
// object and add a single property 'p', with value 42.
let o34 = Object.create({}, { p: { value: 42 } });

// o34.p = 45; // in strict mode gives error
// By default properties are not writable, enumerable or configurable.
console.log(o34);

// Object.defineProperties()
// The Object.defineProperties() static method defines new or modifies existing properties directly on an object,
// returning the object.

// Configurable: Specifies whether the property can be deleted or changed.

// — Enumerable: Specifies whether the property can be returned in a for/in loop.

// — Writable: Specifies whether the property can be changed.
const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
  },
  property2: {},
});

console.log(object1.property1);
// Expected output: 42

// Object.defineProperty()

// The Object.defineProperty() static method defines a new property directly on an object, or modifies an existing
//  property on an object, and returns the object.

const object12 = {};

Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false,
});

// object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42

// Object.entries()
// The Object.entries() static method returns an array of a given object's own enumerable
// string-keyed property key-value pairs.

const object13 = {
  a: "somestring",
  b: 42,
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// Expected output:
// "a: somestring"
// "b: 42"

// Strings have indices as enumerable own properties
console.log(Object.entries("foo")); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

// Other primitives except undefined and null have no own properties
console.log(Object.entries(100)); // []

// Object.freeze()
// The Object.freeze() static method freezes an object. Freezing an object prevents extensions and makes existing
// properties non-writable and non-configurable. A frozen object can no longer be changed: new properties cannot be
// added, existing properties cannot be removed, their enumerability, configurability, writability, or value cannot be
//  changed, and the object's prototype cannot be re-assigned. freeze() returns the same object that was passed in.

// Freezing an object is the highest integrity level that JavaScript provides.
// freeze() returns the same object that was passed into the function. It does not create a frozen copy.

// Freezing an Array :

let array1 = [2, 3, 4, 7];
array1 = Object.freeze(array1);

// array1.push(19);  // error ,

// The object being frozen is immutable. However, it is not necessarily constant. The following example shows that a
//  frozen object is not constant (freeze is shallow).

// Copy to Clipboard
const obj21 = {
  internal: {},
};

Object.freeze(obj21);
obj21.internal.a = "aValue";

console.log(obj21.internal.a); // 'aValue'

// Deep Freeze

function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

// Object.fromEntries()
// The Object.fromEntries() static method transforms a list of key-value pairs into an object.

const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);

const obj34 = Object.fromEntries(entries);

console.log(obj34);
// Expected output: Object { foo: "bar", baz: 42 }

// Object.getPrototypeOf()
// The Object.getPrototypeOf() static method returns the prototype (i.e. the value of the internal [[Prototype]] property)
//  of the specified object.

const prototype1 = {};
const object18 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object18) === prototype1);
// Expected output: true

// Object.hasOwn()
// The Object.hasOwn() static method returns true if the specified object has the indicated property as its own property.
//  If the property is inherited, or does not exist, the method returns false.

const object189 = {
  prop: "exists",
};

console.log(Object.hasOwn(object189, "prop"));
// Expected output: true

console.log(Object.hasOwn(object189, "toString"));
// Expected output: false

console.log(Object.hasOwn(object189, "undeclaredPropertyValue"));
// Expected output: false

// Object.prototype.hasOwnProperty()
// The hasOwnProperty() method of Object instances returns a boolean indicating whether this object has the specified
// property as its own property (as opposed to inheriting it).

// Object.is()
// The Object.is() static method determines whether two values are the same value.

console.log(Object.is("1", 1));
// Expected output: false

console.log(Object.is(NaN, NaN));
// Expected output: true

console.log(Object.is(-0, 0));
// Expected output: false

const obj345 = {};
console.log(Object.is(obj345, {}));
// Expected output: false

// Object.is() is not equivalent to the == operator. The == operator applies various coercions to both sides
// (if they are not the same type) before testing for equality (resulting in such behavior as "" == false being true),
// but Object.is() doesn't coerce either value.

// Object.is() is also not equivalent to the === operator. The only difference between Object.is() and === is in
//  their treatment of signed zeros and NaN values. The === operator (and the == operator) treats the number values -0
//  and +0 as equal, but treats NaN as not equal to each other.

if (!Object.is) {
  Object.is = function (x, y) {
    if (x === y) {
      // Handle +0 !== -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Handle NaN !== NaN
      return x !== x && y !== y;
    }
  };
}

// Object.keys()
// The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.

// Object.preventExtensions()
// The Object.preventExtensions() static method prevents new properties from ever being added to an object
// (i.e. prevents future extensions to the object). It also prevents the object's prototype from being re-assigned.

let obj876 = {
  a: 10,
  b: 78,
};
console.log(obj876);
obj876 = Object.preventExtensions(obj876);

// obj876.c = 20; // error
console.log(obj876);

// Object.seal()
// The Object.seal() static method seals an object. Sealing an object prevents extensions and makes existing properties
// non-configurable. A sealed object has a fixed set of properties: new properties cannot be added, existing properties
// cannot be removed, their enumerability and configurability cannot be changed, and its prototype cannot be re-assigned.
// Values of existing properties can still be changed as long as they are writable. seal() returns the same object that
// was passed in.

const obj79 = {
  prop() {},
  foo: "bar",
};

// New properties may be added, existing properties
// may be changed or removed.
obj79.foo = "baz";
obj79.lumpy = "woof";
delete obj79.prop;

const o = Object.seal(obj);

o === obj; // true
Object.isSealed(obj); // true

// Changing property values on a sealed object
// still works.
obj.foo = "quux";

// But you can't convert data properties to accessors,
// or vice versa.
Object.defineProperty(obj, "foo", {
  get() {
    return "g";
  },
}); // throws a TypeError

// Now any changes, other than to property values,
// will fail.
obj.quaxxor = "the friendly duck";
// silently doesn't add the property
delete obj.foo;
// silently doesn't delete the property

// ...and in strict mode such attempts
// will throw TypeErrors.
function fail() {
  "use strict";
  delete obj.foo; // throws a TypeError
  obj.sparky = "arf"; // throws a TypeError
}
fail();

// Attempted additions through
// Object.defineProperty will also throw.
Object.defineProperty(obj, "ohai", {
  value: 17,
}); // throws a TypeError
Object.defineProperty(obj, "foo", {
  value: "eit",
}); // changes existing property value

// Object.prototype.toString()
// The toString() method of Object instances returns a string representing this object. This method is meant to be
// overridden by derived objects for custom type coercion logic.
