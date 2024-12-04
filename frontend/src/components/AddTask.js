import React, { useState } from "react";
import { Form, Input, Button, message, Modal, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

const AddTask = ({ refreshTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const onFinish = async (values) => {
    const { minute, hour, day, month, dayOfWeek } = values;

    // Construct the cron expression directly from user input
    const cronTime = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;

    try {
      await axios.post(
        "https://task-scheduler-backend-f162.onrender.com/tasks/add",
        {
          ...values,
          cronTime,
        }
      );
      message.success("Task added successfully!");
      refreshTasks();
      handleCancel(); // Close the modal after successful submission
    } catch (error) {
      message.error("Failed to add task!");
    }
  };

  return (
    <>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button type="primary" onClick={showModal}>
          ⨁ Add
        </Button>
      </div>

      <Modal
        title="Add a New Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Task Name"
            rules={[{ required: true, message: "Please enter the task name!" }]}
          >
            <Input placeholder="Enter task name" />
          </Form.Item>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            <Form.Item
              name="minute"
              label="Minute (0-59)"
              rules={[
                { required: true, message: "Please specify the minute!" },
              ]}
            >
              <Input placeholder="e.g., 0, 15, *, or */5" />
            </Form.Item>
            <Form.Item
              name="hour"
              label="Hour (0-23)"
              rules={[{ required: true, message: "Please specify the hour!" }]}
            >
              <Input placeholder="e.g., 0, 12, *, or */3" />
            </Form.Item>
            <Form.Item
              name="day"
              label="Day of Month (1-31)"
              rules={[{ required: true, message: "Please specify the day!" }]}
            >
              <Input placeholder="e.g., 1, 15, *, or */2" />
            </Form.Item>
            <Form.Item
              name="month"
              label="Month (1-12)"
              rules={[{ required: true, message: "Please specify the month!" }]}
            >
              <Input placeholder="e.g., 1, 6, *, or */2" />
            </Form.Item>
            <Form.Item
              name="dayOfWeek"
              label="Day of Week (0-6, Sunday=0)"
              rules={[
                { required: true, message: "Please specify the day of week!" },
              ]}
            >
              <Input placeholder="e.g., 0, 1, *, or */2" />
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter a message!" }]}
          >
            <Input.TextArea placeholder="Enter your message" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTask;
