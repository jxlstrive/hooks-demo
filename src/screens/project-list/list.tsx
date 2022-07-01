import React from "react";

import { Table } from "antd";
import { TableProps } from "antd/es/table";

import { User } from "screens/project-list/search-panel";
import dayjs from "dayjs";

/**
 * react-router 和 react-router-dom 的关系，类似于 react 和 react-dom/react-native/react-vr...
 *
 * react 是一个核心的库，用于 计算 state 等，react-dom 是消费 react 运算出来的结果
 * react-dom 主要是在浏览器的宿主环境里，里边充满了 dom 操作
 * react-native 用于 ios、android 等移动端
 * react-vr 用于 VR 设备
 *
 * react-router 用来管理路由状态，计算出的路由树，由 react-router-dom 消费
 */

import { Link } from "react-router-dom";

// TODO 把所有 id 都改成 number 类型
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
}

// type PropsType = Omit<ListProps, 'users'>
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name), // localeCompare 可以排序中文字符
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
      // dataSource={list}
    ></Table>
  );
};
