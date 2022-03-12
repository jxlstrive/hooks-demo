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

\* ~~注~~：节流函数也可以完全不借助 *setTimeout*，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定时间来做判定。也可以直接将 setTimeout 的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行 fn 之后消除定时器表示激活\*


*注*：默认的 json-server 只能模拟标准的 restful 的 api
#### 给 json-server 配置 middleware（利用 json-server 模拟自定义的 api）

添加 middleware.js 用来模拟自定义的 api

```js
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'jack' && req.body.password === '123456') {
      return res.status(200).json({
        user: {
          token: '123'
        }
      })
    } else {
      return res.status(400).json({ message: '用户名或者密码错误' })
    }
  }
  next()
}
```

注：nodejs 应该使用 CommonJS 的规范

登录认证/注册 使用 JWT 的技术

将 middleware 注入到 json-server 中：
```jsx
package.json 中
"json-server": "json-server **json_server_mock**/db.json --watch --port 3001"
改为：
"json-server": "json-server **json_server_mock**/db.json --watch --port 3001 --middleware ./**json_server_mock**/middleware.js"
```

*<u>开发者工具</u>* [**jira-dev-tool**](https://www.npmjs.com/package/jira-dev-tool
)：npx imooc-jira-tool（利用 [`MSW`](https://github.com/mswjs/msw
) 以 [`Service Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API
)：本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器
）为原理实现了“分布式后端”

`*注*：保证工作区没有尚未提交的文件</a>`

运行命令后 public 文件夹中添加了 mockServiceWorker.js 文件（启动分布式服务必须的文件）

引入并使用 jira-dev-tool 后，删除 json-server 相关的文件


`如遇错误：Detected outdated Service Worker: Currently active Service Worker is behind the latest published one. 请运行：npx msw init public`

### **JWT（JSON Web Tokens） 原理与 auth-provider 实现**

### Context

提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好、UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种组件之间共享此类值的方式，而不必显示地通过组件树的逐层传递 props

API： React.createContext   Context.Provider   Class.contextType  Context.Consumer  Context.displayName
