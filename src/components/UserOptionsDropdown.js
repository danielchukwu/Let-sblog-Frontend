import { Link } from 'react-router-dom';
import DisplayImg from './images/DisplayImg';

export const UserOptionsDropdown = ({ owner, handleLogout, setEnableOptionsDropdown }) => {
   return (
      <div className="pc-wrapper-2">
         
         {/* popup Content */}
         <div className="up-card tb-pad-10">
            <Link to={`/users/${owner.id}`} onClick={() => setEnableOptionsDropdown(false)}>
               <div className='up-profile'>
                  <div className="round-img-50 r-mar-10">
                     <DisplayImg selector="fit img-text" img={owner.avatar} name={owner.name} alt="profile image"/>
                  </div>
                  <div className='up-profile-name'>
                     <h3>{owner ? owner.name : ''}</h3>
                     <small>@{owner ? owner.username : ''}</small>
                  </div>

               </div>
            </Link>
            <hr />
            <Link to={`/edit-profile`} onClick={() => setEnableOptionsDropdown(false)}><p>Edit Profile</p></Link>
            <Link to={"/create-blog"}><p>Create Blog</p></Link>
            <Link to={"/manage-blogs"}><p>Manage Blogs</p></Link>
            <hr />
            <p className='pointer' onClick={handleLogout}>Logout</p>
            
         </div>
      </div>
   )
}