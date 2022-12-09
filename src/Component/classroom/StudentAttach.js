import { Button, Form, Modal, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import GlobalProvider from "../../Context/Index";
import { addNewAttach } from "../../redux/studentAttachmentList";

const StudentAttach = ({ studentAttachmentList, classData }) => {
  const [modal, setModal] = useState(false);
  const { baseurl } = GlobalProvider();
  const { id } = useParams();
  const imageData = new FormData();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const url = `classrooms/${id}/student-attachment-create/`;
  const handleCancel = () => {
    setModal(false);
  };
  const showModal = () => {
    setModal(true);
  };
  const onFinish = (e) => {
    const imgList = e.image.fileList;
    imgList.map(async (img) => {
      imageData.append("file", img.originFileObj);
      imageData.append("classroom", id);
      imageData.append("student", classData.creator);
      return await baseurl
        .post(url, imageData)
        .then((res) => {
          dispatch(addNewAttach(res.data));
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    });
    form.resetFields();
    setModal(false);
  };
  return (
    <>
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-base leading-6 text-[#042040] py-3  font-bold">
          Student Attachments
        </span>
        <button
          onClick={showModal}
          className="flex items-center  gap-1.5 justify-center text-base font-bold leading-6 text-[#3f8cfe] py-2.5 px-2.5 font-['Nunito_sans']"
        >
          <svg
            data-v-511e7b02=""
            fill="none"
            height="21"
            viewBox="0 0 20 21"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              data-v-511e7b02=""
              id="mask0_648_9543"
              height="21"
              maskUnits="userSpaceOnUse"
              width="20"
              x="0"
              y="0"
            >
              <rect
                data-v-511e7b02=""
                fill="#D9D9D9"
                height="20"
                width="20"
                y="0.5"
              ></rect>
            </mask>{" "}
            <g data-v-511e7b02="" mask="url(#mask0_648_9543)">
              <path
                data-v-511e7b02=""
                d="M15.1427 10.4528H4.76172"
                stroke="#3F8CFE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              ></path>{" "}
              <path
                data-v-511e7b02=""
                d="M9.9543 15.6429V5.26196"
                stroke="#3F8CFE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              ></path>
            </g>
          </svg>
          Attachment
        </button>
      </div>
      <ul className="text-[#7D8DA6] h-80 text-base font-semibold mb-0 overflow-x-hidden overflow-y-scroll">
        {studentAttachmentList?.length === 0 && (
          <p className="text-center text-[#7D8DA6] text-base font-nunito font-semibold h-full flex items-center justify-center">
            No Attachment found!
          </p>
        )}

        {studentAttachmentList?.map((item) => {
          return (
            <li
              key={item.id}
              className="list__item text-[16px] leading-[26px] text-gray-500 py-2.5 px-[1.875rem] cursor-pointer hover:bg-blue-50 font-semibold font-nunito"
            >
              <span className="text-[14px]">
                {item.student_info?.first_name} {item.student_info?.last_name}
              </span>
              <br />
              <a
                className="text-gray-500 text-ellipsis"
                href="#k"
                target="_blank"
              >
                {item?.file?.split("?")[0].split("_path/")[1]}
              </a>
            </li>
          );
        })}
        {/* {studentAttachmentList.length !== 0 ? (
          studentAttachmentList.map((item) => (
            <li
              key={item.id}
              className="bg-[#fbfcfe] text-base text-gray-300 py-3 px-7 hover:bg-blue-50 font-semibold"
            >
              <a
                className={"text-ellipsis text-gray-600"}
                href={item.file}
                target={"_blank"}
                rel="noreferrer"
              >
                {item.file && item.file.split("_path/")[1].split("?")[0]}
              </a>
            </li>
          ))
        ) : (
          <span className="flex items-center justify-center h-full">
            No Attachment found!
          </span>
        )} */}
      </ul>
      <Modal
        title={
          <h1 className="text-2xl font-extrabold text-[#042040] mb-6 font-['Nunito_Sans'] ">
            {" "}
            Request new session
          </h1>
        }
        className="w-[506px] "
        footer={null}
        open={modal}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <div className=" w-full h-auto px-4 mb-3 bg-white  cursor-pointer hover:border-gray-400 items-center">
            <Form.Item
              name="image"
              className="m-0 w-full"
              valuePropName="image"
            >
              <Upload beforeUpload={() => false} className="w-full">
                {/* <p className="upload-file flex items-center justify-center w-full">
                Drop file to attach, or
                <span className="underline ml-1"> browse</span>
              </p> */}
                <Button className="border-2 border-gray-200 border-dashed rounded-md w-full h-20 flex justify-center items-center hover:text-gray-600">
                  <span>
                    {" "}
                    Drop file to attach, or{" "}
                    <span className="underline">browse</span>{" "}
                  </span>
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className="mt-6 flex justify-center items-center gap-6 font-['Nunito_sans']">
            <Form.Item className="w-full m-0">
              <Button
                className="bg-[#136df1] text-white border-[#40a9ff] py-4 text-base font-bold leading-5 rounded-[10px] h-auto w-full"
                type="primary"
                htmlType="submit"
              >
                Upload
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default StudentAttach;
