import React from "react";
import style from "./PostDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "./../comment/comment";
import dayjs from "dayjs";
import LoadingPosts from "../LoadingPosts/LoadingPosts";

export default function PostDetails() {
  let { id } = useParams();

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  function getCurrentUser() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSinglePost,
    select: (data) => data.data.post,
  });

  let { data: currentUser } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    select: (data) => data?.data?.user,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <LoadingPosts />
        <LoadingPosts />
        <LoadingPosts />
      </div>
    );
  }

  return (
    <>
      <div
        key={data?.id}
        className="w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-200 mx-auto my-8 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-2">
            <img className="w-[2.8125rem]" src={data?.user.photo} alt="" />
            {data?.user.name}
          </div>
          <div className="text-slate-400">
            {dayjs(data?.createdAt).format("DD MMM YYYY, h:mm A")}
          </div>
        </div>
        {data?.body && <h2 className="mb-4">{data?.body}</h2>}
        {data?.image && <img src={data?.image} alt={data?.body} />}

        {data?.comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUserId={currentUser?._id}
            postOwnerId={data?.user._id}
          />
        ))}

        {/* <Comment comment={post.comments[0]} /> */}
      </div>
    </>
  );
}
