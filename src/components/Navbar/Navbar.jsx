import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function Navbar() {


    function getProfileDetails(){
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{headers:{
      token: localStorage.getItem("userToken")
    }})
  }

let{data,isLoading,isError,error} = useQuery({
    queryKey:["getProfileDetails"],
    queryFn:getProfileDetails,
    select:(data)=>data?.data?.user
  })



  let { userLogin, setUserLogin } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let navigate=useNavigate()

  function signout(){
    localStorage.removeItem("userToken")
    setUserLogin(null)
    navigate("/Login")
  }


  return (
    <>
      <nav className="bg-[#1f2328] border-gray-20">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-500">
              <i className="fa-solid fa-users"></i> Postify
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userLogin !== null ? (
              <>
                {" "}
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full cursor-pointer"
                    src={data?.photo}
                    alt="user photo"
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute top-12 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {data.name}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                        {data.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          profile{" "}
                          <i className="fa-regular fa-user text-cyan-600"></i>
                        </Link>
                      </li>
                      <li>
                        <span
                          onClick={signout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                        >
                          sign out
                          <i className="fa-solid fa-arrow-right-from-bracket text-cyan-600"></i>
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                {" "}
                <div>
                  <ul className="flex gap-3.5 text-white ps-6">
                    <li>
                      <Link to="login">
                        login{" "}
                        <i className="fa-solid fa-arrow-right-to-bracket "></i>
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="register">
                        Register <i className="fa-solid fa-user-plus"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          ></div>
        </div>
      </nav>
    </>
  );
}
