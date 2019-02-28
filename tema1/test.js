// function minus (...a) {
//   if (arguments.length === 2) {
//     return 5
//   } else {
//     return function funct (x) {
//       return 5
//     }
//   }
// }

function minus (a, b) {
  if (typeof b !== 'undefined') {
    return a - b
  } else {
    return function f (x) {
      return a - x
    }
  }
}

console.log(minus(10, 5))
console.log(minus(10)(5))

function func (a, b, c) {
  console.log(a)
  console.log(b)
  console.log(c)
}

func(1)