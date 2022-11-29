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
import CommentList from '../components/CommentList';
import { createContext } from 'react';

export const CommentContext = createContext();


const Blogs = () => {
   const {id} = useParams();
   const {host_url} = useUrl();
   const {data : blog, setData: setBlog} = useFetch(`/blogs/${id}`);
   const {data : owner, setData: setOwner} = useFetch(`/users/me`);
   const {data: comments, setData: setComments} = useFetch(`/blogs/${id}/comments`);
   const {cloudinary_image_url} = useUrl();
   const {spinnerStyle} = useConstants();
   const [showCommentBtn, setShowCommentBtn] = useState(false);

   const [commentIsLoading, setCommentIsLoading] = useState(false);
   const [replyCommentIds, setReplyCommentIds] = useState(new Set());       

   // Input
   const [content, setContent] = useState();


   // Handle Submission
   const HandleSubmit = async (e, blog_id) => {
      e.preventDefault();
      if (content.length === 0){
         return;
      }
      const body = {'content': content, 'blog_id': blog_id, 'user_id': blog.user_id}
      // setShowSubmitCommentBtn(false);
      setCommentIsLoading(true);
      setContent('') // Empty Comment Input Field
      
      fetch(`${host_url}/comments`, {
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
         const newBlog = [data, ...comments];
         setCommentIsLoading(false);
         setComments(newBlog);
      })
   }

   // Handle Top Likes
   const HandleLike = async (id, is_like) => {
      // Passing comments state and the setComments function 
      // will alow the handling of sub comments states
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

      // POST like request
      function sendLikeRequest(like_type) {  // like_type (likes or dislikes)
         console.log("Sending Like:...")
         const body = {'user_id': blog.user_id}
         console.log(body)
         
         fetch(`${host_url}/blogs/${id}/${like_type}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Access-Token': getCookie('usrin')
            },
            body: JSON.stringify(body)
         })
         .then(res => res.json())
         .then(data => {
            console.log(data)
         })
      }

      // Like Or Dislike
      if (is_like){       // LIKE
         // If like is for a blog
         updateLikeStateBlog('liked', 'likes', 'disliked', 'dislikes')
         sendLikeRequest('likes')
         
         // axios.get(`${process.env.REACT_APP_HOST_API}/blogs/${id}/likes`, config)
         // .then((data) => {
         //    console.log(data)
         // })
      } else {            // DISLIKE
         // If dislike is for a blog
         updateLikeStateBlog('disliked', 'dislikes', 'liked', 'likes')
         sendLikeRequest('dislikes')
         
         // axios.get(`${process.env.REACT_APP_HOST_API}/blogs/${id}/dislikes`, config)
         // .then((data) => {
            //    console.log(data)
            // })
      }

   }

   
   return (
      <CommentContext.Provider value={{ replyCommentIds, setReplyCommentIds }} >
         <div className='blogs'>

            <HeaderMain owner={owner ? owner : null} showRight={owner ? true : false} setOwner={setOwner} />

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
                           <em className='btn-edit-profile r-mar-10'>created by {blog.username}</em>
                        </Link>
                        <div className={"round-img-25"}>
                           {!blog.avatar && <p className="img-t-14">{blog.username[0].toUpperCase()}</p>}
                           {blog.avatar  && <img src={`${cloudinary_image_url}/${blog.avatar}`} alt="" />}
                        </div>
                     </div>
                     <div className="cb-3 t-pad-5">
                        <span className="ud pointer r-pad-20" onClick={() => HandleLike(id, false)}>
                           <svg className="t-pad-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: blog.disliked ? 'var(--theme-green)' : ''}} >
                              <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-25.3-19.5-46-44.3-47.9c7.7-8.5 12.3-19.8 12.3-32.1c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 320H96c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64V288c0 17.7 14.3 32 32 32z"/>
                           </svg>
                           <small>{blog.dislikes}</small>
                        </span>
                        <span className="ud pointer r-pad-20" onClick={() => HandleLike(id, true)}>
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
                  
                  <div className="body-section t-pad-50 lr-pad-30">
      
                     <div className="main-text lh-30">
                        <p className='white-space'>{blog.content}</p>
                     </div>
      
                     <div className="about-user">
                        <Link to={`/users/${blog.user_id}`}>
      
                           <div className="user-card">
                              <div className="user-card-top">
                                 <div className={"round-img-50"}>
                                    {!blog.avatar && <p className="img-text">{blog.username[0].toUpperCase()}</p>}
                                    {blog.avatar  && <img src={`${cloudinary_image_url}/${blog.avatar}`} alt="" />}
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

                        <div className="comment-form b-pad-10">
                           <div className="ct-container b-pad-20">
                              <span>{comments ? comments.length : '0'} Comment{comments && comments.length === 1 ? '' : 's'}</span>
                              {/* <span>Replying to @dandizzy</span> */}
                           </div>
                           <div className="cb-grid traditional-input-2">
                              <div className='flex-a-center'>
                                 <div className={"round-img-40"}>
                                    {owner && !owner.avatar && <p className="img-text">{owner.name[0].toUpperCase()}</p>}
                                    {owner && owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
                                 </div>
                              </div>
                              <div class="rc t-pad-5 traditional-input-2">
                                 <input type="text" name="comment" value={content} id="comment" onChange={(e) => setContent(e.target.value)} onFocus={() => setShowCommentBtn(true)}/>
                                 { showCommentBtn && 
                                 <div class="sc-container">
                                    <div class="sc-buttons">
                                       <span class="btn-round-off" onClick={() => setShowCommentBtn(false)}>Cancel</span>
                                       <span class="btn-round l-mar-10" onClick={(e) => HandleSubmit(e, blog.id)}>Comment</span>
                                    </div>
                                 </div>}
                              </div>
                           </div>
                        </div>

                        { commentIsLoading &&
                        <div className='comment-loader'>
                           <ClipLoader color={"var(--theme-green)"} size={20} cssOverride={spinnerStyle}/>
                        </div>}

                        <CommentList comments={comments} />
                        
                     </div>
                  </div>
                  {/* End Of Comment Section */}

               </div>
            </main>
            }



            {blog && <FooterMain />}
         </div>
      </CommentContext.Provider>
   )
}

export default Blogs;
