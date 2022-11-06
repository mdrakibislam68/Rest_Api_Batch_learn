import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import GlobalProvider, { GlobalContext } from "../Context/Index";
import bg from "../assest/bg.png";
import SignupModal from "../Component/SingupModal";

console.clear();
const LoginForm = () => {
  const { token, setToken } = GlobalProvider();

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const makeRequest = async (config) => {
    return await axios(config);
  };

  const onFinish = (values) => {
    const { email, password } = values;

    makeRequest({
      url: "http://api.staging.batchlearn.com/api/v1/auth/login/",
      method: "post",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        setToken(res.data.access);
        setLoading(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div
        className="min-h-screen w-full flex justify-center py-12 bg-cover bg-no-repeat bg-top "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-lg w-full py-14 px-16 bg-white rounded-2xl">
          <h1 className="text-center mb-9 font-extrabold text-4xl font-['Nunito_Sans']">
            Sign In
          </h1>
          <Form
            className=""
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            // onSubmit={handleSubmit}
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

              <div>
                <div className="mb-3 text-left">
                  <label className="after:content-[':'] text-base font-semibold text-[#042040] relative  ">
                    Password
                  </label>
                </div>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <span className="relative flex items-center">
                    <span className="absolute z-10 left-5  top-1/2 -translate-y-1/2 leading-[0]">
                      <svg
                        fill="none"
                        height="20"
                        viewBox="0 0 16 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0548 7.6605V5.69242C12.0548 3.38884 10.1866 1.52067 7.88301 1.52067C5.57943 1.51059 3.70393 3.36959 3.69385 5.67409V5.69242V7.6605"
                          stroke="#95A3BD"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                        ></path>{" "}
                        <path
                          clipRule="evenodd"
                          d="M11.3762 18.4788H4.372C2.4525 18.4788 0.895996 16.9232 0.895996 15.0028V11.0712C0.895996 9.1508 2.4525 7.59521 4.372 7.59521H11.3762C13.2957 7.59521 14.8522 9.1508 14.8522 11.0712V15.0028C14.8522 16.9232 13.2957 18.4788 11.3762 18.4788Z"
                          fillRule="evenodd"
                          stroke="#95A3BD"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                        ></path>{" "}
                        <path
                          d="M7.87429 12.0192V14.0551"
                          stroke="#95A3BD"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                        ></path>
                      </svg>
                    </span>
                    <Input.Password
                      className=" pl-[52px] h-[46px] leading-6 text-base rounded-xl tracking-widest"
                      placeholder="••••••"
                    />
                  </span>
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <Button
                className="min-w-full py-4 text-base font-bold h-auto rounded-lg"
                type="primary"
                htmlType="submit"
              >
                <span>Login</span>
              </Button>
            </Form.Item>
            <div className="flex justify-center items-center my-5 text-base font-semibold text-gray-50">
              <Link to="/forgotPassword" className="text-blue-500">
                Forgot password?
              </Link>
            </div>
            <div className="h-[1px] w-full bg-gray-100"></div>
            <div className="text-center mt-5">
              <span className="text-base font-semibold cursor-pointer">
                Don't have an account:{" "}
                <span
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-500"
                >
                  Sign Up Free!
                </span>
              </span>
            </div>
          </Form>
        </div>
      </div>
      <SignupModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default LoginForm;
