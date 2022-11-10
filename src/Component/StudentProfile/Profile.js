import React, { useEffect, useState } from "react";
import profile from "../../assest/profile1.png";
import "../../Style/profile.css";
import GlobalProvider from "../../Context/Index";
import PersonalInformation from "./PersonalInformation";
import { Button, Form, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import { LoadingOutlined } from "@ant-design/icons";

console.clear();

const Profile = () => {
  const { baseurl } = GlobalProvider();
  const [user, setUser] = useState("");
  const [imgModal, setImgModal] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(user);
  useEffect(() => {
    setLoading(true);
    baseurl
      .get("auth/profile_info/")
      .then((res) => setUser(res.data), setLoading(false))
      .catch((err) => console.log(err));
  }, [imgData]);

  const onFinish = (values) => {
    values = {
      email: values.email,
      first_name: values.firstname,
      last_name: values.lastname,
      phone_number: values.phone,
    };
    console.log(values);
    baseurl
      .put("auth/profile_info/", values)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setImage(e.fileList[0].originFileObj);
    // console.log(e.image.file);
    // let imgForm = new FormData();
    // imgForm.append("file", e.image.file);
  };

  const submitHandler = () => {
    console.log(image);
    let formData = new FormData();

    formData.append("file", image);

    const imgData = formData.get("file");
    console.log(imgData);

    baseurl
      .put("auth/profile_avatar/", formData)
      .then((res) => {
        setImgData(res.data);
        setImgModal(false);
      })
      .catch((err) => console.log(err));
    // console.log(formData);
  };
  // console.log(imgData.avatar);

  return (
    <div className="pr-8 pt-28 pl-28 transition-all">
      {/* Header */}
      <div className="flex items-center gap-2 mb-12">
        <svg
          data-v-cf092bc0=""
          data-v-402ac58c=""
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            data-v-cf092bc0=""
            data-v-402ac58c=""
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.66669 13.288H18.1866V20.0475H3.66669V13.288Z"
            fill="white"
          ></path>
          <g
            data-v-cf092bc0=""
            data-v-402ac58c=""
            mask="url(#mask0_1355_12901)"
          >
            <path
              data-v-cf092bc0=""
              data-v-402ac58c=""
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9275 14.663C7.02154 14.663 5.04154 15.334 5.04154 16.6586C5.04154 17.9951 7.02154 18.6725 10.9275 18.6725C14.8325 18.6725 16.8115 18.0015 16.8115 16.6769C16.8115 15.3404 14.8325 14.663 10.9275 14.663ZM10.9275 20.0475C9.13173 20.0475 3.66656 20.0475 3.66656 16.6585C3.66656 13.6372 7.81081 13.288 10.9275 13.288C12.7232 13.288 18.1866 13.288 18.1866 16.6769C18.1866 19.6982 14.0432 20.0475 10.9275 20.0475Z"
              fill="#3F8CFE"
            ></path>
          </g>
          <path
            data-v-cf092bc0=""
            data-v-402ac58c=""
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.05896 1.83337H15.794V11.5671H6.05896V1.83337Z"
            fill="white"
          ></path>
          <g
            data-v-cf092bc0=""
            data-v-402ac58c=""
            mask="url(#mask1_1355_12901)"
          >
            <path
              data-v-cf092bc0=""
              data-v-402ac58c=""
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9274 3.14205C8.96485 3.14205 7.36802 4.73796 7.36802 6.70055C7.3616 8.65671 8.94652 10.2517 10.9009 10.259L10.9274 10.9135V10.259C12.8891 10.259 14.485 8.66221 14.485 6.70055C14.485 4.73796 12.8891 3.14205 10.9274 3.14205ZM10.9274 11.5671H10.8981C8.21957 11.5588 6.04982 9.37442 6.05899 6.69776C6.05899 4.01651 8.24249 1.83301 10.9274 1.83301C13.6114 1.83301 15.794 4.01651 15.794 6.70051C15.794 9.38451 13.6114 11.5671 10.9274 11.5671Z"
              fill="#3F8CFE"
            ></path>
          </g>
        </svg>
        <svg
          data-v-402ac58c=""
          fill="none"
          height="1"
          viewBox="0 0 12 1"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            data-v-402ac58c=""
            stroke="#8391A9"
            x2="12"
            y1="0.5"
            y2="0.5"
          ></line>
        </svg>

        <h3 className="mb-0 text-[#8391A9] text-sm font-semibold">Profile</h3>
      </div>
      {/* Body */}
      <div className="flex items-center gap-8 mb-10">
        <div>
          <div
            onClick={() => setImgModal(true)}
            className="relative overflow-hidden flex   bg-blue-500 rounded-full  cursor-pointer w-36 h-36 "
          >
            {loading ? (
              <LoadingOutlined />
            ) : (
              <img
                className=""
                src={user.avatar ? user.avatar : profile}
                alt="profile"
              />
            )}

            <span className="rounded-full absolute flex items-center left-0 top-0 justify-center w-full h-full bg-black opacity-0 hover:opacity-60  transition-all">
              <svg
                data-v-4a31a693=""
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-camera fill-white"
              >
                <path
                  data-v-4a31a693=""
                  d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"
                ></path>{" "}
                <path
                  data-v-4a31a693=""
                  d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
                ></path>
              </svg>
            </span>

            {/* <Button icon={profile}>Click to Upload</Button> */}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold font-['Nunito_Sans'] mb-0 text-[#042040] ">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-base font-semibold font-['Nunito_Sans'] mb-0 text-[#042040]">
            {user.email}
          </p>
        </div>
      </div>

      <div>
        <PersonalInformation user={user} onFinish={onFinish} />
      </div>
      <Modal
        open={imgModal}
        onCancel={() => setImgModal(false)}
        footer={null}
        // onOk={handleOk}
      >
        <div>
          <h1 className="text-2xl font-['Nunito_Sans'] font-extrabold text-[#042040]">
            Change profile picture
          </h1>
          {/* <Upload className="flex justify-center items-center w-full h-20 mb-3 bg-white border border-gray  border-dashed rounded-md cursor-pointer hover:border-gray-400">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
          <Form onFinish={submitHandler}>
            <FormItem
              name="image"
              valuePropName="name"
              className="flex justify-center items-center w-full h-20 mb-3 bg-white border border-gray  border-dashed rounded-md cursor-pointer hover:border-gray-400"
            >
              {/* <input className="" type="file" onChange={imgHandle} /> */}
              {/* <ImgCrop rotate> */}
              <Upload
                beforeUpload={() => false}
                showUploadList={true}
                maxCount={1}
                onChange={(e) => handleChange(e)}
              >
                <p className="upload-file flex items-center justify-center w-full">
                  Drop file to attach, or
                  <span className="underline ml-1"> browse</span>
                </p>
              </Upload>
              {/* </ImgCrop> */}
            </FormItem>
            <Form.Item>
              <Button
                className=" font-bold bg-[#40a9ff] text-white py-4   h-11 hover:#40a9ff flex items-center justify-center w-full text-base rounded-xl font-['Nunito_Sans']"
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
