import { Button, Checkbox, Col, Form, message, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

const ThirdStep = ({ current, setCurrent }) => {
  const [loading, setLoading] = useState(false);
  const [classTools, setClassTools] = useState(null);
  const [about, setAbout] = useState("");
  const navigate = useNavigate();

  const secondValues = useSelector((state) => state.second.value);
  const firstValues = useSelector((state) => state.first.value);
  const prev = () => {
    setCurrent((prevState) => prevState - 1);
  };
  const onChangeSubjects = (checkedValues) => {
    setClassTools(checkedValues);
  };
  const aboutHandle = (e) => {
    setAbout(e.target.value);
  };
  const createTeacherAcc = (values) => {
    values = {
      about: about,
      classes_tools: classTools,
      email: firstValues.email,
      first_name: firstValues.first_name,
      is_accept: firstValues.is_accept,
      last_name: firstValues.last_name,
      password: firstValues.password,
      phone_number: firstValues.phone_number,
      serve_or_attend_school: secondValues.serve_or_attend_school,
      subjects: secondValues.subjects,
      teacher_type: firstValues.teacher_type,
    };
    console.log("values");
    setLoading(true);
    axios
      .post(
        "https://api.staging.batchlearn.com/api/v1/auth/register-teacher/",
        values,
        {
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        toast("Your account has been successfully created!", {
          position: "bottom-right",
          theme: "dark",
          hideProgressBar: true,
          closeOnClick: true,
        });
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
    // await fetch(
    //   "https://api.staging.batchlearn.com/api/v1/auth/register-teacher/",
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   }
    // );
  };

  return (
    <Form onFinish={createTeacherAcc}>
      <div className="grid grid-cols-2 gap-6 text-base font-semibold text-[#042040] font-['Nunito_Sans']">
        <Checkbox.Group onChange={onChangeSubjects}>
          <Row>
            <h1 className="text-base font-semibold text-[#042040] font-['Nunito_Sans'] mb-5">
              Select up to 3 subjects you teach (honors / AP level courses):
            </h1>
            <Col>
              <Checkbox
                className="mb-4 text-base font-semibold text-gray-500 px-2 font-['Nunito_Sans']"
                value={1}
              >
                Zoom
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                className="text-base font-semibold text-gray-500 px-2 font-['Nunito_Sans']"
                value={2}
              >
                White Board
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <div>
          <h1 className="text-base font-semibold text-[#042040] font-['Nunito_Sans'] mb-5">
            Anything you want to add about yourself? (Schools your students
            attend, other classes, experience)
          </h1>
          <TextArea
            onChange={aboutHandle}
            className="mb-2 py-1 px-3 bg-white rounded border border-[#d9d9d9] h-auto"
          />
        </div>
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
            Next
          </Button>
        )}
        {current === 2 && (
          <Button
            className="bg-[#136df1] text-white border-[#40a9ff]  max-w-[124px] w-full h-auto rounded-lg py-4 text-base font-bold"
            type="primary"
            htmlType="submit"
          >
            {loading ? (
              <span>
                <LoadingOutlined /> Please wait...
              </span>
            ) : (
              <span>Done</span>
            )}
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ThirdStep;
