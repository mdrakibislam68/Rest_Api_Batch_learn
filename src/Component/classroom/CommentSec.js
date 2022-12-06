import { Avatar, Button, Comment, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GlobalProvider from "../../Context/Index";
import { addNewReplyComment } from "../../redux/comment";
import { studentDataSlice } from "../../redux/profileInfo";
import "./classroom.css";

const CommentSec = ({ children, show, setShow, comment }) => {
  const { baseurl } = GlobalProvider();
  const [form] = Form.useForm();
  // console.log(comments, getComment, isError, isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(studentDataSlice({ baseurl }));
  }, []);

  const { studentData } = useSelector((state) => state.profile);

  const { id } = useParams();
  const handleReply = (e) => {
    const value = {
      comment: e.replay,
      creator: studentData.id,
      parent_comment: comment.id,
    };
    baseurl
      .post(`classrooms/${id}/classroom-reply-comment-create/ `, value)
      .then((res) => {
        dispatch(addNewReplyComment(res?.data));
      })
      .catch((err) => console.log(err));
    form.resetFields();
  };

  return (
    <Comment
      actions={[
        <span key="comment-nested-reply-to">
          {show === comment.id ? (
            <span onClick={() => setShow(null)}>Hide</span>
          ) : (
            <span onClick={() => setShow(comment.id)}>Reply to</span>
          )}
        </span>,
      ]}
      author={
        <a href="#author">
          {comment.creator_first_name} {comment.creator_last_name}{" "}
        </a>
      }
      avatar={
        <Avatar
          src={
            comment.avatar ? (
              comment.avatar
            ) : (
              <svg
                fill="none"
                height="48"
                viewBox="0 0 20 20"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0002 0.157227C7.87916 0.157227 6.15405 1.88281 6.15405 4.00381V5.99662C6.15405 8.11777 7.87916 9.84336 10.0002 9.84336C12.1213 9.84336 13.8463 8.11777 13.8463 5.99662V4.00381C13.8463 1.88281 12.1213 0.157227 10.0002 0.157227Z"
                  fill="#8391A9"
                ></path>{" "}
                <path
                  d="M18.4821 14.8561C17.2506 12.7573 15.282 11.2013 12.9391 10.4747C12.8848 10.4579 12.8261 10.4722 12.7856 10.5122C11.6957 11.5868 10.3415 12.4252 10.0029 12.6277C9.64149 12.3967 8.1192 11.4044 7.21421 10.5122C7.1739 10.4722 7.11469 10.4579 7.06068 10.4747C4.71749 11.2015 2.74909 12.7574 1.51797 14.8562C1.48978 14.9043 1.48978 14.9639 1.51797 15.012C3.26622 17.991 6.51629 19.8416 9.9999 19.8416C13.4837 19.8416 16.7339 17.991 18.4821 15.012C18.5105 14.9638 18.5105 14.9041 18.4821 14.8561ZM15.231 16.0034C15.231 16.0883 15.1502 16.1532 15.0655 16.1532H14.0238C13.9389 16.1532 13.8463 16.2261 13.8463 16.3111V17.3884C13.8463 17.4731 13.801 17.5378 13.7161 17.5378H12.7805C12.6957 17.5378 12.6157 17.4731 12.6157 17.3884V16.3111C12.6154 16.2262 12.5574 16.1532 12.4725 16.1532H11.386C11.3011 16.1532 11.2309 16.0881 11.2309 16.0034V15.0759C11.2309 14.991 11.3011 14.9225 11.386 14.9225H12.4725C12.5574 14.9225 12.6154 14.8532 12.6154 14.7682V13.6897C12.6154 13.6048 12.6953 13.5379 12.7802 13.5379H13.7057C13.7904 13.5379 13.8462 13.6048 13.8462 13.6897V14.7714C13.8462 14.8564 13.9284 14.9224 14.0134 14.9224H15.0655C15.1502 14.9224 15.231 14.9942 15.231 15.0791V16.0034Z"
                  fill="#8391A9"
                ></path>
              </svg>
            )
          }
          alt="Han Solo"
        />
      }
      content={<p>{comment.comment}</p>}
    >
      <div className={`${show === comment.id ? "block" : "hidden"}`}>
        {children}
        <Form
          form={form}
          className="flex items-center w-full gap-2 mt-2.5"
          onFinish={handleReply}
        >
          <Form.Item name="replay" className="w-full m-0">
            <Input
              type="text"
              className="rounded-[40px]"
              placeholder="Reply to comment"
            />
          </Form.Item>
          <Form.Item className="w-7 h-7 p-0 m-0">
            <Button htmlType="submit" className="border-none p-0 w-7 h-7">
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
    </Comment>
  );
};

export default CommentSec;
