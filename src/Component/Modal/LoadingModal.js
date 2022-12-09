import { Modal, Steps } from "antd";
import React, { useEffect, useState } from "react";
import "../../Style/custom_modal.css";
import FirstStep from "../createclass/FirstStep";
import SecondStep from "../createclass/SecondStep";
import ThirdStep from "../createclass/ThirdStep";
import { useDispatch, useSelector } from "react-redux";
import { changeModalAction } from "../../redux/classModal";
import { firstStepAction } from "../../redux/classFirst";

const { Step } = Steps;

const LoadingModal = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [getImage, setGetImage] = useState(null);

  const handleCancel = () => {
    dispatch(changeModalAction(false));
    setCurrent(0);
    dispatch(firstStepAction(""));
  };

  const openModal = useSelector((state) => state.openModal.value);

  return (
    <>
      <Modal
        title={
          <h1 className="text-2xl font-extrabold text-[#042040] mb-3 pt-3 font-['Nunito_Sans']">
            {" "}
            Request new session
          </h1>
        }
        className="w-[506px] "
        footer={null}
        open={openModal}
        onCancel={handleCancel}
      >
        <div className="">
          <>
            <Steps current={current}>
              <Step key={current} />
              <Step key={current} />
              <Step key={current} />
            </Steps>

            {current < 1 && (
              <FirstStep current={current} setCurrent={setCurrent} />
            )}
            {current === 1 && (
              <SecondStep
                current={current}
                setCurrent={setCurrent}
                setGetImage={setGetImage}
                getImage={getImage}
              />
            )}
            {current === 2 && (
              <ThirdStep
                getImage={getImage}
                setGetImage={setGetImage}
                current={current}
                setCurrent={setCurrent}
              />
            )}
          </>
        </div>
      </Modal>
    </>
  );
};

export default LoadingModal;
