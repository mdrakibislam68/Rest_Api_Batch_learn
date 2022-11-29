import { Avatar, Button, Comment, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GlobalProvider from "../../Context/Index";
import { addNewReplyComment } from "../../redux/comment";
import { studentDataSlice } from "../../redux/profileInfo";

const CommentSec = ({ children, show, setShow, comment }) => {
  const { baseurl } = GlobalProvider();
  const [form] = Form.useForm();
  const { comments, getComment, isError, isLoading } = useSelector(
    (state) => state.comment
  );
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
        <a href="#">
          {comment.creator_first_name} {comment.creator_last_name}{" "}
        </a>
      }
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={<p>{comment.comment}</p>}
    >
      <div className={`${show === comment.id ? "block" : "hidden"}`}>
        {children}
        <Form
          form={form}
          className="flex items-center w-full gap-2"
          onFinish={handleReply}
        >
          <Form.Item name="replay" className="w-full ">
            <Input
              type="text"
              className="rounded-[40px]"
              placeholder="Reply to comment"
            />
          </Form.Item>
          <Form.Item className="w-7 h-7 p-0">
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
