import React from 'react'
import { useUrl } from '../hooks/useUrl'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react';

export const NotificatiosDropdown = ({ owner }) => {
   const {cloudinary_image_url} = useUrl();
   const {data} = useFetch('/users/notifications')

   useEffect(() => {
      console.log(data)
   }, [data])
   return (
      <div className="pc-wrapper-2">
         {/* popup Content */}
         <div className="noti-card">
            <div className='noti-title'>
               <h3>Notifications</h3>
            </div>
            <div className='noti-body'>
               <div className='noti-item'>
                  <div className='ns-title'>
                     <h3>Today</h3>
                  </div>
                  {/* Follow item */}
                  <div className='ns-item'>
                     <div className='ns-img'>
                        <div className={"round-img-35"}>
                           {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
                           {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                        </div>
                     </div>
                     <div className='ns-text'>
                        <p><b className='bold'>{owner.username}</b> started following you.</p>
                     </div>
                     <div className='fb-follow'>
                        {/* <span className='btn-f-s'>Follow</span> */}
                        <span className='btn-f-s-clicked'>Following</span>
                     </div>
                  </div>
                  {/* Liked blog item */}
                  <div className='ns-item'>
                     <div className='ns-img'>
                        <div className={"round-img-35"}>
                           {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
                           {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                        </div>
                     </div>
                     <div className='ns-text'>
                        <p><b className='bold'>{owner.username}</b> liked your post.</p>
                     </div>
                     <div className='ns-blog'>
                        {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                     </div>
                  </div>
                  {/* Liked comment item */}
                  <div className='ns-item'>
                     <div className='ns-img'>
                        <div className={"round-img-35"}>
                           {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
                           {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                        </div>
                     </div>
                     <div className='ns-text'>
                        <p><b className='bold'>{owner.username}</b> liked your comment on a post.</p>
                     </div>
                  </div>
                  {/* Commented on your blog item */}
                  <div className='ns-item'>
                     <div className='ns-img'>
                        <div className={"round-img-35"}>
                           {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
                           {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                        </div>
                     </div>
                     <div className='ns-text'>
                        <p><b className='bold'>{owner.username}</b> commented on your blog.</p>
                     </div>
                     <div className='ns-blog'>
                        {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                     </div>
                  </div>
                  {/* Commented on your blog item */}
                  <div className='ns-item'>
                     <div className='ns-img'>
                        <div className={"round-img-35"}>
                           {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
                           {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                        </div>
                     </div>
                     <div className='ns-text'>
                        <p><b className='bold'>{owner.username}</b> commented on your blog.</p>
                     </div>
                     <div className='ns-blog'>
                        {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                     </div>
                  </div>
                  {/* Responded to your comment item */}
                  <div className='ns-item'>
                     <div className='ns-img'>
                        <div className={"round-img-35"}>
                           {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
                           {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                        </div>
                     </div>
                     <div className='ns-text'>
                        <p><b className='bold'>{owner.username}</b> responded to your comment.</p>
                     </div>
                     <div className='ns-blog'>
                        {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                     </div>
                  </div>
                  
               </div>
               <hr />

            </div>
            
         </div>

      </div>
   )
}
