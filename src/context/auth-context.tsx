import React, { ReactNode, useState } from "react";

import { useMount } from "utils";
import { http } from "utils/http";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
interface AuthForm {
  username: string;
  password: string;
}

/**
 * 需要在页面刷新的时候，能够初始化 user（原因：登录成功，页面刷新之后，变为未登录之前的页面）
 * 取自 localStorage 中的 token，从而获取 user 的信息，找到之后再将其赋值给 setUser
 *
 * @return {*}
 */
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext"; // 主要用在 DevTools 里面

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null)

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // 函数编程里边的 point free 即数学里边的消参（.then(user => setUser(user)) 相当于 .then(setUser)）
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  // 当整个 auth Provider 加载，也就是说整个 app 加载的时候，使用 useMount，调用 bootstrapUser
  useMount(() => {
    // bootstrapUser().then(setUser)
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};
