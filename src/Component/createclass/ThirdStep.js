import { Button, message } from "antd";
import React from "react";
import GlobalProvider from "../../Context/Index";

const ThirdStep = ({ current, setCurrent, createclass }) => {
  //  const { setOpenModal } = GlobalProvider();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
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
