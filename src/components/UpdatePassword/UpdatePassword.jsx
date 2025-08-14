import React, { useState } from "react";
import style from "./UpdatePassword.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  const [isShow, setIsShow] = useState(false);

  function toggleShow() {
    setIsShow(!isShow);
  }

const form=useForm({
  defaultValues:{
    password:"",
    newPassword:""
  }
})

let { register, handleSubmit } = form;


   function ChangeMyPassword(values){
    axios.patch(`https://linked-posts.routemisr.com/users/change-password`,values,{
      headers:{
        token:localStorage.getItem("userToken")
      }
    }).then((res)=>{
      console.log(res);
      if(res.data.message==="success"){
        localStorage.setItem("userToken",res.data.token)
        toast.success("Password Changed successfully")
      }
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }




  return (
    <>
      <div>
        {/* Modal toggle */}
        <button
          onClick={toggleShow}
          className="block text-white bg-stone-700 hover:bg-stone-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          type="button"
        >
          Change Password
        </button>

        {isShow && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change your password
                  </h3>
                  <button
                    onClick={toggleShow}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <i className="fa-solid fa-xmark cursor-pointer"></i>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form onSubmit={handleSubmit(ChangeMyPassword)} className="space-y-4" action="#">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Current password
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        id="currentPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        new password
                      </label>
                      <input
                        type="password"
                        {...register("newPassword")}
                        id="newPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                    >
                      Change your password
                    </button>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
