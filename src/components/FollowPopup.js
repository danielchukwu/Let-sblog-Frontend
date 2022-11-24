import React from 'react'
import { useConstants } from '../hooks/useConstants';
import useFetch from '../hooks/useFetch'
import { ClipLoader } from 'react-spinners';
import { useUrl } from '../hooks/useUrl';
import getCookie from '../utils/getCookie';
import { Link } from 'react-router-dom';

export const FollowPopup = ({id, type, setShowFollowPopup, owner}) => {
   const {spinnerStyle} = useConstants();
   const {cloudinary_image_url, host_url} = useUrl();
   const {data: usersList, setData: setUsersList} = useFetch(`/users/${id}/${type}`);

   const HandleFollow = (id) => {
      // update follow state
      const newData = usersList;
      let follow = null;  // Should either be true (follow as request) or false (un-follow as request)
      newData.map(data => {
         if (data.id == id){
            follow = !data.following;
            data.following = !data.following;
         }
      })
      setUsersList([...newData]);

      // follow or unfollow
      const body = {'follow': follow, 'leader_id': id};
         fetch(`${host_url}/users/follow`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Access-Token': getCookie('usrin')
            },
            body: JSON.stringify(body)
         })
         .then(res => {
            return res.json();
         })
         .then(data => {
            console.log(data);
         })
   }

   return (
      <>
         <div className="pc-wrapper">
            
            {/* Dark Background */}
            <div className="pc-bg z-index-1" onClick={() => setShowFollowPopup(false)}></div>

            {/* Following Content */}
            <div className='f-box'>
               <div className='f-title'>
                  <h3>{type}</h3>
                  <span className='f-cancel' onClick={() => setShowFollowPopup(false)}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                     </svg>
                  </span>
               </div>

               <div className='f-body-container'>
                  {/* Loading */}
                  {!usersList && 
                     <div className='spinner-container-fit'>
                        <ClipLoader color={"var(--theme-green)"} size={20} cssOverride={spinnerStyle}/>
                     </div>
                  }
                  {/* user item */}
                  { usersList && usersList.map(user => {
                     return (
                        <div className='fb-item t-pad-15'>
                           <div className={"round-img-40"}>
                              {!user.avatar && <p className="img-text">{user.username[0].toUpperCase()}</p>}
                              {user.avatar  && <img src={`${cloudinary_image_url}/${user.avatar}`} alt="" />}
                           </div>
                           <div className='fb-username l-pad-5'>
                              <Link to={`/users/${user.id}`} onClick={() => setShowFollowPopup(false)}><h3>{user.username}</h3></Link>
                              <p>{user.name}</p>
                           </div>
                           { user.id !== owner.id &&
                           <div className='fb-follow'>
                              {!user.following && <span className='btn-f-s' onClick={() => HandleFollow(user.id)}>Follow</span>}
                              {user.following && <span className='btn-f-s-clicked' onClick={() => HandleFollow(user.id)}>Following</span>}
                           </div>}
                        </div>
                     )
                  })
                  }

               </div>

            </div>
         </div>
      </>
   )
}
