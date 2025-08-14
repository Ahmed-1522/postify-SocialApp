import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import z, { email, object } from "zod";
import { zodResolver } from "./../../../node_modules/@hookform/resolvers/zod/src/zod";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  ///^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"

  const [apiError, setApiError] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let {userLogin,setUserLogin}=useContext(UserContext)

  const navigate = useNavigate();
  const schema = z
    .object({
     
      email: z.email("invalid email address"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "password is at least 8 chars with at least 1 special char and number"
        ),
    })

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleLogin(values) {
    setIsLoading(true)
    axios
      .post(`https://linked-posts.routemisr.com/users/signin`, values)
      .then((res) => {
        console.log(res);
        setIsLoading(false)
        if (res.data.message === "success") {
          
          localStorage.setItem("userToken",res.data.token)
          setUserLogin(res.data.token)
          navigate("/Home")
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
        setApiError(err.response.data.error);
      });
  }

  return (
    <>
      <form
        className="max-w-md mx-auto my-44"
        onSubmit={handleSubmit(handleLogin)}
      >
        {/*<<<<<<<<<<<< error display >>>>>>>>>>*/}
        {apiError && (
          <h1 className="bg-red-600 text-center font-bold p-2 my-5 text-white rounded-md ">
            {apiError}
          </h1>
        )}

        {/*<<<<<<<<<<<< email >>>>>>>>>>*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 rounded appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formState.errors.email && formState.touchedFields.email ? (
            <p className="text-red-700 text-center p-4 font-semibold">
              {" "}
              {formState.errors.email.message}{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        {/*<<<<<<<<<<<< password >>>>>>>>>>*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("password")}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formState.errors.password ? (
            <p className="text-red-700 text-center p-4 font-semibold">
              {" "}
              {formState.errors.password.message}{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
        disabled={isLoading}
          type="submit"
          className="text-white bg-stone-700 cursor-pointer hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading?<i className="fas fa-spinner fa-spin text-white"></i>:(<>Login <i className="fa-solid fa-lock"></i></>)}
        </button>
      </form>
    </>
  );
}
