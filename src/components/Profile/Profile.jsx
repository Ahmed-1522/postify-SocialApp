import React from "react";
import style from "./Profile.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserPosts from "../UserPosts/UserPosts";
import UpdatePassword from "./../UpdatePassword/UpdatePassword";
import UpdateProfilePhoto from "../UpdateProfilePhoto/UpdateProfilePhoto";
import AddPost from "../AddPosts/AddPosts";
export default function Profile() {
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

  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto  border-2 border-gray-700 text-gray-400 rounded-lg p-8 my-10">
        <div className="w-[90px] border-2 rounded-full mx-auto">
          <img src={data?.photo} alt="" />
        </div>
        <div className="py-2">
          <div className="">
            <p>
              <i className="fa-solid fa-user"></i> User Name: {data?.name}
            </p>
          </div>
          <div className="py-2">
            <p>
              <i className="fa-solid fa-envelope"></i> User Email: {data?.email}
            </p>
          </div>
          <div className="py-2">
            <p>
              <i className="fa-solid fa-person-half-dress"></i> User Gender:{" "}
              {data?.gender}
            </p>
          </div>
          <div className="py-2">
            <p>
              <i className="fa-solid fa-cake-candles"></i> User Birthday:{" "}
              {data?.dateOfBirth}
            </p>
          </div>
          <div className="flex justify-center items-center py-3.5 gap-5">
            <UpdatePassword /> <UpdateProfilePhoto />{" "}
          </div>
        </div>
      </div>
      <AddPost />
      <UserPosts id={data?._id} />
    </>
  );
}
