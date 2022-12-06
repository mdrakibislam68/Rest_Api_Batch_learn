import { Button, Tabs } from "antd";
import React from "react";
import Addcards from "./Addcards";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import Item from "antd/lib/list/Item";
import InvoiceTable from "./InvoiceTable";

const Billings = () => {
  return (
    <div className="pr-9 pt-28 pl-28 transition-all">
      <div className="title flex items-center gap-2">
        <span>
          <svg
            data-v-402ac58c=""
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#6CB5FE"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              data-v-402ac58c=""
              d="M16.875 10H13.75V3.125C13.75 2.62772 13.5525 2.15081 13.2008 1.79917C12.8492 1.44754 12.3723 1.25 11.875 1.25H3.125C2.62772 1.25 2.15081 1.44754 1.79917 1.79917C1.44754 2.15081 1.25 2.62772 1.25 3.125V15.625C1.25 16.4538 1.57924 17.2487 2.16529 17.8347C2.75134 18.4208 3.5462 18.75 4.375 18.75H15.625C16.4538 18.75 17.2487 18.4208 17.8347 17.8347C18.4208 17.2487 18.75 16.4538 18.75 15.625V11.875C18.75 11.3777 18.5525 10.9008 18.2008 10.5492C17.8492 10.1975 17.3723 10 16.875 10ZM2.5 15.625V3.125C2.5 2.95924 2.56585 2.80027 2.68306 2.68306C2.80027 2.56585 2.95924 2.5 3.125 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V15.625C12.4963 16.3017 12.716 16.9608 13.125 17.5H4.375C3.87772 17.5 3.40081 17.3025 3.04917 16.9508C2.69754 16.5992 2.5 16.1223 2.5 15.625ZM17.5 15.625C17.5 16.1223 17.3025 16.5992 16.9508 16.9508C16.5992 17.3025 16.1223 17.5 15.625 17.5C15.1277 17.5 14.6508 17.3025 14.2992 16.9508C13.9475 16.5992 13.75 16.1223 13.75 15.625V11.25H16.875C17.0408 11.25 17.1997 11.3158 17.3169 11.4331C17.4342 11.5503 17.5 11.7092 17.5 11.875V15.625Z"
              fill="#6CB5FE"
            ></path>{" "}
            <path
              data-v-402ac58c=""
              d="M4.375 5H6.875C7.04076 5 7.19973 4.93415 7.31694 4.81694C7.43415 4.69973 7.5 4.54076 7.5 4.375C7.5 4.20924 7.43415 4.05027 7.31694 3.93306C7.19973 3.81585 7.04076 3.75 6.875 3.75H4.375C4.20924 3.75 4.05027 3.81585 3.93306 3.93306C3.81585 4.05027 3.75 4.20924 3.75 4.375C3.75 4.54076 3.81585 4.69973 3.93306 4.81694C4.05027 4.93415 4.20924 5 4.375 5Z"
              fill="#6CB5FE"
            ></path>{" "}
            <path
              data-v-402ac58c=""
              d="M10.625 8.125H4.375C4.20924 8.125 4.05027 8.19085 3.93306 8.30806C3.81585 8.42527 3.75 8.58424 3.75 8.75C3.75 8.91576 3.81585 9.07473 3.93306 9.19194C4.05027 9.30915 4.20924 9.375 4.375 9.375H10.625C10.7908 9.375 10.9497 9.30915 11.0669 9.19194C11.1842 9.07473 11.25 8.91576 11.25 8.75C11.25 8.58424 11.1842 8.42527 11.0669 8.30806C10.9497 8.19085 10.7908 8.125 10.625 8.125Z"
              fill="#6CB5FE"
            ></path>{" "}
            <path
              data-v-402ac58c=""
              d="M10.625 10.625H4.375C4.20924 10.625 4.05027 10.6908 3.93306 10.8081C3.81585 10.9253 3.75 11.0842 3.75 11.25C3.75 11.4158 3.81585 11.5747 3.93306 11.6919C4.05027 11.8092 4.20924 11.875 4.375 11.875H10.625C10.7908 11.875 10.9497 11.8092 11.0669 11.6919C11.1842 11.5747 11.25 11.4158 11.25 11.25C11.25 11.0842 11.1842 10.9253 11.0669 10.8081C10.9497 10.6908 10.7908 10.625 10.625 10.625Z"
              fill="#6CB5FE"
            ></path>{" "}
            <path
              data-v-402ac58c=""
              d="M10.625 13.125H7.5C7.33424 13.125 7.17527 13.1908 7.05806 13.3081C6.94085 13.4253 6.875 13.5842 6.875 13.75C6.875 13.9158 6.94085 14.0747 7.05806 14.1919C7.17527 14.3092 7.33424 14.375 7.5 14.375H10.625C10.7908 14.375 10.9497 14.3092 11.0669 14.1919C11.1842 14.0747 11.25 13.9158 11.25 13.75C11.25 13.5842 11.1842 13.4253 11.0669 13.3081C10.9497 13.1908 10.7908 13.125 10.625 13.125Z"
              fill="#6CB5FE"
            ></path>
          </svg>
        </span>
        <span>
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
        </span>
        <span>Billings</span>
      </div>
      <div>
        <Tabs defaultActiveKey="1">
          <Item tab="Cards" key="1">
            <Addcards />
          </Item>
          <Item tab="Invoice" key="2">
            <InvoiceTable />
          </Item>
        </Tabs>
      </div>
    </div>
  );
};

export default Billings;
