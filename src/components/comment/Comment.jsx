import React from "react";
import style from "./Comment.module.css";
import userPhoto from "../../assets/user icon.jpg";
import dayjs from "dayjs";
import UpdateComment from "../UpdateComment/UpdateComment";
import DeleteComment from "../DeleteComment/DeleteComment";

const comment = ({ comment, currentUserId, postOwnerId }) => {
  let { commentCreator, createdAt, content } = comment;
  return (
    <div className="w-full rounded-md  border-b-slate-900 text-white  bg-[#585757] my-7">
      <div className="text-center  text-[#313030] pb-4">
        comments
        <div className=" flex justify-end">
          <div className="flex gap-2 px-3">
            {currentUserId && commentCreator._id === currentUserId && (
              <UpdateComment id={comment._id}/>
            )}
            {currentUserId && postOwnerId === currentUserId && (
              <DeleteComment id={comment._id} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 ">
        <div className="flex items-center rounded-full gap-3">
          <img src={userPhoto} className="rounded-full size-[36px]" alt="" />
          <p>{commentCreator.name}</p>
        </div>
        <div className="">
          <p className="text-[#313030]">
            {dayjs(createdAt).format("DD MMM YYYY, h:mm A")}
          </p>
        </div>
      </div>
      <div className="px-28">: {content}</div>
    </div>
  );
};

export default comment;
