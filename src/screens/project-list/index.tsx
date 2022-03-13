import React, { useState, useEffect } from 'react'

import * as qs from 'qs'

import { useHttp } from 'utils/http'
import { cleanObject, useDebounce, useMount } from 'utils/index'

import { List } from "./list"
import { SearchPanel } from "./search-panel"

// 使用 JS，大部分的错误都是在 runtime（运行时） 的时候发现的
// 希望在静态代码中，就能找到其中的一些错误 -> 强类型 typeScript
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  // 使用 泛型后 debounceParam 和 param 类型保持一致
  const debounceParam = useDebounce(param, 200)
  const [list, setList] = useState([])
  const client = useHttp()

  // 声明一个变量为 unknown 类型，可以给它赋任何值，但是不可以把 unknown 赋给任何值，也不能从 unknown 身上读取任何的方法
  // let value:unknown
  // value = undefined
  // value = []

  // let valueNumber = 1
  // valueNumber = value

  // value.func

  useEffect(() => {
    // client(['projects', {data: cleanObject(debounceParam)}])
    client('projects', {data: cleanObject(debounceParam)}).then(setList)
    // fetch 返回一个 promise；then 里边是一个异步函数
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response: Response) => {
    //   if (response.ok) {
    //     setList(await response.json())
    //   }
    //   // else {
    //   //   // 当服务端返回 401/500 或者其他失败状态时，会触发错误
    //   //   alert('error happen in response')
    //   // }
    // })
    // 当服务端返回 401/500 或者其他失败状态时，fetch api 都不会抛出异常，只有在断网/网络连接失败时，会抛出异常
    // .catch(() => alert('error happen'))
  }, [debounceParam])

  useMount(() => {
    client('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async (response: Response) => {
    //   if (response.ok) {
    //     setUsers(await response.json())
    //   }
    // })
  })
 
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}