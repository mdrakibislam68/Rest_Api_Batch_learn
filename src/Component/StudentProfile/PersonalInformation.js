import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import "./profileInfo.css";

const PersonalInformation = ({ user, onFinish }) => {
  const email = user.email;
  const firstname = user.first_name;
  const lastname = user.last_name;
  const phone = user.phone_number;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        className="flex items-center"
        style={{
          width: "70px",
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
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
        </div>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "50%",
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInformation;
