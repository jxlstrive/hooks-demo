import React from 'react'

import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'

import styled from '@emotion/styled'
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局，还是二维布局（一般来说，一维布局（只涉及到行）用 flex，二维布局（涉及到行和列）用 grid）
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：先有一组内容（数量一般不固定，例如数组遍历/在上边添加新的项目），希望能够均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再把元素往里填充
 * 从内容出发，用 flex，从布局出发，用 grid
 *
*/
export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

// <div>
//   <PageHeader>
//     <button onClick={logout}>登出</button>
//   </PageHeader>
//   <Main>
//     <ProjectListScreen />
//   </Main>
// </div>

// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: gray;
// `;

// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `;


/* grid-template-rows 几行 高度。6rem calc(100vh - 6rem) auto; 等于 6rem 1fr 6rem;  1fr 即剩余高度自适应，就相当于 100vh - 12rem */
/* grid-template-columns 几列。宽度*/
/* grid-template-areas 排列 */
/* grid-gap 每一块之间的距离是多少 加宽 */
const Container = styled.div`
  height: 100vh;
  /* display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer"
  ;
  grid-gap: 10rem; */
`;

// grid-area 用来给 grid 子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``; 
const Main = styled.main`
  grid-area: main;
`;