import React, { useState } from "react";
import { Button, Form, message, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import GlobalProvider from "../../Context/Index";
import BillingModal from "../StudentProfile/BillingModal";

const SecondStep = ({ current, setCurrent, steps, setSecondValues }) => {
  const { baseurl } = GlobalProvider();
  const [billingModal, setBillingModal] = useState(false);

  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish = (values) => {
    if (values.image) {
      setSecondValues(values.image.file);
    }
    setCurrent(current + 1);
    setBillingModal(true);

    // const imageData = new FormData();
    // imageData.append("file", values.image.file);
    // imageData.append("classroom", values.image.file);

    // baseurl
    //   .post("classrooms/id/student-attachment-create/", imageData)
    //   .then((res) => {
    //     // setImaData(res.data);
    //     // setIsModalOpen(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div className="mt-9">
      <h1 className="mb-3 ">Attachment:</h1>
      <Form onFinish={onFinish}>
        <div className="flex justify-center w-full h-20 px-4 mb-3 bg-white border-2 border-gray-200 border-dashed rounded-md cursor-pointer hover:border-gray-400 items-center">
          <Form.Item name="image" valuePropName="name">
            <Upload showUploadList={true} beforeUpload={() => false}>
              <p className="upload-file flex items-center justify-center w-full">
                Drop file to attach, or
                <span className="underline ml-1"> browse</span>
              </p>
            </Upload>
          </Form.Item>
        </div>
        <div className="mt-6 flex justify-center">
          {current > 0 && (
            <Button
              className="bg-[#136df1] text-white border-[#40a9ff]  "
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              <span>Previous</span>
            </Button>
          )}
          {current === 1 && (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
          {current === 2 && (
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          )}
        </div>
      </Form>
      <Modal
        className="custom_modal"
        title={
          <h3 className="font-[1.5rem] font-extrabold leading-[30px] mb-10">
            Add Payment Method
          </h3>
        }
        centered
        open={billingModal}
        footer={null}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {/* <BillingModal /> */}
      </Modal>
    </div>
  );
};

export default SecondStep;
