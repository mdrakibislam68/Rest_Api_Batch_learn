import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { firstStepAction } from "../../redux/classFirst";
import moment from "moment";

const FirstStep = ({ current, setCurrent }) => {
  const firstValues = useSelector((state) => state.firstClass.value);
  const clickDate = useSelector((state) => state.clickDate.value);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const prev = () => {
    setCurrent(current - 1);
  };
  // console.log(date);
  const onFinish = (values) => {
    const date = moment(values.date).format("YYYY-MM-DD");
    const time = moment(values.time).format("THH:mm:ssZ");
    console.log(time);
    const formattedDate = date + time;
    setCurrent(current + 1);
    const value = {
      title: values.title,
      description: values.description,
      class_date: formattedDate,
      subject: values.subject,
      // time: time,
    };
    dispatch(firstStepAction(value));
    form.resetFields();
  };

  return (
    <Form
      form={form}
      className="mt-6"
      onFinish={onFinish}
      fields={[
        {
          name: ["title"],
          value: firstValues.title,
        },
        {
          name: ["description"],
          value: firstValues.description,
        },
        {
          name: ["subject"],
          value: firstValues.subject,
        },
        {
          name: ["date"],
          value: moment(clickDate, "YYYY-MM-DD"),
        },
        {
          name: ["time"],
          value: moment("13:30:56", "HH:mm:ss"),
        },
      ]}
    >
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
        <Form.Item
          className="custom_datepicker"
          name="date"
          label="Class Date"
          rules={[
            {
              required: true,
              message: "The Subject field is required",
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            // defaultValue={moment("2022-11-19", "YYYY-MM-DD")}
            showTime={false}
          />
        </Form.Item>
        <Form.Item
          className="custom_datepicker"
          name="time"
          label="Class Time"
          rules={[
            {
              required: true,
              message: "The Subject field is required",
            },
          ]}
        >
          <TimePicker use12Hours format="HH:mm A" />
        </Form.Item>
      </div>
      <div className="mt-6 flex justify-center items-center gap-6 font-['Nunito_sans']">
        {current > 0 && (
          <Form.Item className="max-w-[124px] w-full m-0">
            <Button
              className="bg-[#136df1] text-white border-[#40a9ff] py-4 text-base font-bold leading-5 rounded-[10px] h-auto w-full"
              onClick={() => prev()}
            >
              <span>Previous</span>
            </Button>
          </Form.Item>
        )}
        {current === 0 && (
          <Form.Item className="max-w-[124px] w-full m-0">
            <Button
              className="bg-[#136df1] text-white border-[#40a9ff] py-4 text-base font-bold leading-5 rounded-[10px] h-auto w-full"
              type="primary"
              htmlType="submit"
            >
              Next
            </Button>
          </Form.Item>
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
