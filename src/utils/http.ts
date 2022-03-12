import qs from 'qs'

import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?:string,
  data?:object
}

// customConfig 应作为可选参数存在，{data, token, headers, ...customConfig}?:Config，前面解构，后面再加 ? 是不被允许的，但是可以给参数加默认值 {}，自动变为可选
export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` :  '',
      'Content-Type': data ? 'application/json' : '', 
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config)
  .then(async response => {
    // 401 unAuthorized，未登录/token 失效的情况下，服务端返回 401 的状态，是标准的 restful 规范。也就是说用 http status 来标识 服务端现在的状态
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      // 为捕获服务端返回的异常，需要 在response.ok 为 false 的时候，手动抛出异常（原因：当服务端返回 401/500 或者其他失败状态时，fetch api 的 catch 都不会抛出异常）
      return Promise.reject(data)
    }
  } )
}
// JS 中的 typeof：return typeof 1 = 'number' 是在 runtime 时运行的
// TS 中的 typeof：是在静态环境运行的，是用来操作类型的（typeof 并不会参与运行，因为 ts 最终是要被编译成 js 的，而被编译成的 js 是不包含任何的类型信息的）
// TS 中的 typeof 作用：是用来在其后边传一个变量，将变量的类型提取出来

// 如果你的函数里要使用其他的 hook 的话，那么你的函数本身就必须是一个 hook
export const useHttp = () => {
  const { user } = useAuth()
  // TS 中的 Utility Types：充当工具类型（用法：用泛型给它传入一个其他类型，然后 Utility type 对这个类型进行某种操作）
  return ([endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
  // ...[endpoint, config]  这样的写法可以将 tuple 中的两项解放出来，这样在使用的时候，传参方式就不必按照 [] 的形式
  // return (...[endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token })
}