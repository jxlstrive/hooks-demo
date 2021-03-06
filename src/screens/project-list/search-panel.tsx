import React, { useState, useEffect } from "react"

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

// 希望对函数每一个形参都要规定类型
interface SearchPanelProps {
  users: User[],  // users 代表 User 类型的数组
  param: {
    name: string;
    personId: string;
  },
  setParam: (param: SearchPanelProps['param']) => void;   //  void 代表什么都不返回
}


export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {
  
  return <form>
    <div>
      {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
      <input
        type="text"
        value={param.name}
        onChange={evt => setParam({
          ...param,  // rest 解构赋值
          name: evt.target.value
        })}
      />
      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value={""}>负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}