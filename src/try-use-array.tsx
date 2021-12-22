import React from "react";

import { useArray, useMount } from 'utils'

/**
 * useArray 数组的管理
 * useMount
*/

// interface P {
//   name: string;
//   age: number;
// }

export const TsReactTest = () => {
  // const persons: P[] = [
  //   {name: "jack", age: 25},
  //   {name: "ma", age: 22}
  // ]
  // persons 是 P 类型的数组

  const persons: { name: string; age: number }[] = [
    {name: "jack", age: 25},
    {name: "ma", age: 22}
  ];
  // useArray 传入了参数 persons 返回了 value/clear/removeIndex/add
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {
    // 泛型：value 的类型和 persons 一致，useArray 会自动识别传进来的默认值的类型，然后返回的 value 和 persons 类型保持一致
    // 期待这里报错: Property 'notExist' does not exist on type '{ name: string; age: number; }[]'
    // console.log(value.notExist);
    
    // 期待这里报错：Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'
    // add({ name: "david" });

    // 期待这里报错：Argument of type 'string' is not assignable to param of type 'number'
    // removeIndex("123");
  });
  return (
    <div>
      {/* 期待：点击以后增加 john */}
      <button onClick={() => add({ name: 'john', age: 22 })}>add john</button>
      {/* 期待：点击以后删除第一项 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 期待：点击以后清空列表 */}
      <button style={{ marginBottom: 50 }} onClick={() => clear()}>clear</button>
      {value.map((person: {age: number, name: string}, index: number) => (
        <div style={{ marginBottom: 30 }}>
          <span style={{ color: 'red' }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  )
}