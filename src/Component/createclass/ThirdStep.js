import { LoadingOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalProvider from "../../Context/Index";
import { changeModalAction } from "../../redux/classModal";
import { newClassAction } from "../../redux/newClass";

const ThirdStep = ({ current, setCurrent }) => {
  const firstValues = useSelector((state) => state.firstClass.value);
  const secondValues = useSelector((state) => state.secondClass.value);
  const { baseurl } = GlobalProvider();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const next = () => {
    setCurrent(current + 1);
  };
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
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.post(
    //   "https://api.staging.batchlearn.com/api/v1/classrooms/class_room_create/",
    //   data,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
  };

  return (
    <div className="text-center ">
      <h1 className="mb-10 text-lg font-semibold mt-9">
        Creating a classroom will cost $5
      </h1>
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
        {current === 0 && (
          <Button type="primary" htmlType="submit" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === 2 && (
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => createclass()}
          >
            {loading ? <LoadingOutlined /> : <span>Done</span>}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ThirdStep;
