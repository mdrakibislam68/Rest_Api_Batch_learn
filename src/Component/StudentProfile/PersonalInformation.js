import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import "./profileInfo.css";
import PhoneInput from "react-phone-number-input";
import GlobalProvider from "../../Context/Index";
import { useDispatch, useSelector } from "react-redux";
import { subjectAction } from "../../redux/subjects";
import { Option } from "antd/lib/mentions";

const PersonalInformation = ({ onFinish, user }) => {
  const { baseurl } = GlobalProvider();
  const [loading, setLoading] = useState(false);
  const roll = localStorage.getItem("roll");

  const dispatch = useDispatch();
  const subjectsData = useSelector((state) => state.subjects.subjects);

  useEffect(() => {
    dispatch(subjectAction({ baseurl }));
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   baseurl
  //     .get("auth/profile_info/")
  //     .then((res) => {
  //       setUser(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    setLoading(true);
    baseurl
      .get("/settings/get_subjects/")
      .then((res) => {
        setLoading(false);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Form
        onFinish={onFinish}
        autoComplete="off"
        fields={[
          {
            name: ["email"],
            value: user.email,
          },
          {
            name: ["firstname"],
            value: user.first_name,
          },
          {
            name: ["lastname"],
            value: user.last_name,
          },
          {
            name: ["phone"],
            value: user.phone_number,
          },
          {
            name: ["subjects"],
            value: user.subjects && user.subjects.map((item) => item.id),
          },
          {
            name: ["classes_tools"],
            value:
              user.classes_tools && user.classes_tools.map((item) => item.name),
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
            <PhoneInput countrySelectProps={{ unicodeFlags: false }} />
          </Form.Item>
          {roll === "Teacher" && (
            <Form.Item
              name="subjects"
              label="Subject"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <Select mode="multiple">
                {subjectsData.map((el) => (
                  <Select.Option value={el.id} key={el.id}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {roll === "Teacher" && (
            <Form.Item
              name="classes_tools"
              label="Class Tools"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <Select mode="multiple">
                {subjectsData.map((el) => (
                  <Select.Option value={el.id} key={el.id}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>
      </Form>
    </div>
  );
};

export default PersonalInformation;
