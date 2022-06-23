import React from "react";

import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

import styled from "@emotion/styled";
import { Dropdown, Menu, Button } from "antd";
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
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true} marginBottom={1}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
          {/* <HeaderItem as={'div'}>another</HeaderItem> */}
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button onClick={logout} type={"link"}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            {/* e.preventDefault() 防止页面重新刷新 */}
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

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

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

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
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
