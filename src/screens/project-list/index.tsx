import React, { useState, useEffect } from 'react'

import * as qs from 'qs'

import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounce, useMount } from 'utils/index'

// 使用 JS，大部分的错误都是在 runtime（运行时） 的时候发现的
// 希望在静态代码中，就能找到其中的一些错误 -> 强类型 typeScript
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 200)
  const [list, setList] = useState([])

  useEffect(() => {
    // fetch 返回一个 promise；then 里边是一个异步函数
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })
 
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}