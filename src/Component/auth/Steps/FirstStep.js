import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import GlobalProvider from "../../../Context/Index";
import { useDispatch, useSelector } from "react-redux";
import { teacherFirstValue } from "../../../redux/teacherFirst";

const FirstStep = ({ current, setCurrent, setFirstValues }) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const firstValue = useSelector((state) => state.teacherFirstValue.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setCurrent(current + 1);
    const value = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      phone: phone,
      phone_number: values.phone_number,
      password: values.password,
      is_accept: values.is_accept,
      teacher_type: values.teacher_type,
    };
    console.log(values);
    setValue(value);
    dispatch(teacherFirstValue(value));
    setLoading(true);
    await axios
      .post(
        "https://api.staging.batchlearn.com/api/v1/auth/register-teacher-first-step/",
        value
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        // toast("Your account has been successfully created!", {
        //   position: "bottom-right",
        //   theme: "dark",
        //   hideProgressBar: true,
        //   closeOnClick: true,
        // });
        // navigate("/login");
      })
      .catch((err) => console.log(err.response.data));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const phoneHandle = (value) => {
    setPhone(value);
  };
  return (
    <div>
      {/* <button onClick={handleClick}>click</button> */}
      <ToastContainer className=" text-center m-0 p-0" />

      <span>
        <Form
          name="basic"
          fields={[
            {
              name: ["email"],
              value: firstValue.email,
            },
            {
              name: ["firstname"],
              value: firstValue.firstname,
            },
            {
              name: ["lastname"],
              value: firstValue.lastname,
            },
            {
              name: ["phone"],
              value: firstValue.phone,
            },
          ]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <div className="grid grid-cols-2 grid-flow-row gap-6 w-full mt-5">
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
                // value={this.state.phone}
                onChange={phoneHandle}
                // onChange={(phone) => this.setPhone({ phone })}
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
              label="Occupation:"
              name="teacher_type"
              rules={[
                {
                  required: true,
                  message: "The School field is required",
                },
              ]}
            >
              <Select>
                <Select.Option value="Independent Tutor">
                  Independent Tutor
                </Select.Option>
                <Select.Option value="Teacher at a private school">
                  Teacher at a private school
                </Select.Option>
                <Select.Option value="Teacher at a public school">
                  Teacher at a public school
                </Select.Option>
                <Select.Option value="Tutor at an agency">
                  Tutor at an agency
                </Select.Option>
                <Select.Option value=" Manager/Bussiness owner at a tutoring agency">
                  Manager/Bussiness owner at a tutoring agency
                </Select.Option>
                <Select.Option value="Other">Other</Select.Option>
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
                {
                  min: 8,
                  message: "password must be minimum 8 characters.",
                },
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
          {/* <Form.Item className="max-w-xs mx-auto">
            <Button
              className="min-w-full h-auto w-full rounded-lg text-base font-bold py-4"
              type="primary"
              htmlType="submit"
            >
              {loading ? (
                <span>
                  <LoadingOutlined /> Please wait...
                </span>
              ) : (
                <span>Create account</span>
              )}
            </Button>
          </Form.Item> */}
          <div className="mt-6 flex justify-center gap-6">
            {current === 0 && (
              <Button
                disabled
                className="bg-white text-[#042040] border-[#40a9ff]  max-w-[124px] w-full h-auto rounded-lg py-4 text-base font-bold"
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                <span>Previous</span>
              </Button>
            )}
            {current === 0 && (
              <Button
                className="bg-[#136df1] text-white border-[#40a9ff]  max-w-[124px] w-full h-auto rounded-lg py-4 text-base font-bold"
                type="primary"
                htmlType="submit"
              >
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
  );
};

export default FirstStep;
