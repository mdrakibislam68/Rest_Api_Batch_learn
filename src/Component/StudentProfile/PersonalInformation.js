import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import "./profileInfo.css";
import PhoneInput from "react-phone-number-input";

const PersonalInformation = ({ user, onFinish }) => {
  const email = user.email;
  const firstname = user.first_name;
  const lastname = user.last_name;
  const phone = user.phone_number;

  const [phoneValue, setPhoneValue] = useState("");
  console.log(phoneValue);
  console.log(phone);
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      {/* <Select
        value="85"
        className="flex items-center"
        style={{
          width: "70px",
        }}
      >
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select> */}
    </Form.Item>
  );

  return (
    <div>
      <Form
        // initialValues={{
        //   ["email"]: user.email,
        // }}
        onFinish={onFinish}
        autoComplete="off"
        fields={[
          {
            name: ["email"],
            value: email,
          },
          {
            name: ["firstname"],
            value: firstname,
          },
          {
            name: ["lastname"],
            value: lastname,
          },
          {
            name: ["phone"],
            value: phone,
          },
        ]}
      >
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-['Nunito_sans'] font-extrabold text-[#042040]">
            Personal informations
          </h1>
          <Form.Item>
            <Button
              className="button font-bold bg-[#40a9ff] text-white py-4 px-5 max-w-[124px] h-11 hover:#40a9ff flex items-center justify-center w-full text-base rounded-xl font-['']"
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Form.Item
            className="text-left mb-7"
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            className=""
            name="firstname"
            label={<span>First Name</span>}
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone:"
            className="custom_input custom_input__phone pack_custom_input"
            rules={[
              {
                required: true,
                message: "The Phone field is required",
              },
            ]}
          >
            {/* <Input /> */}
            <PhoneInput
              onChange={setPhoneValue}
              countrySelectProps={{ unicodeFlags: false }}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PersonalInformation;
