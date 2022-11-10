import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGrid from "@fullcalendar/timegrid";
import LoadingModal from "../Component/Modal/LoadingModal";
import GlobalProvider from "../Context/Index";
// import listPlugin from "@fullcalendar/";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { studentDataSlice } from "../redux/profileInfo";
import { changeModalAction } from "../redux/classModal";

const Dashboard = () => {
  // const studentData = useSelector((state) => state.addSubjectFilterData.value);
  // console.log(studentData);
  const { baseurl } = GlobalProvider();
  const dispatch = useDispatch();

  const [classroom, setClassroom] = useState([]);
  // const [selectDate, setSelectDate] = useState("");

  useEffect(() => {
    baseurl
      .get(
        "/classrooms/?min_date=2022-10-29%2000:00&max_date=2022-11-05%2023:59&school=&subject="
      )
      .then((res) => {
        setClassroom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const events = classroom.map((user) => ({
    title: user.title,
    id: user.id,
    start: moment(user.class_date).format("YYYY-MM-DD"),
    color:
      (user.status === "Pending" && "#FFBF23") ||
      (user.status === "Accepted" && "#52C16A") ||
      (user.status === "Ended" && "#FF6A55"),
  }));
  const eventContent = (arg) => {
    const eventTitle = arg.event;

    const eventIcon = `<div class="flex items-center gap-2 p-1.5">
        <span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
             
              id="mask0_1355_12859"
              maskUnits="userSpaceOnUse"
              x="1"
              y="12"
              width="15"
              height="8"
              style={{maskType: "alpha"}}
            >
              <path
                
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.83347 12.7939H15.7519V19.3019H1.83347V12.7939Z"
                fill="white"
              ></path>
            </mask>
            <g  mask="url(#mask0_1355_12859)">
              <path
                
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.79266 14.1689C6.24524 14.1689 3.20832 14.4962 3.20832 16.0591C3.20832 17.2984 5.08749 17.9273 8.79266 17.9273C12.4978 17.9273 14.377 17.292 14.377 16.0408C14.377 14.7987 12.4978 14.1689 8.79266 14.1689ZM8.79255 19.3023C6.88955 19.3023 1.83322 19.3023 1.83322 16.0591C1.83322 12.7939 7.07105 12.7939 8.79255 12.7939C11.78 12.7939 15.7519 13.1304 15.7519 16.0408C15.7519 19.3023 10.5141 19.3023 8.79255 19.3023Z"
                fill="#FFFFFF"
              ></path>
            </g>
            <path
            
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.79261 3.20835C6.9547 3.20835 5.45962 4.70343 5.45962 6.54043C5.45962 8.37743 6.9547 9.87252 8.79261 9.87252H8.82103C9.7047 9.86885 10.537 9.52143 11.1613 8.89168C11.7864 8.26377 12.1284 7.42868 12.1247 6.54318C12.1247 4.70343 10.6296 3.20835 8.79261 3.20835ZM8.79256 11.2475C6.19656 11.2475 4.08456 9.13554 4.08456 6.54046C4.08456 3.94537 6.19656 1.83337 8.79256 1.83337C11.3876 1.83337 13.4996 3.94537 13.4996 6.54046C13.5051 7.79079 13.0202 8.97146 12.1366 9.86062C11.2547 10.7507 10.0768 11.243 8.82373 11.2475H8.79256Z"
              fill="#FFFFFF"
            ></path>
            <path
           
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1091 10.2042C14.7717 10.2042 14.4775 9.95582 14.4289 9.61207C14.3766 9.23624 14.6379 8.88791 15.0137 8.83566C16.1577 8.67524 17.0212 7.68249 17.0231 6.52566C17.0231 5.37616 16.1999 4.40632 15.0678 4.22116C14.6929 4.15882 14.439 3.80591 14.5004 3.43099C14.5618 3.05607 14.9166 2.80399 15.2896 2.86357C17.0909 3.15874 18.3981 4.69966 18.3981 6.52657C18.3944 8.36449 17.0221 9.94299 15.2053 10.1978C15.1732 10.2024 15.1411 10.2042 15.1091 10.2042Z"
              fill="#FFFFFF"
            ></path>{" "}
            <mask
           
              id="mask1_1355_12859"
              maskUnits="userSpaceOnUse"
              x="16"
              y="12"
              width="5"
              height="5"
              style={{maskType: "alpha"}}
            >
              <path
              
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.3582 12.3599H20.1474V16.9226H16.3582V12.3599Z"
                fill="white"
              ></path>
            </mask>
            <g  mask="url(#mask1_1355_12859)">
              <path
                
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.2376 16.9226C17.9598 16.9226 17.6986 16.753 17.595 16.4789C17.4602 16.1242 17.639 15.7263 17.9937 15.5925C18.7729 15.2973 18.7729 14.9371 18.7729 14.7831C18.7729 14.2633 18.1578 13.9077 16.9451 13.7271C16.5692 13.6703 16.3098 13.3201 16.3657 12.9452C16.4226 12.5693 16.7792 12.3173 17.1477 12.3658C19.6282 12.7371 20.1479 13.8857 20.1479 14.7831C20.1479 15.4513 19.8592 16.3561 18.4814 16.8777C18.4017 16.9079 18.3192 16.9226 18.2376 16.9226Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
          </span>
        <span class="w-full overflow-hidden text-ellipsis text-sm">
          ${eventTitle.title}
        </span>
      </div>`;
    return { html: eventIcon };
  };

  return (
    <div className="text-black pt-24 pl-24 pr-8 overflow-x-visible">
      <FullCalendar
        dateClick={(e) => {
          dispatch(changeModalAction(true));
          // setOpenModal(true);
          // setSelectDate(e.date);
        }}
        plugins={[dayGridPlugin, interactionPlugin, timeGrid]}
        events={events}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventContent={(arg) => eventContent(arg)}
      />
    </div>
  );
};

export default Dashboard;
