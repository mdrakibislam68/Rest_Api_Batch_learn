import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import GlobalProvider from "../../Context/Index";
import moment from "moment";

const InvoiceTable = () => {
  const { baseurl } = GlobalProvider();
  const [invoiceData, setInvoiceData] = useState("");
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
    getInvoiceData(1);
  }, []);
  const getInvoiceData = async (page) => {
    await baseurl
      .get(`billing/analytics/student_invoices/?page=${page}`)
      .then((res) => {
        setInvoiceData(res.data.results);
        setTotalPage(res.data.count);
      })
      .catch((err) => console.log(err));
  };

  const data =
    invoiceData &&
    invoiceData.map((item, index) => ({
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
          total: totalPage,
          onChange: (page) => {
            getInvoiceData(page);
          },
        }}
      />
    </div>
  );
};

export default InvoiceTable;
