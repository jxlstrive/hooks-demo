# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

npx 使用教程：http://www.ruanyifeng.com/blog/2019/02/npx.html
json-sever: https://github.com/typicode/json-server
react 最佳实践文档：https://www.notion.so/React-491ad0643476437cafde50bee4dde6ed
TS 中文手册：https://typescript.bootcss.com/basic-types.html
## Create
node 版本  12.14.0

项目创建
npx react-create-app jira --template typescript

依赖：统一格式化代码（自动格式化代码：Pre-commit Hook）
yarn add --dev --exact prettier

创建格式化代码文件：
echo {}> .prettierrc.json
创建不需要格式化的文件：
.prettierignore  具体内容： build  coverage

手动格式化代码命令：
yarn prettier --write .

代码提交之前自动进行格式化：
npx mrm lint-staged

husky 是方便管理 git hook 的工具
在 commit 之前运行 lint-staged 可格式化代码

package.json文件中添加了:
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

eslint 和 prettier 一起使用会有冲突（解决）：
yarn add eslint-config-prettier -D

在 package.json  eslintConfig 配置中添加 prettier 这样就可以保证 eslint 和 prettier 互相正常工作 用 prettier 替换掉一部分的规则
"eslintConfig": {
  "extends": [
  "react-app",
  "react-app/jest",
  "prettier"
  ]
}

规范 commit message
commitlint 工具 检查 commit message 是否符合规范
安装依赖：yarn add @commitlint/{config-conventional,cli}

运行命令：echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

在 package.json hooks 中添加 "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
"husky": {  
 "hooks": {
  "pre-commit": "lint-staged"
  }
}

@commitlint/config-conventional 规则：[
'build',
'chore',
'ci',
'docs',
'feat',
'fix',
'perf',
'refactor',
'revert',
'style',
'test'
];

常见 Mock 方案
1. 代码入侵（直接在代码中写死 Mock 数据，或者请求本地的 JSON 文件）
   优点：无
   缺点：和其他方案比 Mock 效果不好；与真实 Server 环境的切换非常麻烦，一切需要侵入代码切换环境的行为都是不好的
2. 请求拦截 Mock.js  // 原理：重写 XMLHttpRequest 的一些属性，帮助返回一些想要的数据
   优点：与前端代码分离；可生成随机数据
   缺点：数据都是动态生成的假数据，无法真实模拟增删改查的情况；只支持 ajax，不支持 fetch
3. 接口管理工具：rap(阿里出品)/swagger/moco/yapi(去哪儿出品)
   优点：配置功能强大，接口管理与 Mock 一体，后端修改接口 Mock 也跟着更改，可靠
   缺点：配置复杂，依赖后端，可能会出现后端不愿意出手，或者等配置完了，接口也开发出来了的情况；一般会作为大团队的基础建设而存在，额没有这个条件的话慎重考虑
4. 本地 node 服务器 代表：json-server
   优点：配置简单，json-server 甚至可以 0 代码 30 秒启动一个 REST API Server；自定义程度高，一切尽在掌控中；增删改查真实模拟
   缺点：与接口管理工具相比，无法随着后端 API 的修改而自动修改

REST API: URI 代表 资源/对象，METHOD 代表行为

GET /tickets  // 列表
GET /tickets/12  // 详情
POST /tickets  // 增加
PUT /tickets/12  // 替换
PATCH /tickets/12  // 修改
DELETE /tickets/12  // 删除

全局安装 json-server
npm i json-server -g

添加 db.json 文件
{"users": []}

启动 json-server: json-server --watch db.json

Resources: http://localhost:3000/users

postman GET 获取数据：
复制上面链接地址至 postman GET 请求 点击发送 得到 []

postman POST 添加数据：
请求方法：POST
请求地址：http://localhost:3000/users
点击 Body  row  选择 JSON
写入：{"name": "Jack"}  点击 Send
返回结果：{"name": "Jack", "id": 1}
返回 db.json 页面，该页面自动添加了以上内容

postman 中把 POST 请求改为 GET，得到的结果同 db.json 中的数据一致

postman 修改：
请求方法为：PATCH
请求地址为：http://localhost:3000/users/1 
请求内容为：{"name": "Rose"} 点击 Send

返回结果：db.json 文件中数据也显示为最新修改的数据 name: Rose

postman 删除：
请求方法：DELETE
请求地址为：http://localhost:3000/users/1
返回 bd.json 页面 数据为：{"users":[]}

安装 json-server 至项目中
yarn add json-server -D

新建文件夹：__json_server_mock__
在 __json_server_mock__ 文件夹中新建文件 db.json

删掉外层 db.json 文件

在 package.json 文件 scripts 中添加 "json-server": "json-server __json_server_mock__/db.json --watch"
可运行命令：npm run json-server

React 列表数据获取与渲染-工程列表

参数转义：
decodeURIComponent('%E9%AA%91%E6%89%8B%E7%AE%A1%E7%90%86'
')  // 反转义 "骑手管理"
encodeURIComponent('骑手管理')  // 转义 '%E9%AA%91%E6%89%8B%E7%AE%A1%E7%90%86'

encodeURI: 转义整个 URI

数据分享问题：状态提升、组件组合、数据传递


想要使用 fetch 实时获取接口数据须具备两个条件：运行 npm start 命令 启动项目 + npm run json-server 启动 json-server  服务

webpack 命令 Module build failed(from ./node_modules/babel-loader/lib/index.js)错误问题解决方案：
控制台输入 npm install @babel/core @babel/preset-env 命令

用 Custom Hook  提取并复用组件代码。（useMount  useDebounce） 像函数一样提取组件逻辑
注意：use 开头的 hook。不管字自定义的 hook 还是官方自带的 hook 不可以在普通函数中运行。只能组件中/其他hook 中运行

debounce：处理快速的事件。监听鼠标/改变窗口/keyboard/判断 scroll 是否滑到底部/给按钮加函数防抖防止表单多次提交（适合多次事件一次响应的情况）

1. undefined --> 设置定时器-->拿到了定时器的句柄
2. 定时器句柄 --> clearTimeout --> 赋值为自己的 timeout
3. timeout --> clearTimeout  -->  赋值为自己的 timeout

连续执行，最后都这会剩一个 timeout

最后一个 log() 等 5s 之后 才会执行

throttle：DOM 元素拖拽/Canvas/画笔功能/游戏中的刷新率/onmousemove/resize/onscroll 等事件（适合大量事件按时间做平均分配触发）

function throttle(func, wait) {
  var timer;
  return function() {
    var context = this; // 注意 this 指向
    var args = arguments; // arguments 中存着 event 
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, wait)
    }
  }
}
// 使用方式如下：
content.onmousemove = throttle(count, 1000)

首先，在执行 throttle(count, 1000)这行代码的时候，会有一个返回值，这个返回值是一个新的匿名函数，因此 content.onmousemove = throttle(count, 1000) 具体理解如下：

content.onmousemove = function() {
  var content = this
  var args = arguments
  // var args = Array.prototype.slice.call(arguments, 1); // 这样可以去掉 arguments 中的 event 
  
  console.log('this', this) // 输出 contentDOM 元素
  console.log('arguments', arguments); // 输出带有 event 的数组

  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      func.apply(content, args)
    }, wait)
  }
}

其次，当触发 onmousemove 事件的时候，才真正执行了上述的匿名函数，即content.onmousemove().此时，上述的匿名函数的执行是通过对象.函数名() 来完成的，那么函数内部的 this 自然指向对象 content.

最后，匿名函数内部的 func 的调用方式如果是最普通的直接执行 func()，那么func 内部的 this 必然指向 window, 这将回事一个隐藏的 bug。所以，通过匿名函数捕获 this, 然后通过 func.apply()的方式修改 this 指向。

函数节流的最佳时间间隔：

  例：在 DOM 元素拖拽或页面滚动时，1s 太慢，很影响用户体验，但是如果时间间隔太短又失去了节流的意义。

  var num = 1;
  var content = document.getElementById('content')
  var lastDate = new Date().getTime()

  function count() {
    content.innerHTML = num++;

    var nowDate = new Date().getTime();
    // 输出两次相隔执行时间差
    console.log(nowDate - lastDate)
    lastDate = nowDate
  }

  window.onscroll = throttle(count, 10)

// 注：把节流时间间隔设置为 10ms， 按道理输出的时间间隔最小的应该有 10 的。但是实现输出基本上都是不小于 16.而鼠标移动事件的触发时间间隔却很小。（显示器刷新频率：一般显示器的刷新频率是 60Hz。这个 60Hz 的意思是 1s 内显示器画面刷新的频率。也就可以计算出 60Hz 的显示器每次刷新的时间间隔是 1000/60 约等于 16）。
所以 滚动事件时，函数执行的间隔最小值取决于显示器的刷新频率。大部分显示器的刷新频率都是 60Hz，所以一般最小时间间隔为 16ms。一些玩游戏的人显示器可能会要求高一些，刷新频率也就高一些；鼠标移动事件，触发事件间隔即使小于 16ms，但是用户看到的最快也只会是 16ms。会造成部分计算的浪费。所以函数节流的最佳时间间隔应该设置为 16ms。如果是执行的计算量过大，明显影响性能，也可以适当调大。具体以不影响用户体验为标准，建议不要大于 30ms。

throttle：https://segmentfault.com/a/1190000018428170

设计一种类似控制阀门一样定期开放的函数，也就是让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活（类似于技能冷却时间）

效果：如果短时间内大量触发同一事件，那么在函数执行一次后，该函数在指定的时间限期内不再工作，直至过了这段时间才重新生效。

function throttle(fn, delay) {
  let valid = true
  return function () {
    if (!valid) {
      // 休息时间
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  }
}

function showTop() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log('滚动条位置:' + scrollTop)
}
window.onscroll = throttle(showTop, 1000)

运行结果：如果一直拖着滚动条进行滚动，那么会以 1s 的时间间隔，持续输出当前位置和顶部的距离

// 注：节流函数也可以完全不借助 setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定时间来做判定。也可以直接将 setTimeout 的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行 fn 之后消除定时器表示激活


Typescript
lib.dom.d.ts 文件 是纯粹的说明书部分，里边全是定义的类型。typescript 自带的 lib.dom.d.ts，用来规定原来所有 javascript 中 dom 的类型（即：可查看所有的 dom 的 typescript 的定义 ）

qs 依赖缺失 ts 的声明：yarn add @types/qs -D
d.ts 是给 js 打补丁用的  一般开源库会用到
