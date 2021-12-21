[MARKDOWN](https://www.zybuluo.com/mdeditor) \
![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)

### **相关教程**

- [npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)
- [json-sever](https://github.com/typicode/json-server)
- [react 最佳实践文档
  ](https://www.notion.so/React-491ad0643476437cafde50bee4dde6ed)
- [TS 中文手册](https://typescript.bootcss.com/basic-types.html)

### <i class="icon-file"></i>**项目创建**

> 环境：node 版本 12.14.0 \
> 项目：npx react-create-app jira --template typescript \
> 依赖：统一格式化代码（自动格式化代码：Pre-commit Hook）yarn add --dev --exact prettier

_创建格式化代码文件_：echo {}> .prettierrc.json \
_创建不需要格式化的文件_：.prettierignore 具体内容： build coverage \
_手动格式化代码命令_：yarn prettier --write . \
_代码提交之前自动进行格式化_：npx mrm lint-staged \
husky —— 是方便管理 git hook 的工具。在 commit 之前运行 lint-staged 可格式化代码

package.json 文件中添加了:

```js
"devDependencies": {
  "husky": ">=4",
  "lint-staged": ">=10",
  "prettier": "2.1.2"
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.{js,css,md,ts,tsx}": "prettier --write"
}
```

**eslint 和 prettier 一起使用会有冲突（解决）：**
yarn add eslint-config-prettier -D

在 package.json eslintConfig 配置中添加 prettier 这样就可以保证 eslint 和 prettier 互相正常工作 用 prettier 替换掉一部分的规则

```js
"eslintConfig": {
  "extends": [
  "react-app",
  "react-app/jest",
  "prettier"
  ]
}
```

**规范 commit message** \
commitlint 工具 检查 commit message 是否符合规范
安装依赖：yarn add @commitlint/{config-conventional,cli}

_运行命令_：echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

在 package.json hooks 中添加 "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"

```js
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
```

@commitlint/config-conventional 规则：

> [
> 'build',
> 'chore',
> 'ci',
> 'docs',
> 'feat',
> 'fix',
> 'perf',
> 'refactor',
> 'revert',
> 'style',
> 'test'
> ];

#### **常见 Mock 方案**

1. 代码入侵（直接在代码中写死 Mock 数据，或者请求本地的 JSON 文件）
   优点：无
   缺点：和其他方案比 Mock 效果不好；与真实 Server 环境的切换非常麻烦，一切需要侵入代码切换环境的行为都是不好的
2. 请求拦截 Mock.js // 原理：重写 XMLHttpRequest 的一些属性，帮助返回一些想要的数据
   优点：与前端代码分离；可生成随机数据
   缺点：数据都是动态生成的假数据，无法真实模拟增删改查的情况；只支持 ajax，不支持 fetch
3. 接口管理工具：rap(阿里出品)/swagger/moco/yapi(去哪儿出品)
   优点：配置功能强大，接口管理与 Mock 一体，后端修改接口 Mock 也跟着更改，可靠
   缺点：配置复杂，依赖后端，可能会出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况；一般会作为大团队的基础建设而存在，额没有这个条件的话慎重考虑
4. 本地 node 服务器 代表：json-server
   优点：配置简单，json-server 甚至可以 0 代码 30 秒启动一个 REST API Server；自定义程度高，一切尽在掌控中；增删改查真实模拟
   缺点：与接口管理工具相比，无法随着后端 API 的修改而自动修改

#### **REST API**: URI 代表 资源/对象，METHOD 代表行为

> * GET /tickets // 列表
> * GET /tickets/12 // 详情
> * POST /tickets // 增加
> * PUT /tickets/12 // 替换
> * PATCH /tickets/12 // 修改
> * DELETE /tickets/12 // 删除

_使用方法：_

> - 全局安装 json-server 
> - npm i json-server -g 
> - 添加 db.json 文件，内容为：`{"users": []}` 
> - 启动 json-server: json-server --watch db.json 
> - Resources: http://localhost:3000/users

#### **postman GET 获取数据：**

> 复制上面链接地址至 postman GET 请求 点击发送 得到 []

#### **postman POST 添加数据：**

> 请求方法：POST \
> 请求地址：http://localhost:3000/users \
> 点击 Body row 选择 JSON \
> 写入：{"name": "Jack"} 点击 Send \
> 返回结果：{"name": "Jack", "id": 1} \
> 返回 db.json 页面，该页面自动添加了以上内容 \
> postman 中把 POST 请求改为 GET，得到的结果同 db.json 中的数据一致 \

#### **postman 修改：**

> 请求方法为：PATCH \
> 请求地址为：http://localhost:3000/users/1 \
> 请求内容为：{"name": "Rose"} 点击 Send \
> 返回结果：db.json 文件中数据也显示为最新修改的数据 name: Rose

#### **postman 删除：**

> 请求方法：DELETE \
> 请求地址为：http://localhost:3000/users/1 \
> 返回 bd.json 页面 数据为：{"users":[]} \
> 安装 json-server 至项目中 \
> yarn add json-server -D \
> 新建文件夹：**json_server_mock** \
> 在 **json_server_mock** 文件夹中新建文件 db.json \
> 删掉外层 db.json 文件 \
> 在 package.json 文件 scripts 中添加 "json-server": "json-server **json_server_mock**/db.json --watch"
> 可运行命令：npm run json-server

<br />

### **React 列表数据获取与渲染-工程列表**

**参数转义：**

> decodeURIComponent('%E9%AA%91%E6%89%8B%E7%AE%A1%E7%90%86'
> ') // 反转义 "骑手管理" \
> encodeURIComponent('骑手管理') // 转义 '%E9%AA%91%E6%89%8B%E7%AE%A1%E7%90%86' \
> encodeURI：转义整个 URI

<u>_数据分享问题_：状态提升、组件组合、数据传递</u>

想要使用 `fetch` 实时获取接口数据须具备两个条件：运行 npm start 命令 启动项目 + npm run json-server 启动 json-server 服务

<u>_webpack 命令 Module build failed(from ./node_modules/babel-loader/lib/index.js)错误问题解决方案_：</u> 

控制台输入 npm install @babel/core @babel/preset-env 命令

用 `Custom Hook` 提取并复用组件代码。_**（useMount useDebounce）**_ 像函数一样提取组件逻辑

<strong>注意：</strong> use 开头的 hook。不管是自定义的 hook 还是官方自带的 hook 都不可以在普通函数中运行。只能组件中/其他 hook 中运行

**debounce**：处理快速的事件。监听鼠标/改变窗口/keyboard/判断 scroll 是否滑到底部/给按钮加函数防抖防止表单多次提交（适合多次事件一次响应的情况）

- [ ] undefined --> 设置定时器-->拿到了定时器的句柄
- [ ] 定时器句柄 --> clearTimeout --> 赋值为自己的 timeout
- [x] timeout --> clearTimeout --> 赋值为自己的 timeout

例：**连续执行，最后都只会剩一个 timeout，最后一个 log() 等 5s 之后 才会执行**

> **throttle**：DOM 元素拖拽/Canvas/画笔功能/游戏中的刷新率/`onmousemove`/`resize`/`onscroll` 等事件（适合大量事件按时间做平均分配触发）

```js
function throttle(func, wait) {
  var timer;
  return function () {
    var context = this; // 注意 this 指向
    var args = arguments; // arguments 中存着 event
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// 使用方式如下：
content.onmousemove = throttle(count, 1000);
```

_**首先**_，在执行 `throttle(count, 1000) `这行代码的时候，会有一个返回值，这个返回值是一个新的匿名函数，因此 `content.onmousemove = throttle(count, 1000)` 具体理解如下：

```js
content.onmousemove = function () {
  var content = this;
  var args = arguments;
  // var args = Array.prototype.slice.call(arguments, 1); // 这样可以去掉 arguments 中的 event

  console.log("this", this); // 输出 contentDOM 元素
  console.log("arguments", arguments); // 输出带有 event 的数组

  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      func.apply(content, args);
    }, wait);
  }
};
```

_**其次**_，当触发 `onmousemove` 事件的时候，才真正执行了上述的匿名函数，即`content.onmousemove()`.此时，上述的匿名函数的执行是通过对象.函数名() 来完成的，那么函数内部的 `this` 自然指向对象 `content`.

_**最后**_，匿名函数内部的 `func` 的调用方式如果是最普通的直接执行 `func()`，那么 `func` 内部的 `this` 必然指向 `window`, 这将回事一个隐藏的 `bug`。所以，通过匿名函数捕获 `this`, 然后通过 `func.apply()` 的方式修改 `this` 指向。

**`函数节流的最佳时间间隔：`**

例：在 DOM 元素拖拽或页面滚动时，1s 太慢，很影响用户体验，但是如果时间间隔太短又失去了节流的意义。

```js
var num = 1;
var content = document.getElementById("content");
var lastDate = new Date().getTime();

function count() {
  content.innerHTML = num++;

  var nowDate = new Date().getTime();
  // 输出两次相隔执行时间差
  console.log(nowDate - lastDate);
  lastDate = nowDate;
}

window.onscroll = throttle(count, 10);
```

> \* 注：把节流时间间隔设置为 10ms， 按道理输出的时间间隔最小的应该有 10 的。但是实现输出基本上都是不小于 16.而鼠标移动事件的触发时间间隔却很小。（显示器刷新频率：一般显示器的刷新频率是 60Hz。这个 60Hz 的意思是 1s 内显示器画面刷新的频率。也就可以计算出 60Hz 的显示器每次刷新的时间间隔是 1000/60 约等于 16）。\
> 所以 滚动事件时，函数执行的间隔最小值取决于显示器的刷新频率。大部分显示器的刷新频率都是 60Hz，所以一般最小时间间隔为 16ms。一些玩游戏的人显示器可能会要求高一些，刷新频率也就高一些；鼠标移动事件，触发事件间隔即使小于 16ms，但是用户看到的最快也只会是 16ms。会造成部分计算的浪费。所以函数节流的最佳时间间隔应该设置为 16ms。如果是执行的计算量过大，明显影响性能，也可以适当调大。具体以不影响用户体验为标准，建议不要大于 30ms \*

**[throttle](https://segmentfault.com/a/1190000018428170)**：设计一种类似控制阀门一样定期开放的函数，也就是让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活（类似于技能冷却时间）

_`效果`_：如果短时间内大量触发同一事件，那么在函数执行一次后，该函数在指定的时间限期内不再工作，直至过了这段时间才重新生效。

```js
function throttle(fn, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      // 休息时间
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
}

function showTop() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log("滚动条位置:" + scrollTop);
}
window.onscroll = throttle(showTop, 1000);
```

_`运行结果`_：如果一直拖着滚动条进行滚动，那么会以 1s 的时间间隔，持续输出当前位置和顶部的距离

\* 注：节流函数也可以完全不借助 setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定时间来做判定。也可以直接将 setTimeout 的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行 fn 之后消除定时器表示激活\*

**lib.dom.d.ts** 文件 是纯粹的说明书部分，里边全是定义的类型。typescript 自带的 lib.dom.d.ts，用来规定原来所有 javascript 中 dom 的类型（即：可查看所有的 dom 的 typescript 的定义 ）

\*注：qs 依赖缺失 ts 的声明：yarn add @types/qs -D
d.ts 是给 js 打补丁用的 一般开源库会用到\*

# Typescript 基础知识梳理

**定义**：Typescript 是 “强类型” 版的 javascript。当我们在代码中定义变量（包括普通变量、函数、组件、hook 等）的时候，Typescript 允许我们在定义的同时指定其类型，这样使用在在使用不当的时候就会被及时报错提醒

_开发体验：_
<u>bug 大大减少了，编辑器提示快了，代码更易读了，开发速度快了</u>

### **_Typescript_ 的类型:**

| number | string | boolean |
| :----- | :----: | ------: |
| 函数   | array  |     any |
| void   | object |         |

<span style="color: gray">number (数字类型，包括小数、其他进制的数字)
</span> 例：

```js
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: number = 100n;
```

**`string`** 字符串 例：

```js
let color: string = "blue";
```

**`array`** 数组（在 TS 中，array 一般指 所有元素类型相同的值的集合）例：

```js
let list: Array<number> = [1, 2, 3];
// or
interface User {
  name: string;
}
const john = { name: "john" };
const jack = { name: "jack" };
let personList = [john, jack]; // 这里 john 和 jack 都是 User 类型的
```

和这种混合类型的 "~~数组~~":

```js
let l = ["jack", 10];
```

在 TS 中不是数组/array，他们叫做 tuple

**`boolean`** 布尔值

```js
let isDone: boolean = false;
```

**`函数`**（在熟悉的 “js 函数” 上直接声明参数和返回值；直接声明你想要的函数类型）
例：boolean 可加可不加（因为类型推断）

```js
const isFalsy = (value: any): boolean => {
  return value === 0 ? true : !!value;
};

export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

const isFalsy: (value: any) => boolean = (value) => {
  return value === 0 ? true : !!value;
};
```

**`any`** 表示这个值可以是任何值，被定义为 any 就意味着不做任何类型检查，尽量避免使用 any
例：(looselyTyped 的值没有该方法，但由于声明为 any， 没法在静态检查阶段发现这个错误)

```js
let looselyTyped: any = 4;
looselyTyped.ifItExists();
```

**`void`** 绝大部分情况下，只会用在这一个地方：表示函数不返回任何值或者返回 undefined （因为函数不返回任何值的时候 === 返回 undefined）\
**`object`** 除了 number string boolean bigint symbol null or undefined 其它都是 object

<u>没接触到的 TS 类型：</u>

**`tuple`** 例：

```js
const [users, setUser] = useState([]);
```

1. tuple 是 “数量固定，类型可以各异” 版的数组
2. 在 React 中有可能使用 tuple 的地方就是 custom hook 的返回值，注意 isHappy -> tomlsHappy 以及其他名字的变化，这里使用 tuple 的好处就显现出来了：便于使用者重命名

```js
const useHappy = () => {
  // ...
  return { isHappy }
  return [isHappy, makeHappy, makeUnHappy]
}

const SomeComponent = () => {
  const { isHappy: tomIsHappy } = useHappy()
  // 使用者很容易通过解构赋值来命名自己想要的变量
  const [tomsIsHappy, makeTomHappy, makeTomHappy] = useHappy(false)
  // ...
}
```

**enum** 枚举（有点类似 js 中 使用对象）
```js
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```
在语义上比较好，不用也可以

**null 和 undefined**：null 和 undefined 在 Typescript 中既是一个值，也是一个类型：

```js
let u: undefined = undefined;
let n: null = null;
```

**unknown** 表示这个值可以是任何值   unknown 可以起到 any 的一切作用，但是在使用上比 any 的限制更多
*用法*：在你想用 any 的时候，用 unknown 来代替，unknown 是一个“严格”版的 any
(value 可能是任何值，大意调用这个属性，且不确定有没有这个值。理论上来说是有问题的，期待报错，及时提醒我们。但由于给了 any 类型，所以不做任何检查 ———— value: unknown)

```js
const jsFalsy = (value: any) => {
  // 不用考虑这段 console 有啥意义，把它打在你的代码里对应的位置，观察编辑器会不会报错；
  // 在思考它应不应该报错
  console.log(value.mayNotExist)
  return value === 0 ? true : !!value;
}
```

**never**

```js
// func 返回的就是 never 类型，用到比较少，在类型操作等场景会用到
const func = () => {
  throw new Error()
}
```

**interface** 不是一种类型，应该被翻译成 接口，或者说使用上面介绍的类型，创建一个我们自己的类型

```js
interface User {
  id: number
}
// 把 User 当做类型 给 u 做一个限制
let u: User = {id: 1}
```

**啥时候需要声明类型**

在调用变量、函数、组件、hook 不需要声明类型。就像假设造微波炉，那么需要附上说明书，但使用微波炉的人不需要再写一遍说明书

理论上来说，

**.d.ts**
JS 文件 + .d.ts 文件 === ts 文件
.d.ts 文件可以让 JS 文件 继续维持自己 JS 文件的身份，而且拥有 TS 的类型保护（开源库：写类js 的人和声明类型的人有可能不是同一波人）
一般我们写业务代码不会用到，但是点击类型跳转一般会跳转到 .d.ts 文件