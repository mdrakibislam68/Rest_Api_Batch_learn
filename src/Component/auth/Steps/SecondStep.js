import { Button, Checkbox, Col, Form, message, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/lib/skeleton/Title";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teacherSecondValue } from "../../../redux/teacherSecond";
import { LoadingOutlined } from "@ant-design/icons";

const SecondStep = ({ current, setCurrent, setSecondValues }) => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [serve_or_attend_school, setServe_or_attend_school] = useState([]);

  const secondValue = useSelector((state) => state.second.value);

  const dispatch = useDispatch();

  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish = async () => {
    setLoading(true);
    const values = {
      subjects: subjects,
      serve_or_attend_school: serve_or_attend_school,
    };
    dispatch(teacherSecondValue(values));
    if (!subjects) {
      alert("lsd");
    } else if (!serve_or_attend_school) {
      alert("school");
    } else {
      await axios
        .post(
          "https://api.staging.batchlearn.com/api/v1/auth/register-teacher-second-step/",
          values
        )
        .then((res) => {
          setCurrent(current + 1);
          setLoading(false);

          // toast("Your account has been successfully created!", {
          //   position: "bottom-right",
          //   theme: "dark",
          //   hideProgressBar: true,
          //   closeOnClick: true,
          // });
          // navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };
  const onChangeSubjects = (checkedValues) => {
    setSubjects(checkedValues);
  };
  // console.log(subjects);
  const onChangeAttend = (checkedValues) => {
    setServe_or_attend_school(checkedValues);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <div className="grid grid-cols-2 gap-6 text-base font-semibold text-[#042040] font-['Nunito_Sans']">
        <Checkbox.Group
          onChange={onChangeSubjects}
          rules={[
            {
              required: true,
              message: "Please accept the terms & conditions",
            },
          ]}
        >
          <Row>
            <h1 className="text-base font-semibold text-[#042040] font-['Nunito_Sans'] mb-5">
              Select up to 3 subjects you teach (honors / AP level courses):
            </h1>
            <Col>
              <Checkbox
                className="mb-4 text-base font-semibold text-gray-500 px-2 font-['Nunito_Sans']"
                value={1}
              >
                Math
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                className="text-base font-semibold text-gray-500 px-2 font-['Nunito_Sans']"
                value={2}
              >
                Chemistry
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Checkbox.Group
          className=""
          style={{
            width: "100%",
          }}
          onChange={onChangeAttend}
        >
          <Row>
            <h1 className="text-base font-semibold text-[#042040] font-['Nunito_Sans']">
              Select schools your current studens attend or schools you serve
              (North Atlana):
            </h1>
            <Col>
              <Checkbox
                className="mb-4 text-base font-semibold text-gray-500 px-2 font-['Nunito_Sans']"
                value={1}
              >
                Bogura Coronation
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                className="mb-4 text-base font-semibold text-gray-500 px-2 font-['Nunito_Sans']"
                value={2}
              >
                ABC - High School
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </div>
      <div className="mt-6 flex justify-center gap-6">
        {current > 0 && (
          <Button
            className="bg-white text-[#042040] border-[#40a9ff]  max-w-[124px] w-full h-auto rounded-lg py-4 text-base font-bold"
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            <span>Previous</span>
          </Button>
        )}
        {current === 1 && (
          <Button
            className="bg-[#136df1] text-white border-[#40a9ff]  max-w-[124px] w-full h-auto rounded-lg py-4 text-base font-bold"
            type="primary"
            htmlType="submit"
          >
            {loading ? <LoadingOutlined /> : "Next"}
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

export default SecondStep;
