import { LoadingOutlined } from "@ant-design/icons";
import bg from "../../assest/bg.png";
import { Button, Checkbox, Form, Input, Modal, Select, Steps } from "antd";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import { useSelector } from "react-redux";

const TeacherRegister = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [firstValues, setFirstValues] = useState("");
  // const [secondValues, setSecondValues] = useState(null);
  const [classTools, setClassTools] = useState(null);
  const [about, setAbout] = useState("");

  const firstValues = useSelector((state) => state.first.value);
  const secondValues = useSelector((state) => state.second.value);
  console.log(firstValues);
  const { Step } = Steps;
  const navigate = useNavigate();
  console.log(firstValues);

  const createTeacherAcc = async (values) => {
    values = {
      email: firstValues.email,
      first_name: firstValues.first_name,
      last_name: firstValues.last_name,
      password: firstValues.password,
      phone_number: firstValues.phone_number,
      serve_or_attend_school: secondValues.serve_or_attend_school,
      classTools: classTools,
      about: about,
    };
    console.log("values");
    setLoading(true);
    axios
      .post(
        "https://api.staging.batchlearn.com/api/v1/auth/register-teacher/",
        {
          "Content-Type": "application/json",
        },
        values
      )
      .then((res) => {
        setLoading(false);
        toast("Your account has been successfully created!", {
          position: "bottom-right",
          theme: "dark",
          hideProgressBar: true,
          closeOnClick: true,
        });
        navigate("/login");
      })
      .catch((err) => console.log(err));
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
    <>
      <div
        className="min-h-screen bg-no-repeat bg-top bg-cover py-12 flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}

        // footer={null}
      >
        <div className="py-12 px-12 m-8 max-w-[800px] w-full bg-white rounded-2xl">
          <h1 className="text-4xl font-['Nunito_Sans'] text-center mb-3 font-extrabold">
            Create an teacher account
          </h1>
          <div className="py-6 px-9">
            <>
              <Steps className="mb-9" current={current}>
                <Step key={current} />
                <Step key={current} />
                <Step key={current} />
              </Steps>

              {current < 1 && (
                <FirstStep
                  current={current}
                  setCurrent={setCurrent}
                  // setFirstValues={setFirstValues}
                />
              )}
              {current === 1 && (
                <SecondStep
                  current={current}
                  setCurrent={setCurrent}
                  // setSecondValues={setSecondValues}
                />
              )}
              {current === 2 && (
                <ThirdStep
                  current={current}
                  setCurrent={setCurrent}
                  createTeacherAcc={createTeacherAcc}
                  setClassTools={setClassTools}
                  setAbout={setAbout}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherRegister;
