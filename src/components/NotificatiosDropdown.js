import React, { useState } from 'react'
import { useUrl } from '../hooks/useUrl'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


export const NotificatiosDropdown = ({ owner }) => {
   const {cloudinary_image_url} = useUrl();
   const {data} = useFetch('/users/notifications');
   const [today, setToday] = useState();

   useEffect(() => {
      if (data){
         setToday(data.unseen.today.concat(data.seen.today));
         console.log("Test Case: ")
         console.log(...data.seen.today);
      }
   }, [data]);

   useEffect(() => {
      if (today){
         console.log(today);
      }
   }, [today])


   return (
      <div className="pc-wrapper-2">
         {/* popup Content */}
         <div className="noti-card">
            <div className='noti-title'>
               <h3>Notifications</h3>
            </div>
            <div className='noti-body'>
               <div className='noti-item'>
                  {/* Today */}
                  {today && 
                  <div className='ns-title'>
                     <h3>Today</h3>
                  </div>}
                  
                  {/* Follow item */}
                  { today &&
                  today.map(notification => {
                     switch (notification[0].type) {
                        case ('follow'):
                           return (
                              <div className='ns-item'>
                                 <div className='ns-img'>
                                    <div className={"round-img-35"}>
                                       {!notification[0].avatar && <p className="img-text">{notification[0].username[0].toUpperCase()}</p>}
                                       {notification[0].avatar  && <img src={`${cloudinary_image_url}/${notification[0].avatar}`} alt="" />}
                                    </div>
                                 </div>
                                 <div className='ns-text'>
                                    <Link to={`/users/${notification[0].junior_id}`}>
                                          <p><b className='bold'>{notification[0].username}</b>
                                          {notification.length > 2 && 
                                          <> 
                                             <b className='bold'>{`, ${notification[1].username}`}</b>
                                             {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } started following you.`}
                                          </>
                                          }
                                          {notification.length === 2 && 
                                          <> and <b className='bold'>{`${notification[1].username}`}</b> started following you. </>
                                          }
                                          {notification.length === 1 && 
                                          <> started following you.</>
                                          }
                                          </p>
                                    </Link>
                                 </div>
                                 <div className='fb-follow'>
                                    {/* <span className='btn-f-s'>Follow</span> */}
                                    {/* <span className='btn-f-s-clicked'>Following</span> */}
                                 </div>
                              </div>
                           )
                           
                        case ('liked_blog'):
                           return (
                              <div className='ns-item'>
                                 <div className='ns-img'>
                                    <div className={"round-img-35"}>
                                       {!notification[0].avatar && <p className="img-text">{notification[0].username[0].toUpperCase()}</p>}
                                       {notification[0].avatar  && <img src={`${cloudinary_image_url}/${notification[0].avatar}`} alt="" />}
                                    </div>
                                 </div>
                                 <div className='ns-text'>
                                    <Link to={`/users/${notification[0].junior_id}`}>
                                       <p><b className='bold'>{notification[0].username}</b>
                                       {notification.length > 2 && 
                                       <> 
                                          <b className='bold'>{`, ${notification[1].username}`}</b>
                                          {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } liked your blog.`}
                                       </>
                                       }
                                       {notification.length === 2 && 
                                       <> and <b className='bold'>{`${notification[1].username}`}</b> liked your blog. </>
                                       }
                                       {notification.length === 1 && 
                                       <> liked your blog.</>
                                       }
                                       </p>
                                    </Link>
                                 </div>
                                 {notification[0].blog_img  && 
                                 <Link to={`/blogs/${notification[0].senior_id}`}>
                                    <div className='ns-blog'>
                                       <img src={`${cloudinary_image_url}/${notification[0].blog_img}`} alt="" />
                                    </div>
                                 </Link>}
                              </div>
                           )
                           
                        case ('liked_comment'):
                           return (
                              <div className='ns-item'>
                                 <div className='ns-img'>
                                    <div className={"round-img-35"}>
                                       {!notification[0].avatar && <p className="img-text">{notification[0].username[0].toUpperCase()}</p>}
                                       {notification[0].avatar  && <img src={`${cloudinary_image_url}/${notification[0].avatar}`} alt="" />}
                                    </div>
                                 </div>
                                 <div className='ns-text'>
                                    <Link to={`/users/${notification[0].junior_id}`}>
                                       <p><b className='bold'>{notification[0].username}</b>
                                       {notification.length > 2 && 
                                       <> 
                                          <b className='bold'>{`, ${notification[1].username}`}</b>
                                          {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } liked your comment.`}
                                       </>
                                       }
                                       {notification.length === 2 && 
                                       <> and <b className='bold'>{`${notification[1].username}`}</b> liked your comment.</>
                                       }
                                       {notification.length === 1 && 
                                       <> liked your comment.</>
                                       }
                                       </p>
                                    </Link>
                                 </div>
                              </div>
                           )
                           
                        case ('commented_blog'):
                           return (
                              <div className='ns-item'>
                                 <div className='ns-img'>
                                    <div className={"round-img-35"}>
                                       {!owner[0].avatar && <p className="img-text">{owner[0].username[0].toUpperCase()}</p>}
                                       {owner[0].avatar  && <img src={`${cloudinary_image_url}/${owner[0].avatar}`} alt="" />}
                                    </div>
                                 </div>
                                 <div className='ns-text'>
                                    <Link to={`/users/${notification[0].junior_id}`}>
                                       <p><b className='bold'>{notification[0].username}</b>
                                       {notification.length > 2 && 
                                       <> 
                                          <b className='bold'>{`, ${notification[1].username}`}</b>
                                          {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } commented on your blog.`}
                                       </>
                                       }
                                       {notification.length === 2 && 
                                       <> and <b className='bold'>{`${notification[1].username}`}</b> commented on your blog. </>
                                       }
                                       {notification.length === 1 && 
                                       <> commented on your blog.</>
                                       }
                                       </p>
                                    </Link>
                                 </div>
                                 {notification[0].blog_img  && 
                                 <Link to={`/blogs/${notification[0].senior_id}`}>
                                    <div className='ns-blog'>
                                       <img src={`${cloudinary_image_url}/${notification[0].blog_img}`} alt="" />
                                    </div>
                                 </Link>}
                              </div>
                           )
                           
                        case ('commented_comment'):
                           return (
                              <div className='ns-item'>
                                 <div className='ns-img'>
                                    <div className={"round-img-35"}>
                                       {!owner[0].avatar && <p className="img-text">{owner[0].username[0].toUpperCase()}</p>}
                                       {owner[0].avatar  && <img src={`${cloudinary_image_url}/${owner[0].avatar}`} alt="" />}
                                    </div>
                                 </div>
                                 <div className='ns-text'>
                                    <Link to={`/users/${notification[0].junior_id}`}>
                                       <p><b className='bold'>{notification[0].username}</b>
                                       {notification.length > 2 && 
                                       <> 
                                          <b className='bold'>{`, ${notification[1].username}`}</b>
                                          {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } commented on your comment.`}
                                       </>
                                       }
                                       {notification.length === 2 && 
                                       <> and <b className='bold'>{`${notification[1].username}`}</b> commented on your comment. </>
                                       }
                                       {notification.length === 1 && 
                                       <> commented on your comment.</>
                                       }
                                       </p>
                                    </Link>
                                 </div>
                              </div>
                           )
                        
                        default:
                           return(<div></div>)
                     }
                  })
                  }
                  
               </div>
               <hr />

            </div>
            
         </div>

      </div>
   )
}
