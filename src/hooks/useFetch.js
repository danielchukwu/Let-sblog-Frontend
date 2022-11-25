import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import getCookie from '../utils/getCookie'

export default function useFetch(url='') {
   const [data, setData] = useState(null)
   const [tokenIsValid, setTokenIsValid] = useState(true)
   const navigate = useNavigate() 
   const location = useLocation()

   useEffect(() => {
      let config = {params : {'x-access-token': getCookie('usrin')}}
      axios.get(`${process.env.REACT_APP_HOST_API}${url}`, config)
         .then(data => {
            // if (data.data.message != 'successful'){
            //    throw Error('missing token')
            // }
            console.log(data.data)
            setTokenIsValid(true)
            setData(data.data)
         })
         .catch(err => {
            setTokenIsValid(false)
            console.log(`Error: ${err.message}`)
            if (!getCookie('usrin')){
               navigate('/login');
            }
         })

      return () => {}
   }, [url])

   return {data, setData, tokenIsValid}
}

// export default useFetch;