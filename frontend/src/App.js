// src/App.js
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskLogs from "./components/TaskLogs";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Layout>
      <Header>
        <div style={{ color: "#fff", fontSize: "20px" }}>Task Scheduler</div>
      </Header>
      <Content style={{ padding: "20px" }}>
        <AddTask refreshTasks={refreshTasks} />
        <h2 style={{ marginTop: "40px" }}>Task List</h2>
        <TaskList key={refreshKey} />
        <h2 style={{ marginTop: "40px" }}>Task Logs</h2>
        <TaskLogs />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Task Scheduler ©2024 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default App;
