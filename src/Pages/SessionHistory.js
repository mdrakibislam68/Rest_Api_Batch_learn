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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Paid At",
      dataIndex: "paid_at",
      key: "paid_at",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      // render: (_, { tags }) => (
      //   <>
      //     {tags.map((tag) => {
      //       let color = tag.length > 5 ? "geekblue" : "green";
      //       if (tag === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
  ];
  useEffect(() => {
    getInvoiceData();
  }, []);
  const getInvoiceData = async (page) => {
    await baseurl
      .get(`classrooms/live_class/`)
      .then((res) => {
        console.log(res.data.results);
        // setTotalPage(res.data.count);
      })
      .catch((err) => console.log(err));
  };
  const data =
    sessionHistory &&
    sessionHistory.map((item, index) => ({
      key: index,
      title: item.metadata.title,
      amount: item.amount,
      paid_at: moment(item.created).format("YYYY-MM-DD LT"),
      status: item.status,
    }));

  return (
    <div>
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
