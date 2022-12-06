import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalProvider from "../../Context/Index";
import { firstStepAction } from "../../redux/classFirst";
import { changeModalAction } from "../../redux/classModal";
import { newClassAction } from "../../redux/newClass";

const ThirdStep = ({ current, setCurrent, getImage }) => {
  const firstValues = useSelector((state) => state.firstClass.value);
  const { baseurl } = GlobalProvider();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const imageData = new FormData();

  const prev = () => {
    setCurrent(current - 1);
  };

  const createclass = async () => {
    setLoading(true);
    let data = {
      title: firstValues.title,
      description: firstValues.description,
      class_date: firstValues.class_date,
      subject: firstValues.subject,
    };

    await baseurl
      .post("classrooms/class_room_create/", data)
      .then((res) => {
        dispatch(newClassAction(res.data));
        dispatch(changeModalAction(false));
        setCurrent(0);
        setLoading(false);
        dispatch(firstStepAction(""));
        getImage.map(async (per) => {
          imageData.append("file", per.originFileObj);
          imageData.append("classroom", res.data.id);
          imageData.append("student", res.data.creator);
          return await baseurl
            .post(
              `classrooms/${res.data.id} /student-attachment-create/`,
              imageData
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center ">
      <h1 className="mb-10 text-lg font-semibold mt-9">
        Creating a classroom will cost $5
      </h1>
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
        {current === 2 && (
          <Form.Item className="max-w-[124px] w-full m-0">
            <Button
              className="bg-[#136df1] text-white border-[#40a9ff] py-4 text-base font-bold leading-5 rounded-[10px] h-auto w-full"
              type="primary"
              htmlType="submit"
              onClick={() => createclass()}
            >
              {loading ? <LoadingOutlined /> : <span>Done</span>}
            </Button>
          </Form.Item>
        )}
      </div>
    </div>
  );
};

export default ThirdStep;
