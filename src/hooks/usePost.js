import { useEffect, useState } from "react"
import setCookie from "../utils/setCookie"


const usePost = (body, route) => {

   useEffect(() => {
      fetch(`${process.env.REACT_APP_HOST_API}${route}`, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(body)
      })
         .then(res => {
            if (!res.ok) {throw Error("Some error occurred with the json response")}
            return res.json()
         })
         .then(data => {
            console.log(data)
         })
         .catch(err => {
            console.log(err.message)
         })
   }, [body])
}

export default usePost;