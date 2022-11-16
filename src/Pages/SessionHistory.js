import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import GlobalProvider from "../Context/Index";

const SessionHistory = () => {
  const { baseurl } = GlobalProvider();
  const [sessionHistory, setSessionHistory] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subjuct",
      dataIndex: "subjuct",
      key: "subjuct",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
  ];
  useEffect(() => {
    getInvoiceData(1);
  }, []);
  const getInvoiceData = async (page) => {
    await baseurl
      .get(`classrooms/pagination-list/?page=${page}`)
      .then((res) => {
        setSessionHistory(res.data.results);
        setTotalPage(res.data.count);
      })
      .catch((err) => console.log(err));
  };
  const data =
    sessionHistory &&
    sessionHistory.map((item, index) => ({
      key: index,
      title: item.title,
      subjuct: item.subject.name,
      student: item.student_count,
      date: item.class_date,
      status:
        (item.status === "Ended" && (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-700 inline-block rounded-full mr-2"></span>
            Ended
          </div>
        )) ||
        (item.status === "Accepted" && (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-700 inline-block rounded-full mr-2 "></span>
            Succeed
          </div>
        )) ||
        (item.status === "Pending" && (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-700 inline-block rounded-full mr-2"></span>
            Pending
          </div>
        )) ||
        (item.status === "Started" && (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-700 inline-block rounded-full mr-2"></span>
            Started
          </div>
        )),
    }));

  return (
    <div className="pt-[108px] pl-[108px] pr-8 ">
      <div className="flex gap-3 items-center mb-9">
        <svg
          data-v-44a2d60b=""
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g data-v-44a2d60b="" clipPath="url(#clip0_2281_16671)">
            <path
              data-v-44a2d60b=""
              d="M10 0C7.53792 0.00175531 5.16344 0.913852 3.33333 2.56083V0.833333C3.33333 0.61232 3.24554 0.400358 3.08926 0.244078C2.93298 0.0877974 2.72101 0 2.5 0C2.27899 0 2.06702 0.0877974 1.91074 0.244078C1.75446 0.400358 1.66667 0.61232 1.66667 0.833333V3.33333C1.66667 3.99637 1.93006 4.63226 2.3989 5.1011C2.86774 5.56994 3.50363 5.83333 4.16667 5.83333H6.66667C6.88768 5.83333 7.09964 5.74554 7.25592 5.58926C7.4122 5.43298 7.5 5.22101 7.5 5C7.5 4.77899 7.4122 4.56703 7.25592 4.41074C7.09964 4.25446 6.88768 4.16667 6.66667 4.16667H4.16667C4.13856 4.1625 4.11074 4.15666 4.08333 4.14917C5.44127 2.78152 7.23177 1.92756 9.14922 1.73305C11.0667 1.53855 12.9922 2.01555 14.5971 3.08263C16.202 4.14972 17.3868 5.74075 17.9493 7.58413C18.5118 9.42751 18.4171 11.409 17.6813 13.1903C16.9455 14.9716 15.6144 16.4423 13.915 17.3515C12.2156 18.2606 10.2533 18.5517 8.36318 18.1752C6.47303 17.7986 4.77216 16.7778 3.55088 15.2868C2.32961 13.7959 1.66364 11.9273 1.66667 10C1.66667 9.77899 1.57887 9.56703 1.42259 9.41074C1.26631 9.25446 1.05435 9.16667 0.833333 9.16667C0.61232 9.16667 0.400358 9.25446 0.244078 9.41074C0.0877974 9.56703 0 9.77899 0 10C0 11.9778 0.58649 13.9112 1.6853 15.5557C2.78412 17.2002 4.3459 18.4819 6.17317 19.2388C8.00043 19.9957 10.0111 20.1937 11.9509 19.8079C13.8907 19.422 15.6725 18.4696 17.0711 17.0711C18.4696 15.6725 19.422 13.8907 19.8079 11.9509C20.1937 10.0111 19.9957 8.00043 19.2388 6.17317C18.4819 4.3459 17.2002 2.78412 15.5557 1.6853C13.9112 0.58649 11.9778 0 10 0V0Z"
              fill="#95A3BD"
            ></path>{" "}
            <path
              data-v-44a2d60b=""
              d="M10 5C9.77899 5 9.56703 5.0878 9.41075 5.24408C9.25447 5.40036 9.16667 5.61232 9.16667 5.83333V10C9.16672 10.221 9.25454 10.4329 9.41083 10.5892L11.9108 13.0892C12.068 13.241 12.2785 13.325 12.497 13.3231C12.7155 13.3212 12.9245 13.2335 13.079 13.079C13.2335 12.9245 13.3212 12.7155 13.3231 12.497C13.325 12.2785 13.241 12.068 13.0892 11.9108L10.8333 9.655V5.83333C10.8333 5.61232 10.7455 5.40036 10.5893 5.24408C10.433 5.0878 10.221 5 10 5Z"
              fill="#95A3BD"
            ></path>
          </g>{" "}
          <defs data-v-44a2d60b="">
            <clipPath data-v-44a2d60b="" id="clip0_2281_16671">
              <rect
                data-v-44a2d60b=""
                width="20"
                height="20"
                fill="white"
              ></rect>
            </clipPath>
          </defs>
        </svg>
        <svg
          fill="none"
          height="1"
          viewBox="0 0 12 1"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
          data-v-402ac58c=""
        >
          <line
            stroke="#8391A9"
            x2="12"
            y1="0.5"
            y2="0.5"
            data-v-402ac58c=""
          ></line>
        </svg>
        <h1>Session History</h1>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          // total: totalPage,
          onChange: (page) => {
            //   getInvoiceData(page);
          },
        }}
      />
    </div>
  );
};

export default SessionHistory;
