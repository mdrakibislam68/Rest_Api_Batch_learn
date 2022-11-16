import { Button, message } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import GlobalProvider from "../../Context/Index";

const ThirdStep = ({ current, setCurrent }) => {
  const firstValues = useSelector((state) => state.firstClass.value);
  const secondValues = useSelector((state) => state.secondClass.value);

  const { baseurl } = GlobalProvider();
  //  const { setOpenModal } = GlobalProvider();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
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
      subject: firstValues.subject,
    };
    await baseurl
      .post("classrooms/class_room_create/", data)
      .then((res) => {
        console.log(res.data);
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
