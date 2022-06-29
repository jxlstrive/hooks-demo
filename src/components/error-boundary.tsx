import React, { ReactNode } from "react";

/**
 * 错误边界的实现是一定要用 class component 来实现的
 *
 * 具体释义：如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch()
 * 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。
 * 当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI,
 * 使用 componentDidCatch() 打印错误信息
 *
 *
 * children  // ReactNode
 * fallbackRender  // 异常发生时，渲染的提示
 *
 */

// 类型别名
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
// export class ErrorBoundary extends React.Component<{children:ReactNode, fallbackRender: FallbackRender}, any> {}
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
