import React, { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import axios from "axios";

const TaskLogs = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/logs");
      setLogs(response.data);
    } catch (error) {
      message.error("Failed to load logs!");
    }
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Execution Time",
      dataIndex: "executedAt",
      key: "executedAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Success" : "Failed"}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    fetchLogs();
  }, []);

  return <Table columns={columns} dataSource={logs} rowKey="_id" />;
};

export default TaskLogs;
