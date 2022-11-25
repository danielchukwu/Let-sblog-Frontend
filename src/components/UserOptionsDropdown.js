import React from 'react'
import { Link } from 'react-router-dom'
import { useUrl } from '../hooks/useUrl'

export const UserOptionsDropdown = ({ owner, handleLogout }) => {
   const {cloudinary_image_url} = useUrl();
   return (
      <div className="pc-wrapper-2">
                     
         {/* popup Content */}
         <div className="up-card tb-pad-10">
            <Link to={`/users/${owner.id}`}>
               <div className='up-profile'>
                  <div className="round-img-50 r-mar-10">
                     {!owner.avatar && <h3 className="img-text">{owner.name[0].toUpperCase()}</h3>}
                     { owner.avatar && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt=''/>}
                  </div>
                  <div className='up-profile-name'>
                     <h3>{owner ? owner.name : ''}</h3>
                     <small>@{owner ? owner.username : ''}</small>
                  </div>

               </div>
            </Link>
            <hr />
            <Link to={`/users/${owner.id}`}><p>Profile</p></Link>
            <Link to={"/create-blog"}><p>Create Blog</p></Link>
            <Link to={"/manage-blogs"}><p>Manage Blogs</p></Link>
            <hr />
            <p className='pointer' onClick={handleLogout}>Logout</p>
            
         </div>

      </div>
   )
}
