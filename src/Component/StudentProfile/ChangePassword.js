import { Button, Form, Input } from "antd";
import React from "react";
import GlobalProvider from "../../Context/Index";

const ChangePassword = () => {
  const { baseurl } = GlobalProvider();
  const handleFinish = (e) => {
    const values = {
      old_password: e.old_password,
      new_password: e.new_password,
      new_password_confirmation: e.new_password_confirmation,
    };
    baseurl
      .post("auth/change-password/", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    console.log(values);
  };
  return (
    <div className=" rounded-2xl bg-white">
      <h1 className="text-2xl font-extrabold text-[#042040] font-['Nunito_Sans']">
        Change account password
      </h1>
      <div>
        <Form onFinish={handleFinish}>
          <Form.Item
            name="old_password"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="new_password_confirmation"
            label="Confirm New Password"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-auto bg-[#136df1] rounded-xl py-4 text-base font-bold text-white"
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
