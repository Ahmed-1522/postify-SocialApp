import React, { useState } from "react";
import style from "./UpdateComment.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


export default function UpdateComment({ id }) {

 let myQuery =useQueryClient()

  const [isShow, setIsShow] = useState(false);

  function showToggle() {
    setIsShow(!isShow);
  }

  const form = useForm({
    defaultValues: {
      content: "",
    },
  });
  let { register, handleSubmit } = form;

  function handleUpdateComment(values) {
    console.log(values);

    axios.put(`https://linked-posts.routemisr.com/comments/${id}`, values, {
      headers: { token: localStorage.getItem("userToken") },
    }).then((res)=>{
      console.log(res);
      if(res.data.message==="success"){
        toast.success("comment updated successfully")
        myQuery.invalidateQueries({queryKey:["getUserPosts"]})
        myQuery.invalidateQueries({queryKey:["getSinglePost"]})

      }
      
    })
  }

  return (
    <>
      <button
        onClick={() => {
          showToggle();
        }}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-yellow-400 bg-stone-700 hover:bg-stone-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        <i class="fa-solid fa-pen"></i>
      </button>

      {isShow && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update your comment
                </h3>
                <button
                  onClick={() => {
                    showToggle();
                  }}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <i className="fa-solid fa-xmark"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form
                  onSubmit={handleSubmit(handleUpdateComment)}
                  className="space-y-4"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="content"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your content
                    </label>
                    <input
                      type="text"
                      {...register("content")}
                      id="content"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update your comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
