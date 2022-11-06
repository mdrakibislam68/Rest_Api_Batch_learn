import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  TimePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";

const FirstStep = ({ current, setCurrent, steps, setFirstValues }) => {
  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    setCurrent(current + 1);
    setFirstValues(values);
  };

  return (
    <Form className="mt-6" onFinish={onFinish}>
      <Form.Item
        label="Title"
        name="title"
        className="custom_input custom_modal__input"
        rules={[
          {
            required: true,
            message: "The Title field is required",
          },
        ]}
      >
        <Input placeholder="ENG-324" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        className="custom_input custom_input__textarea"
        rules={[
          {
            required: true,
            message: "The Description field is required",
          },
        ]}
      >
        <TextArea placeholder="Description" className="h-[70px]" />
      </Form.Item>

      <Form.Item
        label="Subject"
        name="subject"
        className="custom_input custom_Occupation"
        rules={[
          {
            required: true,
            message: "The Subject field is required",
          },
        ]}
      >
        <Select>
          <Select.Option value={1}>Math</Select.Option>
          <Select.Option value={2}>Chemistry</Select.Option>
        </Select>
      </Form.Item>
      <div className="grid grid-flow-row grid-cols-2 gap-6">
        <Form.Item className="custom_datepicker" name="date" label="Class Date">
          <DatePicker
            format={"YYYY-MM-DD"}
            showTime={false}
            // placeholder={date}
          />
        </Form.Item>

        <Form.Item className="custom_datepicker" name="time" label="Start time">
          <TimePicker
            use12Hours
            format="h:mm A"
            // placeholder={time}
          />
        </Form.Item>
      </div>
      <div className="mt-6 flex justify-center">
        {current > 0 && (
          <Button
            className="bg-[#136df1] text-white border-[#40a9ff]  "
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            <span>Previous</span>
          </Button>
        )}
        {current === 0 && (
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        )}
        {current === 2 && (
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </Form>
  );
};

export default FirstStep;
