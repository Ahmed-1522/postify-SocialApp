import axios from "axios";
import { createContext } from "react";

export let postContext = createContext();

// export default function postContextProvider(props) {
//   function getAllPosts() {
//     return axios
//       .get(`https://linked-posts.routemisr.com/posts?limit=50`, {
//         headers: {
//           token: localStorage.getItem("userToken"),
//         },
//       })
//       .then((res) => {
//         return res.data.posts;
//       })
//       .catch((err) => {
//         return err;
//       });
//   }

//   return (
//     <postContext.Provider value={{ getAllPosts }}>
//       {props.children}
//     </postContext.Provider>
//   );
// }
