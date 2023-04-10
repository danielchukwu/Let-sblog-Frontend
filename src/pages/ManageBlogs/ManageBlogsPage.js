import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { BlogListMB } from '../../components/Blogs/BlogListMB';
import FooterMain from '../../components/FooterMain';
import { HeaderSub } from '../../components/HeaderSub'
import { useConstants } from '../../hooks/useConstants';
import useFetch from '../../hooks/useFetch'
// import { displayPopupCenter } from '../../utils/displayPopupCenter';
import getCookie from '../../utils/getCookie';



export const ManageBlogsPage = () => {
   const [loading, setLoading] = useState(true);
   const {data: owner, setData: setOwner} = useFetch('/users/me');
   const [blogs, setBlogs] = useState();
   const [showCenterPopUp, setShowCenterPopUp] = useState(false);
   const deleteBlogIdRef = useRef();

   const {spinnerStyle} = useConstants();

   useEffect(() => {
      if (owner){
         let config = {params : {'x-access-token': getCookie('usrin')}}
         axios.get(`${process.env.REACT_APP_HOST_API}/users/${owner.id}/blogs`, config)
            .then(data => {
               if (data.data.message){
                  throw Error('missing token')
               }
               setBlogs(data.data)
            })
            .catch(err => {
               console.log(`Error: ${err.message}`)
            })
      }
   }, [owner])
   

   useEffect(() => {
      if (owner) {
         setBlogs()
         console.log('Response: ')
         console.log(blogs)
      }
   }, [owner])

   const handleDelete = async (id) => {
      fetch(`${process.env.REACT_APP_HOST_API}/blogs/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': getCookie('usrin')
         }
      })
      .then(res => res.json())
      .then(result => {
         const newBlogs = blogs.filter(blog => blog.id != id);
         setBlogs(newBlogs);
      })
      .catch(err => {console.log(err.message)})
   }
   
   
   return (
      <div className='manage-blogs-react'>
         <HeaderSub owner={owner ? owner : null} setOwner={setOwner}/>

         {!blogs && 
         <div className='spinner-container t-pad-30'>
            <ClipLoader color={"var(--theme-green)"} size={30} cssOverride={spinnerStyle}/>
         </div>}

         <div className="popup-center-container">
            {showCenterPopUp && 
            <div className="pc-wrapper">
               <div className="pc-box-wrapper" onClick={() => setShowCenterPopUp(false)}>
                  <div className="pc-box">
                     <p>Are you sure you want to delete this blog?</p>
                     <div className="pc-options t-pad-15">
                        <span onClick={() => setShowCenterPopUp(false)}>Cancel</span>
                        <span onClick={() => {setShowCenterPopUp(false); handleDelete(deleteBlogIdRef.current)}}>Confirm</span>
                     </div>
                  </div>
               </div>
               <div className="pc-bg">
               </div>
            </div>}
         </div>

         <main className="t-pad-120">
            <div className="content-wrapper max-w-1000">

               {/* <!-- Manage Blogs Banner --> */}
               <div className="mb-container">
                  <h3>Manage Your Blogs</h3>
                  <p>Total blogs: {blogs ? blogs.length : 0}</p>
               </div>
               
               <div className="grid-wrapper t-pad-50">

                  {blogs && <BlogListMB blogs={blogs} setShowCenterPopUp={setShowCenterPopUp} deleteBlogIdRef={deleteBlogIdRef} />}

               </div>
            </div>

         </main>

         {owner && <FooterMain />}


      </div>
   )
}
