import React, { FormEvent } from 'react'
import * as qs from 'qs'

// interface Base {
//   id: number;
// }

// Person 继承 Base 中 id 的属性
// interface Person extends Base {
//   name: string;
// }

// const p: Person = { name: '123', id: 123 }

// 类型兼容  TS 或者 JS 是鸭子类型：面向接口编程 而不是 面向对象编程 
// interface Base {
//   id: number;
// }

// interface Advance extends Base {
//   name: string;
// }

// const test = (p: Base) => {}

// // 假设删掉类型声明，a 和 Advance 有一样的接口（接口一样，类型不一样，在 JAVA 中是有问题的，但在 TS 中是可以的）
// // test 函数不在乎 传入的参数类型是 Base 还是 Advance，只要符合接口中有一个类型为 number 的 id 就行（即：duck typing）
// const a:Advance = {id: 1, name: 'jack'}
// test(a)

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {

  const login = (param: {username: string, password:string}) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    }).then(async response => {
      if (response.ok) {
      }
    })
  }

  // 涉及到类似这种回调函数不确定它的类型时：看一下它的函数签名
  // FormEvent 类型：interface FromEvent<T = Element> extends SyntheticEvents<T> {}
  // extends 继承 SyntheticEvents 
  // 泛型不仅可以被用在函数中，还可以被用在 interface 中，在使用 FormEvent 时，需要指定 T 的类型
  // Element 是默认值，如果不指定 T 默认就是 Element 类型
  // interface HTMLFormElement extends HTMLElement { }
  // interface HTMLElement extends Element
  // 总结：即 HTMLFormElement extends Element, Element 有的属性，HTMLFormElement 都有，HTMLFormElement 有的属性, Element 不一定有
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 阻止表单提交的默认行为
    // event.currentTarget.elements 浏览器自带的 form 标准（包含输入的 username 和 password 信息）
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password }) 
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor='username'>用户名</label>
      <input type="text" id={'username'} />
    </div>
    <div>
      <label htmlFor='password'>密码</label>
      <input type="password" id={'password'} />
    </div>
    <button type={'submit'}>登录</button>
  </form>
}