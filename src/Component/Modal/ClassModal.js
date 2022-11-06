import { CloseOutlined, CloudOutlined } from "@ant-design/icons";
import { Modal, Steps } from "antd";
import React, { useState } from "react";
import GlobalProvider from "../../Context/Index";
import FirstStep from "../createclass/FirstStep";
import SecondStep from "../createclass/SecondStep";
import ThirdStep from "../createclass/ThirdStep";
const { Step } = Steps;

const ClassModal = ({
  handleCancel,
  setFirstValues,
  setSecondValues,
  selectDate,
  createclass,
}) => {
  const { setOpenModal, openModal } = GlobalProvider();
  const [current, setCurrent] = useState(0);

  return (
    <>
      <Modal
        className="w-[506px] "
        footer={null}
        open={openModal}
        onCancel={handleCancel}
        // closable={true}
      >
        <div className="py-6 px-9">
          <span className="flex items-center justify-between mb-7">
            <h1 className="text-2xl font-extrabold text-[#042040]  font-['Nunito_Sans']">
              {" "}
              Request new session
            </h1>
            <span
              onClick={handleCancel}
              className="flex items-center justify-center w-[36px] h-[36px] bg-[#f6f8fa] rounded-full hover:bg-[#3F8CFE] hover:stroke-[#fff]"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.7966 1.00366L1.00391 8.79635"
                  stroke="#042040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8.79919 8.80082L1 1"
                  stroke="#042040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </span>
          <>
            <Steps current={current}>
              <Step key={current} />
              <Step key={current} />
              <Step key={current} />
            </Steps>

            {current < 1 && (
              <FirstStep
                current={current}
                setCurrent={setCurrent}
                setFirstValues={setFirstValues}
              />
            )}
            {current === 1 && (
              <SecondStep
                current={current}
                setCurrent={setCurrent}
                setSecondValues={setSecondValues}
              />
            )}
            {current === 2 && (
              <ThirdStep
                current={current}
                setCurrent={setCurrent}
                createclass={createclass}
              />
            )}
          </>
        </div>
      </Modal>
    </>
  );
};

export default ClassModal;
