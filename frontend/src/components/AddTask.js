import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  DatePicker,
  TimePicker,
  Modal,
  Typography,
} from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;

const generateCronTime = (date, time) => {
  if (!date || !time) {
    throw new Error("Date and time must be provided");
  }

  const combinedDateTime = moment(date).set({
    hour: moment(time).hour(),
    minute: moment(time).minute(),
  });

  const minute = combinedDateTime.minute();
  const hour = combinedDateTime.hour();
  const day = combinedDateTime.date();
  const month = combinedDateTime.month() + 1;

  return `${minute} ${hour} ${day} ${month} *`;
};

const AddTask = ({ refreshTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const onFinish = async (values) => {
    const { date, time } = values;
    const cronTime = generateCronTime(date, time);
    try {
      await axios.post("http://localhost:5000/tasks/add", {
        ...values,
        cronTime,
      });
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
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please select a time!" }]}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
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
