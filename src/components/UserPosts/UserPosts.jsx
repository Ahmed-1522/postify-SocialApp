import React from "react";
import style from "./UserPosts.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import { Link } from "react-router-dom";
import LoadingPosts from "../LoadingPosts/LoadingPosts";
import dayjs from "dayjs";
import UpdatePosts from "./../UpdatePosts/UpdatePosts";
import toast from "react-hot-toast";
import Comment from "../comment/comment";
import UpdateComment from "./../UpdateComment/UpdateComment";

export default function UserPosts({ id }) {
  let myQuery = useQueryClient();

  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <LoadingPosts />
        <LoadingPosts />
        <LoadingPosts />
      </div>
    );
  }

  function deletePost(postId) {
    axios
      .delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("post deleted successfully");
          myQuery.invalidateQueries({ queryKey: ["getUserPosts"] });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  }

  return (
    <>
      {data?.data?.posts.map((post) => (
        <div
          key={post.id}
          className="w-full md:w-[80%] lg:w-[45%] rounded-md text-white bg-[#313030] mx-auto mb-8 p-4 "
        >
          <div className="flex justify-end">
            <button
              onClick={() => deletePost(post.id)}
              className="cursor-pointer"
            >
              <i class="fa-solid text-red-600 text-2xl fa-trash-can"></i>
            </button>
          </div>
          <Link to={`/postdetails/${post.id}`}>
            <div className="">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <img className="w-[2.8125rem]" src={post.user.photo} alt="" />
                  {post.user.name}
                </div>
                <div className="text-slate-400">
                  <div className="">
                    {dayjs(data?.createdAt).format("DD MMM YYYY, h:mm A")}
                  </div>
                </div>
              </div>
              {post.body && <h2 className="mb-4">{post.body}</h2>}
              {post.image && <img src={post.image} alt={post.body} />}
            </div>
          </Link>
          {post.comments.length > 0 && (
            <div className="">
              <Comment
                comment={post.comments[0]}
                currentUserId={id}
                postOwnerId={post.user._id}
              />
            </div>
          )}
          <div className="flex justify-center items-center py-6 gap-7">
            {" "}
            <AddCommentModal postId={post.id} />
            <UpdatePosts id={post.id} />
          </div>
        </div>
      ))}
    </>
  );
}
