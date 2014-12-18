guarded-array
=============
A slow bounds checked array to help with debugging.

# Example

```javascript
var guard = require('guarded-array')

//First create any old array
var array = [ 0, 1, 2, 3, 4, 5 ]

//Then we protect it using guard!
var guardedArray = guard(array)

//The guarded array works just like a normal array:
console.log(guardedArray.length, guardedArray.slice())

//Accessing elements in the middle of array is ok
guardedArray[3] = 100

//Writes propagate to underlying array
console.log(array)

//But reading out of bounds throws an exception
try {
  console.log(guardedArray[-1])
} catch(e) {
  console.log(e)
}

try {
  console.log(guardedArray[10])
} catch(e) {
  console.log(e)
}

//You can also create guarded arrays for subarrays of arrays
var subGuard = guard(array, 1, 3)

//Now you can only access elements in the range 1-3 of array safely
console.log(subGuard[1], subGuard[2])

//Writing/reading out of bounds throws an exception
console.log(subGuard[3])

//Use this module in your unit tests to help track down
//pesky off-by-one errors
```

#### Output:

```
6 [ 0, 1, 2, 3, 4, 5 ]
[ 0, 1, 2, 100, 4, 5 ]
[Error: read out of bounds: -1]
[Error: read out of bounds: 10]
1 2

Error: read out of bounds: 3
    at Array.get [as 3] (/Users/mikolalysenko/GitHub/guarded-array/guarded-array.js:39:15)
    at Object.<anonymous> (/Users/mikolalysenko/GitHub/guarded-array/example/example.js:38:21)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:902:3
```

# Install

```sh
npm install guarded-array
```

# API

## `require('guarded-array')(array[,lo, hi])`
Creates a guarded view of `array`.  Attempting to access outside of the bounds `[lo,hi)` or changing the length of the array will result in an exception.

* `array` is an ordinary JavaScript array
* `lo` is an optional lower bound (default `0`)
* `hi` is an optional upper bound (default `array.length`)

**Returns** A guarded view of the array object.  Writes to the guarded array propagate down to the underlying array object.  Out of bounds access will trigger an exception.

#### Notes/Warnings

`Array.isArray` doesn't work on `guarded-array`.  I'm open to suggestions on how to get this to work.

# Credits
(c) 2014 Mikola Lysenko. MIT License