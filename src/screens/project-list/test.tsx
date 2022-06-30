import React, { useEffect, useState } from "react";
import { useMount } from "utils";

// 闭包示例：
const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `num value is message：${num}`;

    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};
// 执行 test 返回 effect 函数
const add = test();
// 执行 effect 函数，返回引用了 message1 的 unmount 函数
const unmount = add();
// 再一次执行 effect 函数，返回引用了 message2 的 unmount 函数
add();
// message 3
add();
// message 4
add();
// message 5
add();
unmount(); // 这里会打印什么呢？按照直觉似乎应该打印 3, 实际上打印了 1。（引用的是 message1, 被定义的时候，值是 1）

// react hook 与 闭包，hook 与 闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log(111, num);
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [num]);

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
