import React, { createContext, useState } from 'react'
import { useUrl } from '../hooks/useUrl'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationList } from './NotificationList';

const NotificationContext = createContext();


export const NotificatiosDropdown = ({ owner, setOwner }) => {
   const {data} = useFetch('/users/notifications');

   // Notification group states
   const [today, setToday] = useState();
   const [yesterday, setYesterday] = useState();
   const [thisWeek, setThisWeek] = useState();
   const [thisMonth, setThisMonth] = useState();
   const [thisYear, setThisYear] = useState();
   const [old, setOld] = useState();

   // See a particular group state. e.g all the people who like a particular picture
   const [groupList, setGroupList] = useState();


   useEffect(() => {
      if (data){
         setToday(data.unseen.today.concat(data.seen.today));
         setYesterday(data.unseen.yesterday.concat(data.seen.yesterday));
         setThisWeek(data.unseen.this_week.concat(data.seen.this_week));
         setThisMonth(data.unseen.this_month.concat(data.seen.this_month));
         setThisYear(data.unseen.this_year.concat(data.seen.this_year));
         setOld(data.unseen.old.concat(data.seen.old));
         
      // set notifications_count to 0
      const newData = owner;
      newData.notifications_count = 0;
      setOwner({...owner});
      }
   }, [data]);


   return (
      <NotificationContext.Provider value={ setGroupList }>
      <div className="pc-wrapper-2">

            {/* popup Content */}
            <div className="noti-card">
               <div className='noti-title'>
                  <h3>Notifications</h3>
               </div>
               <div className='noti-body'>
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


                     {/* thisYear */}
                     {thisMonth && thisMonth.length > 0 && <div className='tb-pad-10'><hr/></div>}   {/* section breaker */}
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

               </div>
               
            </div>


      </div>
      </NotificationContext.Provider>
   )
}
