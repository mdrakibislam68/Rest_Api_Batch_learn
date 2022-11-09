import React, { useEffect, useState } from "react";
import profile from "../../assest/profile1.png";
import { UploadOutlined, UserAddOutlined } from "@ant-design/icons";
import "../../Style/profile.css";
import GlobalProvider from "../../Context/Index";
import { useDispatch, useSelector } from "react-redux";
import { studentDataSlice } from "../../redux/profileInfo";
import PersonalInformation from "./PersonalInformation";
import { Button, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
console.clear();
const Profile = () => {
  const { baseurl } = GlobalProvider();
  const [user, setUser] = useState("");
  const [imgModal, setImgModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(studentDataSlice({ baseurl }));
    baseurl
      .get("auth/profile_info/")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  // const user = useSelector((state) => state.studentData.studentData);
  // console.log(user);

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
  const imgHandle = (e) => {
    console.log(e.target.files);
  };
  return (
    <div className="pr-8 pt-28 pl-28 transition-all">
      {/* Header */}
      <div className="flex items-center gap-2 mb-12">
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
            className="relative  rounded-full  cursor-pointer w-36 h-36 "
          >
            <img src={profile} alt="profile" />
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
          <Form>
            <FormItem className="flex justify-center items-center w-full h-20 mb-3 bg-white border border-gray  border-dashed rounded-md cursor-pointer hover:border-gray-400">
              <input className="" type="file" onChange={imgHandle} />
            </FormItem>
            <Form.Item>
              <Button
                className="w-full font-bold bg-[#40a9ff] text-white py-4   h-11 hover:#40a9ff flex items-center justify-center w-full text-base rounded-xl font-['Nunito_Sans']"
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
