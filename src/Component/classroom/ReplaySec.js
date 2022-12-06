import { Avatar, Comment } from "antd";
import React from "react";

const ReplaySec = ({ result }) => {
  // console.log(result);
  return (
    <div className="border border-[#f1f1f1] mr-2.5 mt-2.5 p-2.5 rounded-md">
      <Comment
        author={
          <a className="!text-black font-semibold font-nunito" href="#s">
            {result.creator_first_name} {result.creator_last_name}
          </a>
        }
        avatar={<Avatar src={result.avatar} alt="Profile Image" />}
        content={
          <p className="p-0 text-[14px] font-medium font-nunito text-gray-400">
            {result.comment}
          </p>
        }
      />
    </div>
  );
};

export default ReplaySec;
