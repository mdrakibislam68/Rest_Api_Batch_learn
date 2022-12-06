import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalProvider from "../Context/Index";
import moment from "moment";
import CountDown from "../Component/classroom/CountDown";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import Desc from "../Component/classroom/Desc";
import { Button, Form, Input } from "antd";
import CommentSec from "../Component/classroom/CommentSec";
import { useDispatch, useSelector } from "react-redux";
import comment, { addNewComment, loadCommentsData } from "../redux/comment";
import ReplaySec from "../Component/classroom/ReplaySec";
import ClassMember from "../Component/classroom/ClassMember";
import StudentAttach from "../Component/classroom/StudentAttach";
import TeacherAttach from "../Component/classroom/TeacherAttach";
import { loadStudentAttachmentList } from "../redux/studentAttachmentList";

const Classroom = ({ children }) => {
  const { baseurl } = GlobalProvider();
  const { id } = useParams();
  const [classData, setClassData] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(true);
  const [centralLoading, setcentralLoading] = useState(null);
  // const [getComment, setGetComment] = useState("");
  const [show, setShow] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const URL = `classrooms/${id}/classroom-comments/?page=1&page_size=10`;
  const { studentData } = useSelector((state) => state.profile);
  const { results } = useSelector((state) => state.comment);
  const date = moment(classData.class_date).format("YYYY-MM-DD h:mm:ss a");
  // const [studentAttach, setStudentAttach] = useState([]);
  const url = `classrooms/${id}/student-attachment-list/?page=1&page_size=10`;
  const { studentAttachmentList } = useSelector(
    (state) => state.studentAttachList
  );
  useEffect(() => {
    setcentralLoading(true);
    baseurl
      .get(`classrooms/${id}/public-details/`)
      .then((res) => {
        setClassData(res.data);
        setLoading(false);
        setcentralLoading(false);
      })
      .catch((err) => console.log(err));
    setcentralLoading(false);
  }, []);

  useEffect(() => {
    setcentralLoading(true);
    baseurl
      .get(`classrooms/${id}/teacher-attachment-list/?page=1&page_size=10`)
      .then((res) => {
        setAttachment(res.data.results);
        setcentralLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setcentralLoading(false);
      });
  }, []);

  useEffect(() => {
    // baseurl
    //   .get(`classrooms/${id}/student-attachment-list/?page=1&page_size=10`)
    //   .then((res) => setStudentAttach(res.data.results))
    //   .catch((err) => console.log(err));
    dispatch(loadStudentAttachmentList({ baseurl, url }));
  }, []);

  useEffect(() => {
    dispatch(loadCommentsData({ baseurl, URL }));
  }, []);
  // useEffect(() => {
  //   baseurl
  //     .get(`classrooms/${id}/classroom-comments/?page=1&page_size=10`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleComment = (e) => {
    baseurl
      .post(`classrooms/${id}/classroom-comment-create/`, {
        comment: e.comment,
        classroom: id,
        creator: studentData.id,
      })
      .then((res) => {
        dispatch(addNewComment(res?.data));
      })
      .catch((err) => console.log(err));
    form.resetFields();
  };

  return (
    <>
      {centralLoading ? (
        <LockOutlined />
      ) : (
        <div className="pr-8 pt-[108px]  pl-[108px] transition-all">
          <div className="flex items-center gap-2">
            <svg
              className="fill-slate-700"
              data-v-4b07702c=""
              data-v-402ac58c=""
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <mask
                data-v-4b07702c=""
                data-v-402ac58c=""
                id="mask0_1360_13002"
                maskUnits="userSpaceOnUse"
                x="2"
                y="1"
                width="15"
                height="18"
              >
                <path
                  data-v-4b07702c=""
                  data-v-402ac58c=""
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.50024 1.67627H16.7108V18.2209H2.50024V1.67627Z"
                  fill="white"
                ></path>
              </mask>{" "}
              <g
                data-v-4b07702c=""
                data-v-402ac58c=""
                mask="url(#mask0_1360_13002)"
              >
                <path
                  data-v-4b07702c=""
                  data-v-402ac58c=""
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.31117 2.92626C4.93034 2.92626 3.78367 4.0446 3.75117 5.42376V14.3363C3.72034 15.7638 4.84534 16.9396 6.25867 16.9713H12.9787C14.3695 16.9138 15.4712 15.7579 15.4612 14.3413V6.94959L11.5987 2.92626H6.32117H6.31117ZM6.32116 18.2213H6.23033C4.12866 18.1738 2.45533 16.4254 2.50116 14.3229V5.40877C2.5495 3.34127 4.257 1.67627 6.3095 1.67627H6.32366H11.8653C12.0353 1.67627 12.1978 1.74544 12.3162 1.86794L16.537 6.26544C16.6487 6.38127 16.7112 6.5371 16.7112 6.69794V14.3363C16.7262 16.4271 15.0978 18.1354 13.0037 18.2204L6.32116 18.2213Z"
                  fill="#7AAFFE"
                ></path>
              </g>{" "}
              <path
                data-v-4b07702c=""
                data-v-402ac58c=""
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.0821 7.48675H13.7862C12.2612 7.48258 11.0212 6.23925 11.0212 4.71591V2.29175C11.0212 1.94675 11.3012 1.66675 11.6462 1.66675C11.9912 1.66675 12.2712 1.94675 12.2712 2.29175V4.71591C12.2712 5.55258 12.9521 6.23425 13.7879 6.23675H16.0821C16.4271 6.23675 16.7071 6.51675 16.7071 6.86175C16.7071 7.20675 16.4271 7.48675 16.0821 7.48675Z"
                fill="#7AAFFE"
              ></path>{" "}
              <path
                data-v-4b07702c=""
                data-v-402ac58c=""
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4906 13.4236H6.99057C6.64557 13.4236 6.36557 13.1436 6.36557 12.7986C6.36557 12.4536 6.64557 12.1736 6.99057 12.1736H11.4906C11.8356 12.1736 12.1156 12.4536 12.1156 12.7986C12.1156 13.1436 11.8356 13.4236 11.4906 13.4236Z"
                fill="#7AAFFE"
              ></path>{" "}
              <path
                data-v-4b07702c=""
                data-v-402ac58c=""
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.7865 10.2969H6.98984C6.64484 10.2969 6.36484 10.0169 6.36484 9.67187C6.36484 9.32687 6.64484 9.04688 6.98984 9.04688H9.7865C10.1315 9.04688 10.4115 9.32687 10.4115 9.67187C10.4115 10.0169 10.1315 10.2969 9.7865 10.2969Z"
                fill="#7AAFFE"
              ></path>
            </svg>
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
            <span className="text-gray-500 leading-6 font-semibold text-sm">
              Class Details
            </span>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-9 pb-7">
            <div className="grid col-span-12 lg:col-span-8  gap-6">
              <div className="bg-[#ecf4ff] col-span-12 lg:col-span-8 rounded-xl h-72">
                {loading ? <LoadingOutlined /> : <CountDown date={date} />}
              </div>
              {/* Description Section */}
              <div className="my-10 font-['Nunito_sans'] col-span-12 lg:col-span-8 ">
                <Desc classData={classData} />
              </div>
              <div className="grid grid-cols-12 gap-5 col-span-12 lg:col-span-8">
                <div className="border border-[#f1f1f1] p-5 rounded-md  w-full relative col-span-12 xl:col-span-7">
                  <div className="text-base leading-[25px] text-black font-bold ">
                    Classroom comments
                  </div>
                  <div className="flex flex-col justify-between   my-2.5">
                    <div className=" mt-2.5 overflow-y-scroll h-[480px] rounded-lg">
                      {results?.length === 0 && (
                        <p className="text-center flex items-center h-full justify-center">
                          No comment found!
                        </p>
                      )}
                      {results &&
                        results?.map((comment) => (
                          <div
                            key={comment.id}
                            className="border border-[#f1f1f1] rounded-md mt-2.5 mr-2.5 p-2.5"
                          >
                            <CommentSec
                              key={comment.id}
                              id={id}
                              comment={comment}
                              show={show}
                              setShow={setShow}
                            >
                              {comment.reply_comments.map((replay) => {
                                return (
                                  <ReplaySec result={replay} key={replay.id} />
                                );
                              })}
                            </CommentSec>
                          </div>
                        ))}
                    </div>
                    <div className="w-full">
                      <Form
                        form={form}
                        className="flex items-center w-full gap-2 mt-2.5"
                        onFinish={handleComment}
                      >
                        <Form.Item name="comment" className="w-full m-0">
                          <Input
                            type="text"
                            className="rounded-[40px]"
                            placeholder="Reply to comment"
                          />
                        </Form.Item>
                        <Form.Item className="m-0">
                          <Button
                            htmlType="submit"
                            className="border-none p-0 w-7 h-7"
                          >
                            <svg
                              id="Capa_1"
                              enableBackground="new 0 0 404.644 404.644"
                              height="28"
                              viewBox="0 0 404.644 404.644"
                              width="28"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path
                                  d="m5.535 386.177c-3.325 15.279 8.406 21.747 19.291 16.867l367.885-188.638h.037c4.388-2.475 6.936-6.935 6.936-12.08 0-5.148-2.548-9.611-6.936-12.085h-.037l-367.885-188.641c-10.885-4.881-22.616 1.589-19.291 16.869.225 1.035 21.974 97.914 33.799 150.603l192.042 33.253-192.042 33.249c-11.825 52.686-33.575 149.567-33.799 150.603z"
                                  fill="#3F8CFE"
                                ></path>
                              </g>
                            </svg>
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="  col-span-12 xl:col-span-5 h-full min-h-[480px]">
                  <ClassMember />
                </div>
              </div>
              {/* Desc. End */}
            </div>
            {/* Attachment */}
            <div className="col-span-12 lg:col-span-4 rounded-lg  h-full">
              <TeacherAttach attachment={attachment} classData={classData} />
              <div className="border border-gray-200 max-h-[430px] h-full relative rounded-lg">
                <StudentAttach
                  classData={classData}
                  studentAttachmentList={studentAttachmentList}
                  // setStudentAttach={setStudentAttach}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Classroom;
