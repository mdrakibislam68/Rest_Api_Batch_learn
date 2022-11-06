import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.min.css";
import bg from "../../assest/bg.png";
import "../../Style/custom_login__input.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../../Style/custom_phoneInput__validation.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

const StudentRegister = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    // console.log("Success:", values);
    const {
      email,
      first_name,
      last_name,
      phone_number,
      school,
      password,
      is_accept,
    } = values;
    setLoading(true);
    await axios
      .post(
        "http://api.staging.batchlearn.com/api/v1/auth/register-student/",
        values
      )
      .then((res) => {
        setLoading(true);
        toast("Your account has been successfully created!", {
          position: "bottom-right",
          theme: "dark",
          hideProgressBar: true,
          closeOnClick: true,
        });
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  // const handleClick = () => {
  //   toast("Your account has been successfully created!", {
  //     position: "bottom-right",
  //     theme: "dark",
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //   });
  // };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      className="min-h-screen bg-no-repeat bg-top bg-cover py-12 flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* <button onClick={handleClick}>click</button> */}
      <ToastContainer className=" text-center m-0 p-0" />
      <div className="py-12 px-12 m-8 max-w-[800px] w-full bg-white rounded-2xl">
        <h1 className="text-4xl font-['Nunito_Sans'] text-center mb-9 font-extrabold">
          Create a student account
        </h1>
        <span>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <div className="grid grid-cols-2 grid-flow-row gap-6 w-full">
              <Form.Item
                label="First Name:"
                name="first_name"
                className="custom_input"
                rules={[
                  {
                    required: true,
                    message: "The First Name field is required",
                  },
                ]}
              >
                <Input
                  placeholder="Ex.Jhonny"
                  prefix={
                    <svg
                      data-v-5c664985=""
                      fill="none"
                      height="20"
                      viewBox="0 0 16 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        data-v-5c664985=""
                        clipRule="evenodd"
                        d="M7.987 13.0674C4.44168 13.0674 1.41406 13.6034 1.41406 15.7502C1.41406 17.8969 4.42247 18.4521 7.987 18.4521C11.5323 18.4521 14.5591 17.9152 14.5591 15.7694C14.5591 13.6235 11.5515 13.0674 7.987 13.0674Z"
                        fillRule="evenodd"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>{" "}
                      <path
                        data-v-5c664985=""
                        clipRule="evenodd"
                        d="M7.98664 10.0056C10.3132 10.0056 12.1989 8.11897 12.1989 5.79238C12.1989 3.46579 10.3132 1.58008 7.98664 1.58008C5.66005 1.58008 3.77346 3.46579 3.77346 5.79238C3.7656 8.11111 5.6391 9.9977 7.95695 10.0056H7.98664Z"
                        fillRule="evenodd"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>
                    </svg>
                  }
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="last_name"
                className="custom_input"
                rules={[
                  {
                    required: true,
                    message: "The Last Name field is required",
                  },
                ]}
              >
                <Input
                  placeholder="Ex.Doe"
                  prefix={
                    <svg
                      data-v-5c664985=""
                      fill="none"
                      height="20"
                      viewBox="0 0 16 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        data-v-5c664985=""
                        clipRule="evenodd"
                        d="M7.987 13.0674C4.44168 13.0674 1.41406 13.6034 1.41406 15.7502C1.41406 17.8969 4.42247 18.4521 7.987 18.4521C11.5323 18.4521 14.5591 17.9152 14.5591 15.7694C14.5591 13.6235 11.5515 13.0674 7.987 13.0674Z"
                        fillRule="evenodd"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>{" "}
                      <path
                        data-v-5c664985=""
                        clipRule="evenodd"
                        d="M7.98664 10.0056C10.3132 10.0056 12.1989 8.11897 12.1989 5.79238C12.1989 3.46579 10.3132 1.58008 7.98664 1.58008C5.66005 1.58008 3.77346 3.46579 3.77346 5.79238C3.7656 8.11111 5.6391 9.9977 7.95695 10.0056H7.98664Z"
                        fillRule="evenodd"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>
                    </svg>
                  }
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="custom_input"
                rules={[
                  {
                    required: true,
                    message: "The Email field is required",
                  },
                  {
                    type: "email",
                    message: "The Email field must be a valid email",
                  },
                ]}
              >
                <Input
                  placeholder="john@example.com"
                  prefix={
                    <svg
                      data-v-3b0cc4aa=""
                      fill="none"
                      height="18"
                      viewBox="0 0 20 18"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        data-v-3b0cc4aa=""
                        d="M15.4107 6.11353L11.3377 9.42548C10.5681 10.036 9.48544 10.036 8.71591 9.42548L4.60852 6.11353"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>{" "}
                      <path
                        data-v-3b0cc4aa=""
                        clipRule="evenodd"
                        d="M14.4998 17.25C17.2877 17.2577 19.1666 14.9671 19.1666 12.1518V5.85584C19.1666 3.04059 17.2877 0.75 14.4998 0.75H5.50019C2.71228 0.75 0.833313 3.04059 0.833313 5.85584V12.1518C0.833313 14.9671 2.71228 17.2577 5.50019 17.25H14.4998Z"
                        fillRule="evenodd"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>
                    </svg>
                  }
                />
              </Form.Item>

              <Form.Item
                name="phone_number"
                label="Phone:"
                className="custom_input custom_input__phone pack_custom_input"
                rules={[
                  {
                    required: true,
                    message: "The Phone field is required",
                  },
                ]}
              >
                <PhoneInput
                  initialValueFormat="national"
                  placeholder="1 (712) 345-65"
                  //   value={value}
                  //   onChange={setValue}
                  //   error={
                  //     value
                  //       ? isValidPhoneNumber(value)
                  //         ? undefined
                  //         : "Invalid phone number"
                  //       : "Phone number required"
                  //   }
                  countrySelectProps={{ unicodeFlags: false }}
                />
              </Form.Item>

              <Form.Item
                label="School:"
                name="school"
                className="custom_input custom_Occupation"
                rules={[
                  {
                    required: true,
                    message: "The School field is required",
                  },
                ]}
              >
                <Select>
                  <Select.Option value={1}>ABC - High school</Select.Option>
                  <Select.Option value={2}>Bogura High school</Select.Option>
                  <Select.Option value={3}>Bogura govt. college</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="custom_input custom_input__password w-full"
                rules={[
                  {
                    required: true,
                    message: "The Password field is required",
                  },
                  { min: 8, message: "password must be minimum 8 characters." },
                ]}
              >
                <Input.Password
                  placeholder="••••••"
                  prefix={
                    <svg
                      data-v-3b0cc4aa=""
                      fill="none"
                      height="20"
                      viewBox="0 0 16 20"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        data-v-3b0cc4aa=""
                        d="M12.0548 7.6605V5.69242C12.0548 3.38884 10.1866 1.52067 7.88301 1.52067C5.57943 1.51059 3.70393 3.36959 3.69385 5.67409V5.69242V7.6605"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>{" "}
                      <path
                        data-v-3b0cc4aa=""
                        clipRule="evenodd"
                        d="M11.3762 18.4788H4.372C2.4525 18.4788 0.895996 16.9232 0.895996 15.0028V11.0712C0.895996 9.1508 2.4525 7.59521 4.372 7.59521H11.3762C13.2957 7.59521 14.8522 9.1508 14.8522 11.0712V15.0028C14.8522 16.9232 13.2957 18.4788 11.3762 18.4788Z"
                        fillRule="evenodd"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>{" "}
                      <path
                        data-v-3b0cc4aa=""
                        d="M7.87429 12.0192V14.0551"
                        stroke="#95A3BD"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>
                    </svg>
                  }
                />
              </Form.Item>
            </div>
            <div className="mb-4 flex justify-center">
              <Form.Item
                name="is_accept"
                valuePropName="checked"
                // className={"required__checkbox"}
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: "Checkbox field is required",
                  },
                ]}
              >
                <Checkbox>
                  <p className="px-2 text-gray-500 font-normal">
                    I accept the{" "}
                    <Link className=" underline" to="/login">
                      terms and conditions
                    </Link>
                  </p>
                </Checkbox>
              </Form.Item>
            </div>
            <Form.Item className="max-w-xs mx-auto">
              <Button
                className="min-w-full h-auto w-full rounded-lg text-base font-bold py-4"
                type="primary"
                htmlType="submit"
              >
                {/* {loading ? (
                  <span>
                    <LoadingOutlined /> please wait..
                  </span>
                ) : (
                    )} */}
                {loading ? (
                  <span>
                    <LoadingOutlined /> Please wait...
                  </span>
                ) : (
                  <span>Create account</span>
                )}
              </Button>
            </Form.Item>
            <Form.Item className="text-center mt-7">
              <Link to="/login" className="font-semibold text-base ">
                Back to login{" "}
                <span>
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block"
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
            </Form.Item>
          </Form>
        </span>
      </div>
    </div>
  );
};

export default StudentRegister;
