import React, { useEffect, useState } from "react";
import { Table, Tag, Button, message } from "antd";
import axios from "axios";
import cronParser from "cron-parser";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://task-scheduler-backend-f162.onrender.com/tasks"
      );
      const tasksWithReadableTime = response.data.map((task) => {
        // Convert cron time to human-readable time
        try {
          const interval = cronParser.parseExpression(task.cronTime);
          task.readableTime = interval.next().toString().split("GMT")[0]; // Get the next execution time
        } catch (error) {
          task.readableTime = "Invalid Cron Time";
        }
        return task;
      });
      setTasks(tasksWithReadableTime);
    } catch (error) {
      message.error("Failed to load tasks!");
    }
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time scheduled",
      dataIndex: "readableTime",
      key: "readableTime",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="link" danger onClick={() => deleteTask(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://task-scheduler-backend-f162.onrender.com/tasks/${id}`
      );
      message.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      message.error("Failed to delete task!");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="_id"
      style={{ overflowX: "scroll" }}
    />
  );
};

export default TaskList;
