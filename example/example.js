var guard = require('../guarded-array')

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