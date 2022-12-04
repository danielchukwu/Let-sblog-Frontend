import React, { createContext, useContext, useState } from 'react'
import { useUrl } from '../hooks/useUrl'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { NotificationList } from './NotificationList';
import { useConstants } from '../hooks/useConstants';
import { HeaderContext } from './HeaderMain';

export const NotificationsContext = createContext();


export const NotificatiosDropdown = ({ owner, setOwner }) => {
   const setEnableNotificationDropdown = useContext(HeaderContext);
   const {cloudinary_image_url} = useUrl();
   const {data} = useFetch('/users/notifications');
   const {spinnerStyle} = useConstants();

   // Notification group states
   const [today, setToday] = useState();
   const [yesterday, setYesterday] = useState();
   const [thisWeek, setThisWeek] = useState();
   const [thisMonth, setThisMonth] = useState();
   const [lastMonth, setLastMonth] = useState();
   const [thisYear, setThisYear] = useState();
   const [old, setOld] = useState();

   // See a particular group state. e.g all the people who like a particular picture
   const [groupList, setGroupList] = useState();


   // Set state after fetching notifications
   useEffect(() => {
      if (data){
         setToday(data.unseen.today.concat(data.seen.today));
         setYesterday(data.unseen.yesterday.concat(data.seen.yesterday));
         setThisWeek(data.unseen.this_week.concat(data.seen.this_week));
         setThisMonth(data.unseen.this_month.concat(data.seen.this_month));
         setLastMonth(data.unseen.last_month.concat(data.seen.last_month));
         setThisYear(data.unseen.this_year.concat(data.seen.this_year));
         setOld(data.unseen.old.concat(data.seen.old));
         
      // set notifications_count to 0
      const newData = owner;
      newData.notifications_count = 0;
      setOwner({...owner});
      }
   }, [data]);


   return (
      <NotificationsContext.Provider value={ setGroupList }>
      <div className="pc-wrapper-2">

            {/* popup Content */}
            <div className="noti-card">
               <div className='noti-title'>
                  <h3>Notifications</h3>

                  
                  { groupList && 
                  <div className='noti-right' onClick={() => setGroupList(null)} title="back">
                     <div className='noti-back'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                           <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                        </svg>
                     </div>
                  </div>
}
               </div>
               <div className='noti-body'>
                  {!data && 
                     <div className='spinner-container-fit'>
                        <ClipLoader color={"var(--theme-green)"} size={20} cssOverride={spinnerStyle}/>
                     </div>
                  }
                  {/*  */}
                  { !groupList &&
                  <div className='noti-item'>
                     {/* Today */}
                     {today && today.length > 0 && 
                     <div className='ns-title'>
                        <h3>Today</h3>
                     </div>}
                     {/* Today's Notificationa */}
                     { today && <NotificationList notifications={today} owner={owner} />}

                     {/* Yesterday */}
                     {today && today.length > 0 && <div className='tb-pad-10'><hr/></div>}   {/* section breaker */}
                     {yesterday && yesterday.length > 0 && 
                     <div className='ns-title'>
                        <h3>Yesterday</h3>
                     </div>}
                     {/* Yesterday's Notifications */}
                     { yesterday && <NotificationList notifications={yesterday} owner={owner} />}


                     {/* thisWeek */}
                     {yesterday && yesterday.length > 0 && <div className='tb-pad-10'><hr/></div>}   {/* section breaker */}
                     {thisWeek && thisWeek.length > 0 && 
                     <div className='ns-title'>
                        <h3>This Week</h3>
                     </div>}
                     {/* thisWeek's Notifications */}
                     { thisWeek && <NotificationList notifications={thisWeek} owner={owner} />}


                     {/* thisMonth */}
                     {thisWeek && thisWeek.length > 0 && <div className='tb-pad-10'><hr/></div>}   {/* section breaker */}
                     {thisMonth && thisMonth.length > 0 && 
                     <div className='ns-title'>
                        <h3>This Month</h3>
                     </div>}
                     {/* thisMonth's Notifications */}
                     { thisMonth && <NotificationList notifications={thisMonth} owner={owner} />}


                     {/* lastMonth */}
                     {thisMonth && thisMonth.length > 0 && <div className='tb-pad-10'><hr/></div>}   {/* section breaker */}
                     {lastMonth && lastMonth.length > 0 && 
                     <div className='ns-title'>
                        <h3>Last Month</h3>
                     </div>}
                     {/* lastMonth's Notifications */}
                     { lastMonth && <NotificationList notifications={lastMonth} owner={owner} />}


                     {/* thisYear */}
                     {lastMonth && lastMonth.length > 0 && <div className='tb-pad-10'><hr/></div>}   {/* section breaker */}
                     {thisYear && thisYear.length > 0 && 
                     <div className='ns-title'>
                        <h3>This Year</h3>
                     </div>}
                     {/* thisYear's Notifications */}
                     { thisYear && <NotificationList notifications={thisYear} owner={owner} />}


                     {/* thisYear */}
                     {thisYear && thisYear.length > 0 && <div className='tb-pad-10'><hr/></div>}   {/* section breaker */}
                     {old && old.length > 0 && 
                     <div className='ns-title'>
                        <h3>Old</h3>
                     </div>}
                     {/* old's Notifications */}
                     { old && <NotificationList notifications={old} owner={owner} />}
                     
                  </div>}

                  {/* Sub group template */}
                  <div className='noti-item'>
                     { groupList && 
                        // <NotificationList notifications={groupList} owner={owner} />
                        groupList.map(user => {
                           switch(user.type) {
                              case ('follow'):
                                 return (
                                    <div className='ns-item'>
                                       <div className='ns-img'>
                                          <div className={"round-img-35"}>
                                             {!user.avatar && <p className="img-text">{user.username[0].toUpperCase()}</p>}
                                             {user.avatar  && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="" />}
                                          </div>
                                       </div>
                                       <div className="flex-sb">
                                          <div className='ns-text'>
                                             <p onClick={() => setEnableNotificationDropdown(false)}>
                                                <Link  to={`/users/${user.junior_id}`}><b className='bold'>{user.username}</b> </Link>
                                                started following you.
                                             </p>
                                          </div>

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
                                             {!user.avatar && <p className="img-text">{user.username[0].toUpperCase()}</p>}
                                             {user.avatar  && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="" />}
                                          </div>
                                       </div>
                                       <div className="flex-sb">
                                          <div className='ns-text'>
                                             <p onClick={() => setEnableNotificationDropdown(false)}>
                                                <Link  to={`/users/${user.junior_id}`}><b className='bold'>{user.username}</b> </Link>
                                                liked your blog.
                                             </p>
                                          </div>
                                       </div>
                                       {user.blog_img  && 
                                          <Link to={`/blogs/${user.senior_id}`}>
                                             <div className='ns-blog'>
                                                <img src={`${cloudinary_image_url}/${user.blog_img}`} alt="" />
                                             </div>
                                          </Link>}
                                    </div>
                                 )
                              case ('liked_comment'):
                                 return (
                                    <div className='ns-item'>
                                       <div className='ns-img'>
                                          <div className={"round-img-35"}>
                                             {!user.avatar && <p className="img-text">{user.username[0].toUpperCase()}</p>}
                                             {user.avatar  && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="" />}
                                          </div>
                                       </div>
                                       <div className="flex-sb">
                                          <div className='ns-text'>
                                             <p onClick={() => setEnableNotificationDropdown(false)}>
                                                <Link  to={`/users/${user.junior_id}`}><b className='bold'>{user.username}</b> </Link>
                                                liked your comment.
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 )
                              case ('commented_blog'):
                                 return (
                                    <div className='ns-item'>
                                       <div className='ns-img'>
                                          <div className={"round-img-35"}>
                                             {!user.avatar && <p className="img-text">{user.username[0].toUpperCase()}</p>}
                                             {user.avatar  && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="" />}
                                          </div>
                                       </div>
                                       <div className="flex-sb">
                                          <div className='ns-text'>
                                             <p onClick={() => setEnableNotificationDropdown(false)}>
                                                <Link  to={`/users/${user.junior_id}`}><b className='bold'>{user.username}</b> </Link>
                                                commented on your blog.
                                             </p>
                                          </div>
                                       </div>
                                       {user.blog_img  && 
                                          <Link to={`/blogs/${user.senior_id}`}>
                                             <div className='ns-blog'>
                                                <img src={`${cloudinary_image_url}/${user.blog_img}`} alt="" />
                                             </div>
                                          </Link>}
                                    </div>
                                 )
                              case ('commented_comment'):
                                 return (
                                    <div className='ns-item'>
                                       <div className='ns-img'>
                                          <div className={"round-img-35"}>
                                             {!user.avatar && <p className="img-text">{user.username[0].toUpperCase()}</p>}
                                             {user.avatar  && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="" />}
                                          </div>
                                       </div>
                                       <div className="flex-sb">
                                          <div className='ns-text'>
                                             <p onClick={() => setEnableNotificationDropdown(false)}>
                                                <Link  to={`/users/${user.junior_id}`}><b className='bold'>{user.username}</b> </Link>
                                                commented on your comment.
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 )
                              default:
                                 return (<div>Their is No notification of these type</div>)
                           }
                        })
                     }
                  </div>

               </div>
               
            </div>


      </div>
      </NotificationsContext.Provider>
   )
}
