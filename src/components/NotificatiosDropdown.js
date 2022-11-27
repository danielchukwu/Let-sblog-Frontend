import React, { useState } from 'react'
import { useUrl } from '../hooks/useUrl'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationList } from './NotificationList';


export const NotificatiosDropdown = ({ owner }) => {
   const {data} = useFetch('/users/notifications');

   // Notification group states
   const [today, setToday] = useState();
   const [yesterday, setYesterday] = useState();
   const [thisWeek, setThisWeek] = useState();
   const [thisMonth, setThisMonth] = useState();
   const [thisYear, setThisYear] = useState();
   const [old, setOld] = useState();

   useEffect(() => {
      if (data){
         setToday(data.unseen.today.concat(data.seen.today));
         setYesterday(data.unseen.yesterday.concat(data.seen.yesterday));
         setThisWeek(data.unseen.this_week.concat(data.seen.this_week));
         setThisMonth(data.unseen.this_month.concat(data.seen.this_month));
         setThisYear(data.unseen.this_year.concat(data.seen.this_year));
         setOld(data.unseen.old.concat(data.seen.old));
         // console.log("Test Case: ")
         // console.log(...data.seen.today);
      }
   }, [data]);

   useEffect(() => {
      console.log('Yesterday...')
      if (yesterday){
         console.log(yesterday);
      }
   }, [yesterday])


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
                  {today && today.length > 0 && 
                  <div className='ns-title'>
                     <h3>Today</h3>
                  </div>}
                  {/* Today's Notificationa */}
                  { today && <NotificationList notifications={today} owner={owner} />}

                  {/* Yesterday */}
                  {yesterday && yesterday.length > 0 && <div className='tb-pad-10'><hr/></div>} 
                  {yesterday && yesterday.length > 0 && 
                  <div className='ns-title'>
                     <h3>Yesterday</h3>
                  </div>}
                  {/* Yesterday's Notifications */}
                  { yesterday && <NotificationList notifications={yesterday} owner={owner} />}


                  {/* thisWeek */}
                  {thisWeek && thisWeek.length > 0 && 
                  <div className='ns-title'>
                     <h3>thisWeek</h3>
                  </div>}
                  {/* thisWeek's Notifications */}
                  { thisWeek && <NotificationList notifications={thisWeek} owner={owner} />}


                  {/* thisMonth */}
                  {thisMonth && thisMonth.length > 0 && 
                  <div className='ns-title'>
                     <h3>thisMonth</h3>
                  </div>}
                  {/* thisMonth's Notifications */}
                  { thisMonth && <NotificationList notifications={thisMonth} owner={owner} />}


                  {/* thisYear */}
                  {thisYear && thisYear.length > 0 && 
                  <div className='ns-title'>
                     <h3>thisYear</h3>
                  </div>}
                  {/* thisYear's Notifications */}
                  { thisYear && <NotificationList notifications={thisYear} owner={owner} />}


                  {/* thisYear */}
                  {thisYear && thisYear.length > 0 && 
                  <div className='ns-title'>
                     <h3>thisYear</h3>
                  </div>}
                  {/* thisYear's Notifications */}
                  { thisYear && <NotificationList notifications={thisYear} owner={owner} />}
                  
               </div>

            </div>
            
         </div>

      </div>
   )
}
