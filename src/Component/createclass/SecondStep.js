import React from "react";
import { Button, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { secondStepAction } from "../../redux/classSecond";
import "./second.css";

const SecondStep = ({ current, setCurrent, setGetImage, getImage }) => {
  const dispatch = useDispatch();
  const prev = () => {
    setCurrent(current - 1);
  };
  const onFinish = (values) => {
    setGetImage(values.image && values.image.fileList);
    setCurrent(current + 1);
    dispatch(secondStepAction(values.image.fileList));
  };

  const defaultFileList = getImage?.map((el) => ({
    uid: el.uid,
    name: el.name,
    status: el.status,
  }));
  return (
    <div className="mt-9">
      <h1 className="mb-3 ">Attachment:</h1>
      <Form onFinish={onFinish}>
        <div className=" w-full h-auto px-4 mb-3 bg-white  cursor-pointer hover:border-gray-400 items-center">
          <Form.Item name="image" className="m-0 w-full" valuePropName="image">
            <Upload
              beforeUpload={() => false}
              className="w-full"
              defaultFileList={defaultFileList}
            >
              {/* <p className="upload-file flex items-center justify-center w-full">
                Drop file to attach, or
                <span className="underline ml-1"> browse</span>
              </p> */}
              <Button
                className="border-2 border-gray-200 border-dashed rounded-md w-full h-20 flex justify-center items-center hover:text-gray-600"
                icon={<UploadOutlined />}
              >
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
          {current > 0 && (
            <Form.Item className="max-w-[124px] w-full m-0">
              <Button
                className="bg-[#136df1] text-white border-[#40a9ff] py-4 text-base font-bold leading-5 rounded-[10px] h-auto w-full"
                onClick={() => prev()}
              >
                <span>Previous</span>
              </Button>
            </Form.Item>
          )}
          {current === 1 && (
            <Form.Item className="max-w-[124px] w-full m-0">
              <Button
                className="bg-[#136df1] text-white border-[#40a9ff] py-4 text-base font-bold leading-5 rounded-[10px] h-auto w-full"
                type="primary"
                htmlType="submit"
              >
                Next
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
      {/* <Modal
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
        <BillingModal />
      </Modal> */}
    </div>
  );
};

export default SecondStep;
