import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import getCookie from '../utils/getCookie'

export default function useFetch(url='/', noRedirect=true) {
   const [data, setData] = useState(null);
   const [tokenIsValid, setTokenIsValid] = useState(true);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      let config = {
         headers: {
            Authorization: `Bearer ${process.env.REACT_APP_HOST_API_KEY}`,
            'x-access-token': getCookie('usrin')
         },
      };
      let fetchCount = 0;   // maximum of 5 fetch calls allowed
      
      function fetchData() {
         axios.get(`${process.env.REACT_APP_HOST_API}${url}`, config)
            .then(data => {
               if (!getCookie('usrin') && url !== '/' && url !== '/users/me'){
                  throw Error('missing token')
               }
               setTokenIsValid(true);
               setData(data.data);
            })
            .catch(err => {
               setTokenIsValid(false)
               if (!getCookie('usrin')){
                  navigate('/login');
               } else {
                  setTimeout(() => {
                     fetchCount++;
                     if (fetchCount < 5) { fetchData(); }
                  }, 10000)
               }
            })
      }
      fetchData()

      return () => {}
   }, [url])

   return {data, setData, tokenIsValid}
}