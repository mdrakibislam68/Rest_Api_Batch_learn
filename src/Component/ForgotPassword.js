import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="forgot_wrapper w-full first-letter: flex min-h-screen items-center justify-center bg-gray-100 py-10">
      <div className="forgot_inner max-w-lg rounded-2xl bg-white pt-[58px] pb-16 px-[60px]">
        <div className="forgot_title text-center mb-8">
          <h1 className="mb-1.5 text-4xl font-extrabold font-['Nunito_Sans']">
            Forgot Password
          </h1>
          <p className="px-3 font-['Nunito_Sans'] text-base font-semibold text-slate-400">
            Enter your email below to receive password reset instruction
          </p>
        </div>
        <span>
          <Form
            className=""
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <div>
              <div className="mb-3 text-left">
                <label className="after:content-[':'] text-base font-semibold text-[#042040] relative  ">
                  Email
                </label>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <span className="relative flex items-center">
                  <span className="absolute z-10 left-5  top-1/2 -translate-y-1/2">
                    <svg
                      fill="none"
                      height="18"
                      viewBox="0 0 20 18"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      data-v-3b0cc4aa=""
                    >
                      <path
                        d="M15.4107 6.11353L11.3377 9.42548C10.5681 10.036 9.48544 10.036 8.71591 9.42548L4.60852 6.11353"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>{" "}
                      <path
                        clipRule="evenodd"
                        d="M14.4998 17.25C17.2877 17.2577 19.1666 14.9671 19.1666 12.1518V5.85584C19.1666 3.04059 17.2877 0.75 14.4998 0.75H5.50019C2.71228 0.75 0.833313 3.04059 0.833313 5.85584V12.1518C0.833313 14.9671 2.71228 17.2577 5.50019 17.25H14.4998Z"
                        fillRule="evenodd"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>
                    </svg>
                  </span>
                  <Input
                    className="px-[52px] h-[46px] text-base rounded-xl"
                    placeholder="example@gmail.com"
                  />
                </span>
              </Form.Item>
              <Form.Item>
                <Button
                  className="min-w-full py-4 text-base font-bold h-auto rounded-lg"
                  type="primary"
                  htmlType="submit"
                >
                  <span>Submit</span>
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className="flex justify-center items-center my-5 text-base font-semibold text-gray-50">
            <Link to="/login" className="text-blue-500">
              Back to login{" "}
              <span className="back_arrow">
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-block"
                >
                  <path
                    d="M13.167 7.81706L3.16699 7.81706"
                    stroke="#3F8CFE"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></path>{" "}
                  <path
                    d="M9.13379 3.80083L13.1671 7.81683L9.13379 11.8335"
                    stroke="#3F8CFE"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </span>
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
