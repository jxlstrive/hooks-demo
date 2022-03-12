import qs from 'qs'
import * as auth from 'auth-provider'

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?:string,
  data?:object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}:Config) => {
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