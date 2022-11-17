import { Button, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalProvider from "../../Context/Index";
import { changeModalAction } from "../../redux/classModal";

const ThirdStep = ({ current, setCurrent }) => {
  const firstValues = useSelector((state) => state.firstClass.value);
  const secondValues = useSelector((state) => state.secondClass.value);
  const { baseurl } = GlobalProvider();
  const dispatch = useDispatch();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const createclass = async () => {
    let data = {
      title: firstValues.title,
      description: firstValues.description,
      class_date: firstValues.class_date,
      subject: firstValues.subject,
    };
    await baseurl
      .post("classrooms/class_room_create/", data)
      .then((res) => {
        console.log(res.data);
        dispatch(changeModalAction(false));
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
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default ThirdStep;
