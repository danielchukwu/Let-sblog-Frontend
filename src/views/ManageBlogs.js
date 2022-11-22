import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { BlogListMB } from '../components/BlogListMB';
import FooterMain from '../components/FooterMain';
import { HeaderSub } from '../components/HeaderSub'
import { useConstants } from '../hooks/useConstants';
import useFetch from '../hooks/useFetch'
import { displayPopupCenter } from '../utils/displayPopupCenter';
import getCookie from '../utils/getCookie';



export const ManageBlogs = () => {
   const [loading, setLoading] = useState(true);
   const {data} = useFetch('/owners/blogs')
   const [blogs, setBlogs] = useState(null)
   const [showCenterPopUp, setShowCenterPopUp] = useState(false)
   const deleteBlogIdRef = useRef()

   const {spinnerStyle} = useConstants();
   

   useEffect(() => {
      if (data) {
         setBlogs(data.blogs)
         console.log('Response: ')
         console.log(blogs)
      }
   }, [data])

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
         <HeaderSub owner={data ? data.owner : null} />

         {!data && 
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

         {data && <FooterMain />}


      </div>
   )
}
