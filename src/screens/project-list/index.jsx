import React, { useState, useEffect } from 'react'

import * as qs from 'qs'

import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounce, useMount } from 'utils/index'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    person: ''
  })
  const debounceParam = useDebounce(param, 2000)
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
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List users={users} list={list} />
  </div>
}