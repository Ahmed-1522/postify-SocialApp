import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
// import { postContext } from "../../context/Postcontext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import LoadingPosts from "../LoadingPosts/LoadingPosts";
import dayjs from "dayjs";
import AddPost from "../AddPosts/AddPosts";

export default function Home() {
  // let { getAllPosts } = useContext(postContext);
  // const [posts, setPosts] = useState([]);

  // async function getPosts() {
  //   let res = await getAllPosts();
  //   if (res.length) {
  //     setPosts(res);
  //     console.log(res);
  //   }
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
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

  let { data, error, isLoading, isError } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
  });

  let { data: currentUser } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    select: (data) => data?.data?.user,
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
  return (
    <>
      <AddPost />

      {data?.data?.posts.map((post) => (
        <div
          key={post.id}
          className="w-full md:w-[80%] lg:w-[45%] rounded-md text-white bg-[#313030] mx-auto mb-8 p-4 "
        >
          <Link to={`/postdetails/${post.id}`}>
            <div className="">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <img className="w-[2.8125rem]" src={post.user.photo} alt="" />
                  {post.user.name}
                </div>
                <div className="text-stone-400">
                  {dayjs(data?.createdAt).format("DD MMM YYYY, h:mm A")}
                </div>
              </div>
              {post.body && <h2 className="mb-4">{post.body}</h2>}
              {post.image && <img src={post.image} alt={post.body} />}

              <Comment
                comment={post.comments[0]}
                currentUserId={currentUser?._id}
                postOwnerId={post.user._id}
              />
            </div>
          </Link>
          <AddCommentModal postId={post.id} />
        </div>
      ))}
    </>
  );
}
