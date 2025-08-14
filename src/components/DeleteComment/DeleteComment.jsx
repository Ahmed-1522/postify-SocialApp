import React from "react";
import style from "./DeleteComment.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteComment({id}) {
  const myQuery = useQueryClient();

  function deleteComment(){
    console.log(id);
    axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{headers:{
      token:localStorage.getItem("userToken")
    }}).then((res)=>{
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
              onClick={() => deleteComment()}
              className="cursor-pointer  bg-stone-700 block p-3 rounded"
            >
              <i class="fa-solid text-red-600 text-2xl fa-trash-can"></i>
            </button>
   </> 
      
    
  )
}
