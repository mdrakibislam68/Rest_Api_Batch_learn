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
  // const [firstValues, setFirstValues] = useState("");
  // const [secondValues, setSecondValues] = useState(null);

  const { Step } = Steps;

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
                  // createTeacherAcc={createTeacherAcc}
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
