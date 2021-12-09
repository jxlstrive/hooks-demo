import { useEffect, useState } from "react"

// 假设 value 为 0 时
export const isFalsy = (value) => value === 0 ? false : !value

// 在一个函数里，改变一个传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object)
  if (!object) {
    return {}
  }
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

// 防抖 
// export const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function() {
//       func(...param)
//     }, delay)
//   }
// }
// const log = debounce(() => console.log('call'), 5000)

// log()
// log()
// log()

// debounce 原理讲解：  闭包
// 0s  --------->  1s -------------> 2s   ---------->  ...
//     这三个函数都是同步操作，所以他们都是在 0~1s 这个时间段内瞬间完成的；
//     log() #1 // timeout#1     （undefined --> 设置定时器-->拿到了定时器的句柄）
//     log() #2 // 发现 timeout#1 取消之，然后设置 timeout#2     （定时器句柄 --> clearTimeout --> 赋值为自己的 timeout）
//     log() #3 // 发现 timeout#2 取消之，然后设置 timeout#3     （timeout --> clearTimeout  -->  赋值为自己的 timeout）
//              // 所以 log()#3 结束后，就剩 timeout#3在独自等待了（连续执行，最后都这会剩一个 timeout 最后一个 log() 等 5s 之后 才会执行）

export const useDebounce = (value, delay ) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // 每次在 value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    // 每次在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
