import { useEffect, useState } from "react"

// 假设 value 为 0 时
// 如果没有给传入的参数做类型定义，ts 会默认给一个 any 类型。value: any，any 类型相当于在使用 js。
// 在 ts 中时 滥用 any 是有害的，谨慎使用 any 类型 
export const isFalsy = (value: unknown) => value === 0 ? false : !value

// isFalsy(1)
// isFalsy({})
// isFalsy(undefined)

// 在一个函数里，改变一个传入的对象本身是不好的
export const cleanObject = (object: {[key: string]: unknown}) => {
  // Object.assign({}, object)
  if (!object) {
    return {}
  }
  const result = {...object}
  Object.keys(result).forEach(key => {
    // @ts-ignore  错误涉及到 ts 泛型，暂不处理
    const value = result[key]
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key]
    }
  })
  return result
}

// void 函数不返回任何值
export const useMount = (callback: () => void) => {
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

// ? 选传
export const useDebounce = <V>(value:V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // 每次在 value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    // 每次在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}

// 理想的情况下：value 是什么类型，返回的就是什么类型  ----- 泛型来规范类型

// initialArray 的类型是 T 的数组，也就是说 T 就代表里边每一项的类型（TS 中的数组每一项类型都是一样）
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)  // 去 index 的地方删除一个项目
      setValue(copy)
    } 
  }
}
