import React, { useEffect, useState } from 'react'
import { useUrl } from '../hooks/useUrl';
import getCookie from './getCookie';

export const SendPost = async ({url, body}) => {
   const {host_url} = useUrl();
   const [data, setData] = useState();

   await fetch(`${host_url}/${url}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'X-Access-Token': getCookie('usrin')
      },
      body: JSON.stringify(body)
   })
   .then(res => res.json())
   .then(data => {
      setData(data)
      // setIsLoading(false);
      // displayPopup('Blog Was Successfully Updated! ✅');
      // setTimeout(() => {
         //    navigate(`/blogs/${data.id}`);
         // }, 2000)
   }).catch(e => {
      console.log(e)
      setData(e);
   })
   return data;
}
