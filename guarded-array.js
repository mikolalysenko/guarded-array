module.exports = makeGuardedArray

var ArrayProto = [].constructor.prototype

//Make a fake array data type
function Array() {}
Array.prototype.constructor = Array
Object.getOwnPropertyNames(ArrayProto).forEach(function(prop) {
  Array.prototype[prop] = ArrayProto[prop]
})

function makeGuardedArray(array, lo, hi) {
  if(lo === void 0) {
    lo = 0
  }
  if(hi === void 0) {
    hi = array.length
  }

  function makeProp(i) {
    return {
      set: function(v) {
        return array[i] = v
      },
      get: function() {
        return array[i]
      },
      enumerable: true,
      configurable: false
    }
  }

  function makeGuard(i, enumer) {
    return {
      set: function() {
        throw new Error('write out of bounds: ' + i)
      },
      get: function() {
        throw new Error('read out of bounds: ' + i)
      },
      enumerable: enumer,
      configurable: false
    }
  }

  var props = {
    length: {
      get: function() {
        return array.length
      },
      set: function() {
        throw new Error('attempt to resize array')
      },
      enumerable: false,
      configurable: false
    }
  }
  for(var i=-array.length; i<=2*array.length; ++i) {
    if(i < lo || i >= hi) {
      props[i] = makeGuard(i, 0 <= i && i < array.length)
    } else {
      props[i] = makeProp(i)
    }
  }

  var result = new Array()
  Object.defineProperties(result, props)
  return result
}