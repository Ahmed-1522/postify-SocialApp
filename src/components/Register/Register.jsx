import React, { useState } from "react";
import style from "./Register.module.css";
import { useForm } from "react-hook-form";
import z, { email, object } from "zod";
import { zodResolver } from "./../../../node_modules/@hookform/resolvers/zod/src/zod";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  ///^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"

  const [apiError, setApiError] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const schema = z
    .object({
      name: z
        .string()
        .min(1, "name should be at least 3 chars")
        .max(15, "name maximum is 15 chars"),
      email: z.email("invalid email address"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "password is at least 8 chars with at least 1 uppercase letter and 1 lowercase letter and a number and 1 special chars {#?!@$%^&*-}"
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "invalid date format")

        .refine((date) => {
          const userDate = new Date(date);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return userDate < now;
        }, "can't be future date"),
      gender: z.enum(["male", "female"], "gender must be male and female"),
    })
    .refine((object) => object.password === object.rePassword, {
      error: "password and rePassword don't match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleRegister(values) {
    setIsLoading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "success") {
          console.log(res);
          navigate("/Login");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response.data.error);
        setApiError(err.response.data.error);
      });
  }

  return (
    <>
      <h1 className="text-stone-400 text-center text-3xl font-bold">WELCOME TO <span className="text-stone-500">POSTIFY</span></h1>

      <form
        className="max-w-md mx-auto my-16 "
        onSubmit={handleSubmit(handleRegister)}
      >
        {/*<<<<<<<<<<<< error display >>>>>>>>>>*/}
        {apiError && (
          <h1 className="bg-red-600 text-center font-bold p-2 my-5 text-white rounded-md ">
            {apiError}
          </h1>
        )}

        {/*<<<<<<<<<<<< full name >>>>>>>>>>*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Full Name
          </label>
          {formState.errors.name && formState.touchedFields.name ? (
            <p className="text-red-700 text-center p-4 font-semibold">
              {" "}
              {formState.errors.name.message}{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        {/*<<<<<<<<<<<< email >>>>>>>>>>*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
        {/*<<<<<<<<<<<< rePassword >>>>>>>>>>*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password again
          </label>
          {formState.errors.rePassword ? (
            <p className="text-red-700 text-center p-4 font-semibold">
              {" "}
              {formState.errors.rePassword.message}{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        {/*<<<<<<<<<<<< date of birth>>>>>>>>>>*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="block  py-3 px-0 w-full text-sm text-white bg-stone-400 border-0 rounded-2xl focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="dateOfBirth"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 my-2"
          >
            date of birth
          </label>
          {formState.errors.dateOfBirth ? (
            <p className="text-red-700 text-center p-4 font-semibold">
              {" "}
              {formState.errors.dateOfBirth.message}{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        {/*<<<<<<<<<<<< gender >>>>>>>>>>*/}
        <div className="flex gap-5">
          {" "}
          <div className="flex items-center mb-4">
            <input
              id="male"
              type="radio"
              value="male"
              {...register("gender")}
              className="w-4 h-4 text-whit bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-white"
            >
              Male
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="female"
              type="radio"
              value="female"
              {...register("gender")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-white"
            >
              Female
            </label>
          </div>
          {formState.errors.gender ? (
            <p className="text-red-700 text-center p-4 font-semibold">
              {" "}
              {formState.errors.gender.message}{" "}
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin text-white"></i>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}
