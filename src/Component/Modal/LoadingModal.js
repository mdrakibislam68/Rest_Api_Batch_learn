import { Modal, Steps } from "antd";
import React, { useEffect, useState } from "react";
import "../../Style/custom_modal.css";
import FirstStep from "../createclass/FirstStep";
import SecondStep from "../createclass/SecondStep";
import ThirdStep from "../createclass/ThirdStep";
import moment from "moment";
import GlobalProvider from "../../Context/Index";
import { useDispatch, useSelector } from "react-redux";
import { changeModalAction } from "../../redux/classModal";

const { Step } = Steps;

const LoadingModal = ({ setOpenModal }) => {
  const [firstValues, setFirstValues] = useState("");
  const [secondValues, setSecondValues] = useState(null);
  const { baseurl } = GlobalProvider();
  const dispatch = useDispatch();

  const [student, setStudent] = useState("");
  const openModal = useSelector((state) => state.openModal.value);

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
    dispatch(changeModalAction(false));
  };

  const [current, setCurrent] = useState(0);

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
        <div className="py-6 px-9">
          {/* <span className="flex items-center mb-7 justify-between">
            <span
              onClick={() => setOpenModal(false)}
              className="flex items-center justify-center hover:bg-[#3f8cfe] w-[36px] h-[36px] rounded-full bg-[#f6f8fa]"
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
          </span> */}
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
