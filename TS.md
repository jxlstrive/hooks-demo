<br />

#### 1. 为什么我们需要 TS/真实场景中 TS 的必要性

---

- 日常开发中：比如写了一个错别字/少传参数/多传参数/参数拼写错误

- 什么时候出现错误、错误在哪里，具体是什么？
  使用 JS(弱类型语言)，大部分的错误都是在 runtime (运行时)的时候发现的，之后在代码中寻找且解决问题
  希望在静态代码(无需运行项目)中，就能找到其中的一些错误 ——> 强类型(TS)

#### JS 改造成 TS（增强类型 减少 bug）:

> - 文件扩展名：jsx -> tsx；js -> ts
> - 不允许引入为 undefined 的内容
> - 如果没有给传入的参数做类型定义，ts 会默认给一个 any 类型。value: any，any 类型相当于在使用 js
> - qs 依赖缺失 ts 的声明：yarn add @types/qs -D d.ts 是给 js 打补丁用的。 一般开源库会用到
> - 声明的组件需要定义类型（即：组件说明书，用来说明如何使用该组件/函数/变量）interface
> - lib.dom.d.ts 文件 是纯粹的说明书部分，里边全是定义的类型。typescript 自带的 lib.dom.d.ts，用来规定原来所有 javascript 中 dom 的类型（即：可查看所有的 dom 的 typescript 的定义 ）

#### 2. TS 知识梳理/总结

---

#### _TypeScript vs JavaScript_

`TypeScript` 是 "强类型" 版的 JavaScript，代码中定义变量(包括普通变量、函数、组件、hook 等)的时候，TypeScript 允许我们在定义的同时指定其类型，这样使用者在使用不当的时候就会被及时报错提醒

```jsx
interface SearchPanelProps {
  users: User[];
  param: {
    name: string,
    personId: string,
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {};
```

经常用 TypeScript 的感受：比起原来的 JavaScript，TypeScript 带来了完全不一样的开发体验，bug 大大减少了，编辑器提示快了，代码更易读了， 开发速度快了(看似多写代码，其实由于前面几点节省了大量开发时间)，上手了就回不去了

#### TypeScript 的类型

使用到了 8 种类型： number, string, boolean, 函数, array, any, void, object

在平常使用中会接触到的大部分的类型，下面我们挨个梳理一遍：

### 1. number

数字类型，包含小数、其他进制的数字：

```jsx
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

### 2. string

字符串

```jsx
let color: string = "blue";
```

### 3. array

在 TS 中，array 一般指**所有元素类型相同**的值的集合，比如：

```jsx
let list: Array<number> = [1, 2, 3];

// or

interface User {
  name: string;
}
const john = { name: "john" };
const jack = { name: "jack" };
let personList = [john, jack]; // 这里 john 和 jack 都是 User 类型的
```

和这种混合类型的 "数组"：

```jsx
let l = ["jack", 10];
```

在 TS 中不是 数组/array，它们叫作 tuple，下面会提到

### 4. boolean

布尔值

```jsx
let isDone: boolean = false;
```

### 5. 函数

两种方法

1. 在我们熟悉的 "JS 函数" 上直接声明参数和返回值：

```jsx
/**
 * 在箭头前边加上了 :boolean
 * 不需要特意加是因为 类型推断
 * @param value
 */
const isFalsy = (value: any): boolean => {
  return value === 0 ? true : !value;
};
```

2. 直接声明你想要的函数类型：

```jsx
/**
 * useMount 和 isFalsy
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

const isFalsy: (value: any) => boolean = (value) => {
  return value === 0 ? true : !value;
};
```

### 6. any

any 表示这个值可以是任何值，被定义为 any 就意味着不做任何类型检查，尽量避免使用 any 例：(looselyTyped 的值没有该方法，但由于声明为 any， 没法在静态检查阶段发现这个错误)

```jsx
let looselyTyped: any = 4;
// looselyTyped 的值明明是个4，哪里来的 ifItExists 方法呢？
// 由于声明为any，我们没法在静态检查阶段发现这个错误
looselyTyped.ifItExists();
```

为了让 TS 不再报错用了很多 any，这样做会失去 TS 的保护。应该尽量避免使用 any

### 7. void

绝大部分情况下，只会用在这一个地方：表示函数不返回任何值或者返回 undefined (因为函数不返回任何值的时候 === 返回 undefined)

```jsx
/**
 * useMount
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};
```

### 8. object

除了 number, string, boolean, bigint, symbol, null, or undefined，其他都是 object

没接触到的 TS 类型：

### 9. tuple

这就是一个典型的 tuple

```jsx
const [users, setUsers] = useState([]);
```

tuple 是 "数量固定，类型可以各异" 版的数组

在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy → tomIsHappy 以及其他名字的变化，这里使用 tuple 的好处就显现出来了：便于使用者重命名

```jsx
const useHappy = () => {
  //....
  //  return { isHappy }
  return [isHappy, makeHappy, makeUnHappy];
};

const SomeComponent = () => {
  // const { isHappy: tomIsHappy } = useHappy()
  // 使用者很容易通过解构赋值来命名自己想要的变量
  const [tomIsHappy, makeTomHappy, makeTomUnHappy] = useHappy(false);
  // ...
};
```

### 10. enum 枚举（有点类似在 js 中 使用对象）

```jsx
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

### 11. null 和 undefined

null 和 undefined 在 TypeScript 中既是一个值，也是一个类型：

```jsx
let u: undefined = undefined;
let n: null = null;
```

### 12. unknown

unknown 表示这个值可以是任何值。 unknown 可以起到 any 的一切作用，但是在使用上比 any 的限制更多

❓❓❓❓❓❓

这句话怎么这么熟悉，刚才是不是用来形容 any 的？

unknown 的用法：在你想用 any 的时候，用 unknown 来代替，简单来说，unknown 是一个"严格"版的 any。
注：(value 可能是任何值，大意调用这个属性，且不确定有没有这个值。理论上来说是有问题的，期待报错，及时提醒我们。但由于给了 any 类型，所以不做任何检查 ———— value: unknown)

unknown 可以给它本身赋任何值，但是 unknown 不可以把它赋值给任何值，也不能从 unknown 身上读取任何方法

```jsx
const isFalsy = (value: unknown) => {
  // 不用考虑这段 console 有啥意义，把它打在你的代码里对应的位置，观察编辑器会不会报错；
  // 再思考它应不应该报错
  console.log(value.mayNotExist);
  return value === 0 ? true : !!value;
};
```

### 13. never

```jsx
// 这个 func 返回的就是never类型，用到比较少，在类型操作等场景会用到
const func = () => {
  throw new Error();
};
```

### interface

interface 不是一种类型，应该被翻译成 接口，或者说使用上面介绍的类型，创建一个我们自己的类型

```jsx
interface User {
  id: number;
}
// 把 User 当做类型 给 u 做一个限制
const u: User = { id: 1 };
```

### 啥时候需要声明类型

理论上来说在我们声明任何变量的时候都需要声明类型(包括普通变量、函数、组件、hook 等等)，声明 函数、组件、hook 等需要声明参数 和 返回值的类型。

注：在调用变量、函数、组件、hook 不需要声明类型。就像假设造微波炉，那么需要附上说明书，但使用微波炉的人不需要再写一遍说明书

但是在很多情况下，TS 可以帮我们自动推断，我们就不用声明了，比如：

```jsx
// 这里虽然没有显式声明，但是ts自动推断这是个number
let a = 1;

// 自动推断返回值为number
function add(a: number, b: number) {
  return a + b;
}

// 自动推断返回值为boolean
const isFalsy = (value: unknown) => {
  return value === 0 ? true : !!value;
};
```

在调用变量/组件/函数

## .d.ts

JS 文件 + .d.ts 文件 === ts 文件 .d.ts 文件可以让 JS 文件 继续维持自己 JS 文件的身份，而且拥有 TS 的类型保护（开源库：写类 js 的人和声明类型的人有可能不是同一波人）

一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到 .d.ts 文件

#### 3. 学习泛型 用泛型增强类型灵活性（传入的是什么类型，返回的就是什么类型）

---

#### 给 useDebounce 添加泛型

``` jsx    
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

- function useState 是使用时 useState 的函数签名
- initialState 是传入的默认值 useState({})，也就是例子中的对象
- 数组表示返回返回值（出口），对应的是 [param, setParam]
- <S> 是泛型
- useState 使用泛型的原因：在 useState 类型被定义的时候，是没法知道什么类型将要被传入进来
- useState 必须要关心传入进来的是什么类型，要达成效果：不管传入什么默认值，它都能检测出该值的类型。
- 然后在 返回的 tuple 中的第一个值，和这个类型保持一致


<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
解析：
1. <大写字母 State 的首字母> ；
2. initialState 并不知道是什么类型，它就是 S 类型；initialState 和 S 绑定在一起；
3. 在 返回的 tuple 中的第一个值也是 S；
4. <S>、initialState：S、[S] 三个 S 绑定在一起
5. 当我们在使用 useState 时，useState({ name: "" , personId: ""}) 传入的默认值（类型）就相当于
   interface T {
     name: string;
     personId: string;
   }
  也就是 <S>，不再是一个没有意义的占位符，而是有了一个确切的值，相对应的，返回值也就有类型了

```

总结定义：在函数名字的后面加 泛型占位符<大写字母>; 占位符、传入参数、返回类型 三者绑定；在使用 useState 时，S 的类型确定，对应的返回的类型也就 ok 了 

箭头函数中 `const a = <>() => {}`
普通函数中 `function a<>() {}`

```jsx
interface Person {
readonly name: string; // 只读
age: number | string;
sex?: string; // ?: 为可选参数
[propName: string]: any; // 可选任意属性
}
```
