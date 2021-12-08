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