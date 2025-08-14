import React, { useState } from 'react'
import style from "./UpdateProfilePhoto.module.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
export default function UpdateProfilePhoto() {

  const [isShow, setIsShow] = useState(false);
  let myquery=useQueryClient()
    function toggleShow() {
      setIsShow(!isShow);
    }


    const form=useForm({
      defaultValues:{
        photo:""
      }
    })

    let { register, handleSubmit } = form;

    function changePhoto(values){

    let myData = new FormData()
    myData.append("photo",values.photo[0])

    axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,myData,{headers:{
      token:localStorage.getItem("userToken")
    }}).then((res)=>{
      console.log(res);
      toast.success("profile photo updated successfully ")
      myquery.invalidateQueries({queryKey:["getProfileDetails"]})
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.error)
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
          Change profile photo
        </button>

        {isShow && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-16px)] max-h-full flex"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change your profile photo
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
                  <form onSubmit={handleSubmit(changePhoto)} className="space-y-4" action="#">
                    <div className='flex justify-center items-center '>
                      <label
                        htmlFor="profilePhoto"
                        className=""
                      >
                        <i className="fa-solid fa-image block mb-2 cursor-pointer text-4xl"></i>
                      </label>
                      <input
                        type="file"
                        {...register("photo")}
                        id="profilePhoto"
                        className="hidden"
                      />
                    </div>

                    
                    <button
                      type="submit"
                      className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Upload your new photo
                    </button>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
