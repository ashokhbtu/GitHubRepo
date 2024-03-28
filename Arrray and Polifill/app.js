//The Array object, as with arrays in other programming languages, enables storing a
//collection of multiple items under a single variable name, and has members for performing common array operations.

//Properties :

//JavaScript array-copy operations create shallow copies. (All standard built-in
//   copy operations with any JavaScript objects create shallow copies, rather than deep copies).

let a = [2, 4, 8];
let b = [...a];
b[1] = 6;

// console.log(a, b); // [2, 4, 8] , [2,6,8]

let c = [34, { name: "Ashok" }];
let d = [...c];

c[1].name = "Santosh";
// console.log(c, d); // in both name will be santosh

// A shallow copy of an object is a copy whose properties share the same references (point to the same underlying
// values) as those of the source object from which the copy was made. As a result, when you change either
//the source or the copy, you may also cause the other object to change too. That behavior contrasts with the
// behavior of a deep copy, in which the source and copy are completely independent.

// For shallow copies, only the top-level properties are copied, not the values of nested objects. Therefore:

// Re-assigning top-level properties of the copy does not affect the source object.
// Re-assigning nested object properties of the copy does affect the source object.
// In JavaScript, all standard built-in object-copy operations (spread syntax, Array.prototype.concat(),
// Array.prototype.slice(), Array.from(), Object.assign(), and Object.create()) create shallow copies rather than
//  deep copies.

//A deep copy of an object is a copy whose properties do not share the same references (point to the same underlying
//values) as those of the source object from which the copy was made.

// One way to make a deep copy of a JavaScript object, if it can be serialized, is to use JSON.stringify() to
//convert the object to a JSON string, and then JSON.parse() to convert the string back into a (completely new)
//JavaScript object:

let obj1 = [34, { name: "DP singh" }];
let obj2 = JSON.parse(JSON.stringify(obj1));
// console.log(obj1, obj2);

obj2[1].name = "SP singh";
// console.log(obj1, obj2);

// Array with empty slots

// Array methods have different behaviors when encountering empty slots in sparse arrays. In general, older
// methods (e.g. forEach) treat empty slots differently from indices that contain undefined.

// Methods that have special treatment for empty slots include the following: concat(), copyWithin(),
// every(), filter(), flat(), flatMap(), forEach(), indexOf(), lastIndexOf(), map(), reduce(), reduceRight(),
// reverse(), slice(), some(), sort(), and splice(). Iteration methods such as forEach don't visit empty slots at all.
//  Other methods, such as concat, copyWithin, etc.,
// preserve empty slots when doing the copying, so in the end the array is still sparse.

// const arr = [2, 3, 4, 5];
// arr.length = 8;
// arr[7] = 7;
// console.log(arr);
// arr.forEach((data, index) => {
//   console.log(index, data);
// });

// const newArr = arr.map((data, index) => {
//   console.log(index, data);
//   return data * 2;
// });

// console.log(newArr);

// Array Constructor

// new Array()
// new Array(element1)
// new Array(element1, element2)
// new Array(element1, element2, /* …, */ elementN)
// new Array(arrayLength)

// Array()
// Array(element1)
// Array(element1, element2)
// Array(element1, element2, /* …, */ elementN)
// Array(arrayLength)
// Note: Array() can be called with or without new.
// Both create a new Array instance.

// The length data property of an Array instance represents the number of elements in that array.
// The value is an unsigned, 32-bit integer that is always numerically greater than the highest index
//  in the array

const arr = [2, 367];
// arr.length = -98;  // error invalid array length

console.log(arr[-89]); // undefined

arr[-78] = 56; // no error
console.log(arr[-78]); //56 Since negative indexes aren't allowed, our -78 is being converted into the string '-78'
//  and used as  an object property and length will be 2 only.

// console.log(arr);

// Javascript methods

//1

// 1. The at() method of Array instances takes an integer value and returns the item at that index, allowing
// for positive and negative integers. Negative integers count back from the last item in the array.

const arr3 = [4, 6, 8, 9, 34];

console.log(arr3.at(-5)); // 4

//2
// Array.prototype.concat()
// The concat() method of Array instances is used to merge two or more arrays.
// This method does not change the existing arrays  but instead returns a new array.

// The concat() method is a copying method. It does not alter this or any of the arrays provided as arguments but
// instead returns a shallow copy that contains the same elements as the ones from the original arrays.

// The concat() method preserves empty slots if any of the source arrays is sparse.
// Concatenating values to an array
// The following code concatenates three values to an array:

const letters = ["a", "b", "c"];

const alphaNumeric = letters.concat(1, [2, 3]);

console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]
// Concatenating nested arrays
// The following code concatenates nested arrays and demonstrates retention of references:

const num1 = [[1]];
const num2 = [2, [3]];

const numbers = num1.concat(num2);

console.log(numbers);
// results in [[1], 2, [3]]

// modify the first element of num1
num1[0].push(4);

console.log(numbers);
// results in [[1, 4], 2, [3]]

//3
Array.prototype.copyWithin();
// The copyWithin() method of Array instances shallow copies part of this array to another location in the
// same array and returns this array without modifying its length.

const array1 = ["a", "b", "c", "d", "e"];

// Copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]

//3 . Array.prototype.entries
// The entries() method of Array instances returns a new array iterator object that contains the
//  key/value pairs for each index in the array.
// When used on sparse arrays, the entries() method iterates empty slots as if they have the value undefined.

// The entries() method is generic. It only expects the this value to have a length property and integer-keyed properties.

const entries1 = [1, 3, , 4].entries();
console.log(entries1); // array interator object

for (let [key, value] of entries1) console.log(key, value);

const arrayLike = {
  length: 3,
  0: "a",
  1: "b",
  2: "c",
  3: "d", // ignored by entries() since length is 3
};
for (const entry of Array.prototype.entries.call(arrayLike)) {
  console.log(entry);
}
// [ 0, 'a' ]
// [ 1, 'b' ]
// [ 2, 'c' ]

// Array.prototype.every()
// The every() method of Array instances tests whether all elements in the array pass the test implemented by the
// provided function. It returns a Boolean value.

// polyFill of every

if (!Array.prototype.every) {
  Array.prototype.every = function (callback, thisArg) {
    "use strict";
    if (this == null) {
      throw new TypeError("Array.prototype.every called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    var array = Object(this);
    var len = array.length;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in array && !callback.call(thisArg, array[i], i, array)) {
        return false;
      }
    }
    return true;
  };
}
// check for in loop

let myarr6 = [3, 5, , undefined, 6, 8];
console.log(myarr6);
console.log(2 in myarr6); // false
console.log(3 in myarr6); // true

// in
// The in operator returns true if the specified property is in the specified object or its prototype chain.

// every acts like the "for all" quantifier in mathematics. In particular, for an empty array, it returns true.
// (It is vacuously true that all elements of the empty set satisfy any given condition.)

// callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots
// in sparse arrays.

// The every() method is generic. It only expects the this value to have a length property and integer-keyed properties.

// Array.prototype.fill()
// The fill() method of Array instances changes all elements within a range of indices in an array to a static value.
//  It returns the modified array.

// fill(value)
// fill(value, start)
// fill(value, start, end)

// Value to fill the array with. Note all elements in the array will be this exact value:
// if value is an object, each slot in the array will reference that object.

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, "fill", {
    value: function (value, start, end) {
      // Steps 1-2.
      if (this == null) {
        throw new TypeError("this is null or not defined");
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var relativeStart = start >> 0;

      // Step 8.
      var k =
        relativeStart < 0
          ? Math.max(len + relativeStart, 0)
          : Math.min(relativeStart, len);

      // Steps 9-10.
      var relativeEnd = end === undefined ? len : end >> 0;

      // Step 11.
      var final =
        relativeEnd < 0
          ? Math.max(len + relativeEnd, 0)
          : Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    },
  });
}

//  The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to
//just the elements from the given array that pass the test implemented by the provided function.

if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback, thisArg) {
    "use strict";
    if (this == null) {
      throw new TypeError("Array.prototype.filter called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    var array = Object(this);
    var len = array.length >>> 0;
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in array) {
        var val = array[i];
        if (callback.call(thisArg, val, i, array)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}
const fruits = ["apple", "banana", "grapes", "mango", "orange"];

/**
 * Filter array items based on search criteria (query)
 */
function filterItems(arr, query) {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}

console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']

// Array.prototype.find()
// The find() method of Array instances returns the first element in the provided array that satisfies
// the provided testing function. If no values satisfy the testing function, undefined is returned.

// If you need the index of the found element in the array, use findIndex().
// If you need to find the index of a value, use indexOf(). (It's similar to findIndex(), but checks each
// element for equality with the value instead of using a testing function.)
// If you need to find if a value exists in an array, use includes(). Again, it checks each element for equality
// with the value instead of using a testing function.
// If you need to find if any element satisfies the provided testing function, use some().
// If you need to find all elements that satisfy the provided testing function, use filter().

const array7 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// Expected output: 12

// callbackFn is invoked for every index of the array, not just those with assigned values. Empty slots in sparse
// arrays behave the same as undefined.

/// flatten arrray .

function flattenArray(arr) {
  var flattened = [];

  arr.forEach(function (item) {
    if (Array.isArray(item)) {
      flattened = flattened.concat(flattenArray(item));
    } else {
      flattened.push(item);
    }
  });

  return flattened;
}

// console.log(flattenArray([1, 2, [3, 4, [89, 98, [35, 67]]], 30, 40]));

// Array.prototype.reduce()
// The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the
// array, in order, passing in the return value from the calculation on the preceding element. The final result of running
//  the reducer across all elements of the array is a single value.

const array = [15, 16, 17, 18, 19];
const initailValue = 10;

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`
  );
  return returns;
}

array.reduce(reducer, initailValue);

// ployfill for reducer function
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (cb, initailValue) {
    if (this == null)
      throw new TypeError("Reduce can not be called on null or undefined");
    if (cb == null)
      throw new TypeError("callback functiion can not be undefined");
    let accumulator = initailValue === undefined ? undefined : initailValue;

    for (let i = 0; i < this.length; i++) {
      if (accumulator !== undefined) {
        accumulator = cb.call(undefined, accumulator, this[i], i, this);
      } else {
        accumulator = this[i];
      }
    }
    if (accumulator === undefined) {
      throw new TypeError("Empty array can not be called with no intial value");
    }
    return accumulator;
  };
}

// console.log([23, 22].myReduce((accumulator, item) => item + accumulator));

// The forEach() method is an iterative method. It calls a provided callbackFn function once for each element in an array in
// ascending-index order.
//  Unlike map(), forEach() always returns undefined and is not chainable. The typical use case is to execute side effects
//  at the end of a chain. Read
//  the iterative methods section for more information about how these methods work in general.

// callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in
//  sparse arrays.

// Array.isArray :

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}

const currying = (a) => {
  return (b) => {
    if (b) return currying(a + b);
    else return a;
  };
};

const add = currying(3)(5)(7)();

// The reverse() method of Array instances reverses an array in place and returns the reference
// to the same array,
// The sort() method of Array instances sorts the elements of an array in place and returns the reference to the same
//  array, now sorted

// Array.prototype.flat()
// The flat() method of Array instances creates a new array with all sub-array elements concatenated into it
// recursively up to the specified depth.

// flat()
// flat(depth)
// The flat() method removes empty slots in arrays:

const arr5 = [1, 2, , 4, 5];
console.log(arr5.flat()); // [1, 2, 4, 5]

const array34 = [1, , 3, ["a", , "c"]];
console.log(array.flat()); // [ 1, 3, "a", "c" ]

const array2 = [1, , 3, ["a", , ["d", , "e"]]];
console.log(array2.flat()); // [ 1, 3, "a", ["d", empty, "e"] ]
console.log(array2.flat(2)); // [ 1, 3, "a", "d", "e"]

const myFlat = (arr, depth) => {
  let flatArr = [];
  for (let val of arr) {
    if (Array.isArray(val) && depth)
      flatArr = flatArr.concat(myFlat(val, depth--));
    else {
      flatArr.push(val);
    }
  }
  return flatArr;
};

console.log(myFlat([1, 2, [4, 5, [7, 9, [9, 10]]]], 1));

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    var flattendArray = [];
    (function flatten(arr, depth) {
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && depth > 0) {
          flatten(arr[i], depth - 1);
        } else {
          flattendArray.push(arr[i]);
        }
      }
    })(this, depth === undefined ? 1 : depth);
    return flattendArray;
  };
}

// calc().add(10).subtract(5).multiply(20).divide(2).getResult()

function calc() {
  this.result = 0;
}

calc.prototype.add = function (num) {
  this.result = this.result + num;
  return this;
};
calc.prototype.subtract = function (num) {
  this.result = this.result - num;
  return this;
};
calc.prototype.multiply = function (num) {
  this.result = this.result * num;
  return this;
};
calc.prototype.divide = function (num) {
  this.result = this.result / num;
  return this;
};
calc.prototype.getResult = function () {
  return this.result;
};

console.log(new calc().add(10).subtract(5).multiply(10).divide(2).getResult());

function calc1() {
  let result = 0;

  return {
    add: function (num) {
      result += num;
      return this;
    },
    subtract: function (num) {
      result -= num;
      return this;
    },
    multiply: function (num) {
      result *= num;
      return this;
    },
    divide: function (num) {
      if (num !== 0) {
        result /= num;
      } else {
        throw new Error("Division by zero is not allowed.");
      }
      return this;
    },
    getResult: function () {
      return result;
    },
  };
}

Array.prototype.myNew2Reduce = function (func, intialValue) {
  if (this == null)
    return new TypeError("Can not be called on null or undefined");
  let accumalor = intialValue;
  console.log(this);
  for (let i = 0; i < this.length; i++) {
    if (accumalor !== undefined) {
      accumalor = func(accumalor, this[i], i, this);
    } else {
      accumalor = this[i];
    }
  }

  if (accumalor === undefined)
    return new TypeError(
      "reduce can not be called on empty array without intial value"
    );
  return accumalor;
};

console.log([2, 3, 5].myNew2Reduce((acc, item) => acc + item));

Array.prototype.myNewMap = function (func, thisArg) {
  if (this == null) return new TypeError("Can not be called on null");
  if (typeof func !== "function")
    return new TypeError("First argument should be callback should be ca");
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(func.call(thisArg, this[i], i, this));
  }

  return res;
};

console.log([2, 3, 4, 6].myNewMap((item) => item * 2));
