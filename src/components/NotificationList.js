import React from 'react'
import { Link } from 'react-router-dom';
import { useUrl } from '../hooks/useUrl'

export const NotificationList = ({notifications, notification}) => {
   const {cloudinary_image_url} = useUrl();

   return (
   notifications.map(notification => {
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
                     {/* <Link to={`/users/${notification[0].junior_id}`}> */}
                           <p>
                           <Link  to={`/users/${notification[0].junior_id}`}><b className='bold'>{notification[0].username}</b></Link>
                           {notification.length > 2 && 
                           <> 
                              <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`, ${notification[1].username}`}</b></Link>
                              {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } started following you.`}
                           </>
                           }
                           {notification.length === 2 && 
                           <> and <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`${notification[1].username}`}</b></Link> started following you. </>
                           }
                           {notification.length === 1 && 
                           <> started following you.</>
                           }
                           </p>
                     {/* </Link> */}
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
                        <p><Link  to={`/users/${notification[0].junior_id}`}><b className='bold'>{notification[0].username}</b></Link>
                        {notification.length > 2 && 
                        <> 
                           <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`, ${notification[1].username}`}</b></Link>
                           {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } liked your blog.`}
                        </>
                        }
                        {notification.length === 2 && 
                        <> and <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`${notification[1].username}`}</b></Link> liked your blog. </>
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
                        <p><Link  to={`/users/${notification[0].junior_id}`}><b className='bold'>{notification[0].username}</b></Link>
                        {notification.length > 2 && 
                        <> 
                           <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`, ${notification[1].username}`}</b></Link>
                           {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } liked your comment.`}
                        </>
                        }
                        {notification.length === 2 && 
                        <> and <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`${notification[1].username}`}</b></Link> liked your comment.</>
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
                        {!notification[0].avatar && <p className="img-text">{notification[0].username[0].toUpperCase()}</p>}
                        {notification[0].avatar  && <img src={`${cloudinary_image_url}/${notification[0].avatar}`} alt="" />}
                     </div>
                  </div>
                  <div className='ns-text'>
                     <Link to={`/users/${notification[0].junior_id}`}>
                        <p><Link  to={`/users/${notification[0].junior_id}`}><b className='bold'>{notification[0].username}</b></Link>
                        {notification.length > 2 && 
                        <> 
                           <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`, ${notification[1].username}`}</b></Link>
                           {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } commented on your blog.`}
                        </>
                        }
                        {notification.length === 2 && 
                        <> and <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`${notification[1].username}`}</b></Link> commented on your blog. </>
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
                        {!notification[0].avatar && <p className="img-text">{notification[0].username[0].toUpperCase()}</p>}
                        {notification[0].avatar  && <img src={`${cloudinary_image_url}/${notification[0].avatar}`} alt="" />}
                     </div>
                  </div>
                  <div className='ns-text'>
                     <Link to={`/users/${notification[0].junior_id}`}>
                        <p><Link  to={`/users/${notification[0].junior_id}`}><b className='bold'>{notification[0].username}</b></Link>
                        {notification.length > 2 && 
                        <> 
                           <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`, ${notification[1].username}`}</b></Link>
                           {` and ${notification.length - 2} other${notification.length-2 > 1 ? 's' : '' } commented on your comment.`}
                        </>
                        }
                        {notification.length === 2 && 
                        <> and <Link  to={`/users/${notification[1].junior_id}`}><b className='bold'>{`${notification[1].username}`}</b></Link> commented on your comment. </>
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
   }))
}
