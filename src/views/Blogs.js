import { Link, useParams } from 'react-router-dom';
import FooterMain from '../components/FooterMain';
import HeaderMain from '../components/HeaderMain';
import useFetch from '../hooks/useFetch';
import { useUrl } from '../hooks/useUrl';
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants';
import { useEffect, useState } from 'react';
import axios from 'axios';
import getCookie from '../utils/getCookie';
import displayPopup from '../utils/displayPopup';


const Blogs = () => {
   const {id} = useParams();
   const {host_url} = useUrl();
   const {data} = useFetch(`/blogs/${id}`);
   const [blog, setBlog] = useState(null);
   const [owner, setOwner] = useState(null);
   const {data: comments, setData: setComments} = useFetch(`/blogs/comments/${id}`);
   const {cloudinary_image_url} = useUrl();
   const {spinnerStyle} = useConstants();

   // Input
   const [content, setContent] = useState();

   // Set Blog and Owner State
   useEffect(() => {
      if (data) {
         setBlog(data.blog);
         setOwner(data.owner);
      }
   }, [data])


   // Handle Submission
   const HandleSubmit = async (e) => {
      e.preventDefault();
      console.log(content)

      const body = {'content': content}
      fetch(`${host_url}/comments`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': getCookie('usrin')
         },
         body: JSON.stringify(body)
      })
      .then(res => {
         return res.json()
      })
      .then(data => {
         console.log(data)
         // setIsLoading(false);
         displayPopup('successful_blog_creation')
      })
   }


   // Handle
   const HandleLike = async (like_type, id, is_like) => {
      console.log(is_like)
      let config = {params : {'x-access-token': getCookie('usrin')}}
      
      // Update like state (Blogs)
      function updateLikeStateBlog (liked, likes, disliked, dislikes) {
         const newData = {...blog};
         newData[liked] = !newData[liked];
         newData[likes] = newData[liked] === true ? newData[likes] + 1 : newData[likes] -1;
         if (newData[liked] === true && newData[disliked] === true){
            newData[disliked] = false;
            newData[dislikes] = newData[disliked] === true ? newData[dislikes] + 1 : newData[dislikes] -1;
         }
         setBlog({...newData})
      }

      // Update like state (Comments)
      function updateLikeStateComments (liked, likes, disliked, dislikes) {
         const newDataList = comments.comments;
         
         newDataList.map(comment => {
            if (comment.id === id){
               console.log(comment);
               comment[liked] = !comment[liked];
               comment[likes] = comment[liked] === true ? comment[likes] + 1 : comment[likes] -1;
               if (comment['liked'] === true && comment[disliked] === true) {
                  comment[disliked] = false;
                  comment[dislikes] = comment[disliked] === true ? comment[dislikes] + 1 : comment[dislikes] -1;
               }
            }
         })

         setComments({"comments": newDataList})
      }

      // Like Or Dislike
      if (is_like){       // LIKE
         if (like_type === 'blogs'){     // If like is for a blog
            updateLikeStateBlog('liked', 'likes', 'disliked', 'dislikes')
            
            axios.get(`${process.env.REACT_APP_HOST_API}/blogs/${id}/likes`, config)
            .then((data) => {
               console.log(data)
            })
         } else {                        // If like is for a comment
            updateLikeStateComments('liked', 'likes', 'disliked', 'dislikes')
            
            axios.get(`${process.env.REACT_APP_HOST_API}/comments/${id}/likes`, config)
            .then((data) => {
               console.log(data)
            })
         }
      } else {            // DISLIKE
         if (like_type === 'blogs'){    // If dislike is for a blog
            updateLikeStateBlog('disliked', 'dislikes', 'liked', 'likes')
            
            
            axios.get(`${process.env.REACT_APP_HOST_API}/blogs/${id}/dislikes`, config)
            .then((data) => {
               console.log(data)
            })
         } else {                       // If dislike is for a comment
            updateLikeStateComments('disliked', 'dislikes', 'liked', 'likes')

            axios.get(`${process.env.REACT_APP_HOST_API}/comments/${id}/dislikes`, config)
            .then((data) => {
               console.log(data)
            })
         }
      }

   }

   
   return (
      <div className='blogs'>

         <HeaderMain owner={owner ? owner : null} showRight={owner ? true : false} />

         {!blog && 
         <div className='spinner-container t-pad-30'>
            <ClipLoader color={"var(--theme-green)"} size={30} cssOverride={spinnerStyle}/>
         </div>}

         {blog && 
         <main className="t-pad-200">
            <div className="content-wrapper max-w-1000">

               <div className="top-section">
                  <div className="title-container">
                     <h1>{blog.title}</h1>
                  </div>
         
                  <div className="blog-owner t-pad-50">
                     <Link to={`/users/${blog.user_id}`}>
                        <em>created by {blog.username}</em>
                     </Link>
                     <div className="round-img-xs">
                        <img src={`${cloudinary_image_url}/${blog.avatar}`} alt="avatar" />
                     </div>
                  </div>
                  <div className="cb-3 t-pad-5">
                     <span className="ud pointer r-pad-20" onClick={() => HandleLike('blogs', id, false)}>
                        <svg className="t-pad-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: blog.disliked ? 'var(--theme-green)' : ''}} >
                           <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-25.3-19.5-46-44.3-47.9c7.7-8.5 12.3-19.8 12.3-32.1c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 320H96c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64V288c0 17.7 14.3 32 32 32z"/>
                        </svg>
                        <small>{blog.dislikes}</small>
                     </span>
                     <span className="ud pointer r-pad-20" onClick={() => HandleLike('blogs', id, true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: blog.liked ? 'var(--theme-green)' : ''}} >
                           <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/>
                        </svg>
                        <small>{blog.likes}</small>
                     </span>
                      {/* <span className="fs-14 underline fw-600 pointer">Reply</span> */}
                  </div>
               </div>
               
               <div className="main-img-section t-pad-50">
                  <div className="blog-img-big">
                     <img src={`${cloudinary_image_url}/${blog.img}`} alt="blog-cover" />
                  </div>
               </div>
               
               <div className="body-section t-pad-50 lr-pad-50">
   
                  <div className="main-text lh-30">
                     <p className='white-space'>{blog.content}</p>
                  </div>
   
                  <div className="about-user">
                     <Link to={`/users/${blog.user_id}`}>
   
                        <div className="user-card">
                           <div className="user-card-top">
                              <div className="round-img-s">
                                 <img src={`${cloudinary_image_url}/${blog.avatar}`} alt="avatar" />
                              </div>
                              <div className="username l-pad-10">
                                 <h3>{blog.username}</h3>
         
                              </div>
                           </div>
                           <div className="user-card-body t-pad-25">
                              <p>{blog.bio}</p>
                           </div>
                           <div className="user-card-footer t-pad-25">
                              <p>{blog.location}</p>
                           </div>
                        </div>
   
                     </Link>
                  </div>
   
               </div>


               {/* COMMENT SECTION */}
               <div className="comment-container t-mar-50">
                  <div className="comment-wrapper lr-pad-20 tb-pad-20">

                     <div className="comment-form">
                        <div className="ct-container">
                           <span>{comments ? comments.comments.length : '0'} Comment{comments && comments.comments.length === 1 ? '' : 's'}</span>
                           {/* <span>Replying to @dandizzy</span> */}
                        </div>
                        <form onSubmit={(e) => HandleSubmit(e)}>
                        <div className="cb-grid t-pad-20 traditional-input-2">
                           <div className="round-img-45">
                              <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />
                           </div>
                              <input type="text" name="comment" id="comment" onChange={(e) => setContent(e.target.value)} />
                        </div>
                        </form>
                     </div>


                     {/* Comment Box */}
                     { comments && 
                     comments.comments.map((comment) => {
                        return (
                        <div className="comment-box cb-grid t-pad-20" key={comment.id}>
                           {/* Profile Picture */}
                           <div className="round-img-45">
                              <img src={`${cloudinary_image_url}/${comment.avatar}`} alt="" />
                           </div>
                           {/* Content */}
                           <div className="">
                              <div className="cb-1">
                                 <span className="cb-username fs-15 pointer">{comment.username}</span>
                                 <span className="cb-time fs-13 l-mar-10">3 mins ago</span>
                              </div>
                              <div className="cb-2 t-pad-5">
                                 <p className="cb-content fs-16">{comment.content}</p>
                              </div>
                              <div className="cb-3 t-pad-5">
                                 <span className="ud pointer r-pad-20" onClick={() => HandleLike('comments', comment.id, false)}>
                                    <svg className="t-pad-5 " style={{fill: comment.disliked ? 'var(--theme-green)' : ''}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                       <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-25.3-19.5-46-44.3-47.9c7.7-8.5 12.3-19.8 12.3-32.1c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 320H96c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64V288c0 17.7 14.3 32 32 32z"/>
                                    </svg>
                                    <small>{comment.dislikes}</small>
                                 </span>
                                 <span className="ud pointer r-pad-20" onClick={() => HandleLike('comments', comment.id, true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: comment.liked ? 'var(--theme-green)' : ''}} >
                                       <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/>
                                    </svg>
                                    <small>{comment.likes}</small>
                                 </span>
                                 <span className="fs-14 underline fw-600 pointer">Reply</span>
                              </div>
                              <div className="cb-4 t-pad-5">
                                 <span className="cb-replies pointer">Replies</span>
                              </div>
                           </div>

                        </div>
                        )
                     })
                     }
                     
                  </div>
               </div>
               {/* End Of Comment Section */}

            </div>
         </main>
         }



         {data && <FooterMain />}
      </div>
   )
}

export default Blogs;
