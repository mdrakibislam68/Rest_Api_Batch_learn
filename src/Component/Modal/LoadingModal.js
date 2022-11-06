import { Modal, Steps } from "antd";
import React, { useEffect, useState } from "react";
import "../../Style/custom_modal.css";
import FirstStep from "../createclass/FirstStep";
import SecondStep from "../createclass/SecondStep";
import ThirdStep from "../createclass/ThirdStep";
import moment from "moment";
import GlobalProvider from "../../Context/Index";

const { Step } = Steps;

const LoadingModal = ({ openModal, setOpenModal, selectDate }) => {
  const [firstValues, setFirstValues] = useState("");
  const [secondValues, setSecondValues] = useState(null);
  const { baseurl } = GlobalProvider();
  const [student, setStudent] = useState("");

  useEffect(() => {
    baseurl
      .get("auth/profile_info/")
      .then((res) => setStudent(res.data.id))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createclass = async () => {
    let formData = new FormData();
    const date = moment(firstValues.date).format("YYYY-MM-DD");
    const time = moment(firstValues.time).format("LTS");
    // const values = new FormData();
    // formData.append("title", firstValues.title);
    // formData.append("description", firstValues.description);
    // formData.append("class_date", date);
    // formData.append("creator", student);
    // formData.append("subject", firstValues.subject);
    // formData.append("students", [student]);

    let data = {
      title: firstValues.title,
      description: firstValues.description,
      class_date: date,
      creator: student,
      subject: firstValues.subject,
      students: [student],
    };
    await baseurl
      .post("/classrooms/class_room_create/", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const [current, setCurrent] = useState(0);

  return (
    <>
      <Modal
        className="w-[506px] "
        footer={null}
        open={openModal}
        onCancel={handleCancel}
      >
        <div className="py-6 px-9">
          <h1 className="text-2xl font-extrabold text-[#042040] mb-7 font-['Nunito_Sans']">
            {" "}
            Request new session
          </h1>
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
                setOpenModal={setOpenModal}
              />
            )}
          </>
        </div>
      </Modal>
      {/* <Modal
        open={setBillingModal }
        onCancel={handleCancel}
      >

      </Modal> */}
    </>
  );
};

export default LoadingModal;
