import React from "react";
import style from "./AddPosts.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
export default function AddPost() {
  function getProfileDetails() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getProfileDetails"],
    queryFn: getProfileDetails,
    select: (data) => data?.data?.user,
  });

  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  let { register, handleSubmit } = form;

  function handleAddPost(values) {
    let myData = new FormData();
    myData.append("body", values.body);
    myData.append("image", values.image[0]);

    axios
      .post(`https://linked-posts.routemisr.com/posts`, myData, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("post created successfully");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  return (
    <div className="w-full md:w-[80%] lg:w-[45%] rounded-md shadow-sm border border-gray-200 bg-white mx-auto mb-8 p-4">
      <form onSubmit={handleSubmit(handleAddPost)}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[2.8125rem] h-[2.8125rem] rounded-full overflow-hidden bg-gray-400 grid place-items-center text-sm font-semibold text-gray-600">
            <img
              src={data?.photo}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Create post</p>
          </div>
          {/* File input with label icon */}
          <div>
            <input
              id="postImage"
              type="file"
              className="hidden"
              {...register("image")}
            />
            <label
              htmlFor="postImage"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <i className="fa-solid fa-image text-lg"></i>
            </label>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative mb-4">
          <textarea
            {...register("body")}
            aria-label="Post text"
            placeholder="What's on your mind?"
            className="w-full resize-y min-h-[96px] rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 px-4 py-3 text-gray-700 placeholder:text-gray-400"
          />
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="font-medium text-gray-500">
              280 characters left
            </span>
            <span className="text-gray-400">Max 280</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
