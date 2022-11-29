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
import { addNewComment, loadCommentsData } from "../redux/comment";
import ReplaySec from "../Component/classroom/ReplaySec";

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
    dispatch(loadCommentsData({ baseurl, URL }));
  }, []);

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
          <div className="grid grid-cols-12 gap-6 mt-9">
            <div className="grid col-span-12 lg:col-span-8  gap-6">
              <div className="bg-[#ecf4ff] col-span-12 lg:col-span-8 rounded-xl h-72">
                {loading ? <LoadingOutlined /> : <CountDown date={date} />}
              </div>
              {/* Description Section */}
              <div className="my-10 font-['Nunito_sans'] col-span-12 lg:col-span-8 ">
                <Desc classData={classData} />
              </div>
              <div className="relative border border-[#f1f1f1] p-5 rounded-md  w-full relative overflow-hidden mb-6 col-span-12 lg:col-span-4">
                <div className="text-base leading-[25px] text-black font-bold ">
                  Classroom comments
                </div>
                <div className="flex flex-col justify-between min-h-[480px]">
                  <div>
                    {results &&
                      results.map((comment) => (
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
                      ))}
                    {/* {results.map((comment) =>
                      
                    )} */}
                    {/* <ReplaySec key={replay.id} result={replay} /> */}
                  </div>
                  <div className="w-full">
                    <Form
                      form={form}
                      className="flex items-center w-full gap-2"
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
              <div className="border border-[#f1f1f1] col-span-12 xl:col-span-4">
                Classroom Members
              </div>
              {/* Desc. End */}
            </div>
            {/* Attachment */}
            <div className="col-span-12 md:col-span-4 rounded-lg max-h-[430px] h-full">
              {classData.lock === true ? (
                <div className="flex border border-gray-200 items-center h-full justify-center flex-col">
                  <svg
                    data-v-61ba0d1f=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="54"
                    height="54"
                    viewBox="0 0 24 24"
                    className="mx-auto fill-blue-15 mb-4 fill-[#ECF4FF]"
                  >
                    <path
                      data-v-61ba0d1f=""
                      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 17h-8v-6h8v6zm-6-6v-2c0-1.104.897-2 2-2s2 .896 2 2v2h1v-2c0-1.656-1.343-3-3-3s-3 1.344-3 3v2h1z"
                    ></path>
                  </svg>
                  <span className="  text-base leading-6 text-[#042040] font-bold px-5">
                    You don't have access to this classroom teacher attachments
                  </span>
                </div>
              ) : (
                <div className="max-h-[430px] h-full relative">
                  {classData.teacher && (
                    <div className="mb-7">
                      <div className="flex items-center gap-5 mb-2.5  ">
                        <span className="bg-[#4062FF] rounded-full w-full max-w-[3rem] h-12">
                          <svg
                            data-v-4b07702c=""
                            width="28"
                            height="48"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto"
                          >
                            <path
                              data-v-4b07702c=""
                              d="M10.0002 0.157227C7.87916 0.157227 6.15405 1.88281 6.15405 4.00381V5.99662C6.15405 8.11777 7.87916 9.84336 10.0002 9.84336C12.1213 9.84336 13.8463 8.11777 13.8463 5.99662V4.00381C13.8463 1.88281 12.1213 0.157227 10.0002 0.157227Z"
                              fill="#8391A9"
                            ></path>{" "}
                            <path
                              data-v-4b07702c=""
                              d="M18.4821 14.8561C17.2506 12.7573 15.282 11.2013 12.9391 10.4747C12.8848 10.4579 12.8261 10.4722 12.7856 10.5122C11.6957 11.5868 10.3415 12.4252 10.0029 12.6277C9.64149 12.3967 8.1192 11.4044 7.21421 10.5122C7.1739 10.4722 7.11469 10.4579 7.06068 10.4747C4.71749 11.2015 2.74909 12.7574 1.51797 14.8562C1.48978 14.9043 1.48978 14.9639 1.51797 15.012C3.26622 17.991 6.51629 19.8416 9.9999 19.8416C13.4837 19.8416 16.7339 17.991 18.4821 15.012C18.5105 14.9638 18.5105 14.9041 18.4821 14.8561ZM15.231 16.0034C15.231 16.0883 15.1502 16.1532 15.0655 16.1532H14.0238C13.9389 16.1532 13.8463 16.2261 13.8463 16.3111V17.3884C13.8463 17.4731 13.801 17.5378 13.7161 17.5378H12.7805C12.6957 17.5378 12.6157 17.4731 12.6157 17.3884V16.3111C12.6154 16.2262 12.5574 16.1532 12.4725 16.1532H11.386C11.3011 16.1532 11.2309 16.0881 11.2309 16.0034V15.0759C11.2309 14.991 11.3011 14.9225 11.386 14.9225H12.4725C12.5574 14.9225 12.6154 14.8532 12.6154 14.7682V13.6897C12.6154 13.6048 12.6953 13.5379 12.7802 13.5379H13.7057C13.7904 13.5379 13.8462 13.6048 13.8462 13.6897V14.7714C13.8462 14.8564 13.9284 14.9224 14.0134 14.9224H15.0655C15.1502 14.9224 15.231 14.9942 15.231 15.0791V16.0034Z"
                              fill="#8391A9"
                            ></path>
                          </svg>
                        </span>
                        <h5 className="text-[1.125rem] text-[#042040] font-extrabold font-['Nunito_sans']">
                          {classData.teacher.first_name}{" "}
                          {classData.teacher.last_name}
                        </h5>
                      </div>
                      <div className="text-sm px-3 py-1 inline-block text-[#8391A9] bg-blue-100 rounded-md font-semibold">
                        {classData.teacher.subjects.map((sub) => (
                          <span key={sub.id}> {sub.name}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border border-gray-200 max-h-[430px] h-full relative rounded-lg">
                    <div className="px-4 py-3 flex items-center">
                      <span className="text-base leading-6 text-[#042040] py-3  font-bold">
                        Teachar Attachments
                      </span>
                    </div>

                    <ul className="text-[#7D8DA6] h-80 text-base font-semibold mb-0 overflow-x-hidden">
                      {/* {console.log(classData.teacher)} */}
                      {classData.teacher === null ? (
                        <>
                          <span className=" text-center h-full flex items-center justify-center flex-col relative">
                            <p>No Attachment found!</p>
                          </span>
                          <div>
                            <span className="flex absolute b-0 w-full  justify-center">
                              {"No result :("}
                            </span>
                          </div>
                        </>
                      ) : (
                        attachment &&
                        attachment.map((item) => (
                          <li
                            className="bg-[#fbfcfe] text-base text-gray-300 py-3 px-7 hover:bg-blue-50 font-semibold"
                            key={item.id}
                          >
                            <a
                              className={"text-ellipsis text-gray-600"}
                              href={item.file}
                              target={"_blank"}
                              rel="noreferrer"
                            >
                              {item.file &&
                                item.file.split("_path/")[1].split("?")[0]}
                            </a>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Classroom;
