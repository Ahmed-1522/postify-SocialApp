import React from 'react'
import style from "./Footer.module.css"
export default function Footer() {
  return (
    <>
    <div className="container w-full p-5 text-center  bg-[#1f2328]">
      <div className="text-white text-4xl font-semibold"> <i className="fa-solid fa-users"></i> Postify </div>
      <div className="text-white pt-3"><i className="fa-regular fa-copyright"></i>  Copyright <span className='font-bold'>Postify</span>. All Rights Reserved</div>
    </div>
    </>
  )
}
