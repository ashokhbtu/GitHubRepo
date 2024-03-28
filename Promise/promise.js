// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Promise resolved after 5 seconds");
//   }, 5000);
// });

// const getPromiseResolve = () => {
//   p.then((val) => console.log(val));
//   console.log("after then");
// };

// getPromiseResolve();
// console.log("After function call");

// with await

// const getPromiseResolve = async () => {
//   const val = await p;
//   console.log("p");
//   console.log("after await ");
// };
// getPromiseResolve();
// console.log("After function call");

// const cachedApiCall = (time) => {
//   let catched = {};
//   return async (url, config = {}) => {
//     const key = `${url}${JSON.stringify(config)}`;
//     const entry = catched[key];
//     if (!entry || Date.now() > entry.expiry) {
//       try {
//         console.log("Inside api call");
//         const res = await fetch(url, config);
//         const result = await res.json();
//         catched[key] = {
//           result,
//           expiry: Date.now() + time,
//         };
//         console.log(catched[key]);
//       } catch {
//         console.log("This api has failed");
//       }
//     }
//     return catched[key].result;
//   };
// };

// const call = cachedApiCall(2000);

// call("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
//   console.log(res)
// );

// setTimeout(() => {
//   call("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
//     console.log(res)
//   );
// }, 1000);

// console.log("Before");
// const newPromise = new Promise((resolve, reject) => {
//   console.log("Inside Promise");
//   setTimeout(() => {
//     resolve("test");
//   });
// });
// console.log(newPromise);
// newPromise.then((val) => console.log("val", val));
// console.log("Last");

const newPromise2 = new Promise((resolve, reject) => {
  reject(new Error("This is a error"));
});

newPromise2
  .then(
    (val) => console.log(val),
    (error) => console.log(error, "inside then")
  )
  .catch((error) => console.log("Inside catch", error));

//   Promise API
// There are 6 static methods in the Promise class
// Promise.all takes an iterable (usually, an array of promises) and returns a new promise.

// The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

// For instance, the Promise.all below settles after 3 seconds, and then its result is an array [1, 2, 3]:

// Promise.all([
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
// ]).then((res) => console.log(res)); // [1,2,3]

// Please note that the order of the resulting array members is the same as in its source promises.
//  Even though the first promise takes the longest time to resolve, it’s still first in the array of
//  results.

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

console.log(requests);
// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) =>
  responses.forEach(
    (response) => console.log("")
    // console.log(`${response.url}: ${response.status}`)
  )
);
// Promise.all([12, 23, 33]).then((res) => console.log(res));

// PolyFill for Promise.all

Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject("Promise.all can not be called on non array");
    }

    const result = [];
    let total = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          result[index] = res;
          total++;
          console.log(result);
          if (total === promises.length) resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

Promise.myAll([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve, reject) => setTimeout(() => reject(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // [1,2,3]

// If one promise rejects, Promise.all immediately rejects, completely forgetting about the other ones in the list.
//  Their results are ignored.

// Promise.allSettled

// Promise.allSettled just waits for all promises to settle, regardless of the result. The resulting array has:

// {status:"fulfilled", value:result} for successful responses,
// {status:"rejected", reason:error} for errors.

Promise.allSettled([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve, reject) => setTimeout(() => reject(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then((res) => console.log(res));

// PolyFill For Promise.allSettled

Promise.myAllSettled = function (promises) {
  var mappedPromises = promises.map(function (promise) {
    return Promise.resolve(promise).then(
      function (value) {
        return { status: "fulfilled", value: value };
      },
      function (reason) {
        return { status: "rejected", reason: reason };
      }
    );
  });

  return Promise.all(mappedPromises);
};

// Promise.race
// Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

// The syntax is:

// let promise = Promise.race(iterable);

// Promise.any
// Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. If all of the given
//  promises are rejected, then the returned promise is rejected with AggregateError – a special error object that stores
//   all promise errors in its errors property.

// PolyFill for Promise. all

Promise.myNewAll = (promiseArray) => {
  return new Promise((resolve, reject) => {
    let result = [];
    for (let i = 0; i < promiseArray.length; i++) {
      promiseArray[i].resolve;
    }
  });
};

Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises))
      reject(new TypeError("Promises should be array of iterable"));
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const result = Promise.myRace([
  new Promise((resolve, reject) => {
    return setTimeout(() => resolve(10), 2000);
  }),
  new Promise((resolve, reject) => {
    return setTimeout(() => reject(20), 1000);
  }),
  new Promise((resolve, reject) => {
    return setTimeout(() => resolve(30), 3000);
  }),
]);

result.then((res) => console.log(res)).catch((err) => console.log(err));

if (!Promise.any) {
  Promise.any = function (promises) {
    return new Promise((resolve, reject) => {
      let errors = [];
      let remainingPromises = promises.length;

      if (remainingPromises === 0) {
        reject(
          new AggregateError("No promises passed to Promise.any()", errors)
        );
        return;
      }

      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((value) => {
            resolve(value);
          })
          .catch((error) => {
            errors.push(error);

            if (--remainingPromises === 0) {
              reject(new AggregateError("All promises were rejected", errors));
            }
          });
      });
    });
  };
}
