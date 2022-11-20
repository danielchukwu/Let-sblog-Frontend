import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useUrl } from '../hooks/useUrl';
import getCookie from '../utils/getCookie';
import { CommentContext } from '../views/Blogs';

const CommentList = (props) => {
   const {cloudinary_image_url} = useUrl();
   const [comments, setComments] = useState();
   const [subComments, setSubComments] = useState({});
   const {setReplyComment} = useContext(CommentContext);

   useEffect(() => {
      setComments(props.comments);
   }, [props])

   // Handle Like
   const HandleLike = async (id, is_like, comments, setComments) => {
      // Passing comments state and the setComments function 
      // will alow the handling of sub comments states
      let config = {params : {'x-access-token': getCookie('usrin')}}

      // Update like state (Comments)
      function updateLikeStateComments (liked, likes, disliked, dislikes) {
         const newDataList = comments;
         console.log("NewDataList: ");
         console.log(newDataList);
         console.log(subComments);

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

         setComments([...newDataList])
      }

      // Like Or Dislike
      if (is_like){                     // If like. like comment
         updateLikeStateComments('liked', 'likes', 'disliked', 'dislikes')
         
         axios.get(`${process.env.REACT_APP_HOST_API}/comments/${id}/likes`, config)
         .then((data) => {
            console.log(data)
         })
      } else {                        // If dislike. dislike comment
         updateLikeStateComments('disliked', 'dislikes', 'liked', 'likes')

         axios.get(`${process.env.REACT_APP_HOST_API}/comments/${id}/dislikes`, config)
         .then((data) => {
            console.log(data)
         })
      }

   }


   // Fetch sub comments
   const HandleFetch = (id, element) => {
      // console.log(element.parentElement.parentElement.parentElement.querySelector('.cb-5'));
      const subCommentsContainer = element.parentElement.parentElement.parentElement.querySelector('.cb-5');
      console.log(subCommentsContainer)
      
      let config = {params : {'x-access-token': getCookie('usrin')}};
      axios.get(`${process.env.REACT_APP_HOST_API}/comments/${id}/comments`, config)
      .then(data => {
         if (data.data.message){
            throw Error('missing token');
         }
         console.log(data.data);
         let newData = null;
         if (subComments[id]){
            newData = subComments;
            delete newData[id];
            setSubComments({...newData});
         } else {
            newData = subComments;
            newData[id] = data.data;
            console.log(newData);
            setSubComments({...newData});         
         }
         })
         .catch(err => {
            console.log(`Error: ${err.message}`);
         })
      
   }
   
   return (
      comments && 
         comments.map((comment) => {
         return (
         <div className="comment-box cb-grid t-pad-20" key={comment.id} id>
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
                  <p className="cb-content fs-14">{comment.content}</p>
               </div>
               <div className="cb-3 t-pad-5">
                  <span className="ud pointer r-pad-20" onClick={() => {
                        // HandleLike('comments', comment.id, false, comments, setComments)
                        HandleLike(comment.id, false, comments, setComments)
                     }}>
                     <svg className="t-pad-5 " style={{fill: comment.disliked ? 'var(--theme-green)' : ''}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-25.3-19.5-46-44.3-47.9c7.7-8.5 12.3-19.8 12.3-32.1c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 320H96c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64V288c0 17.7 14.3 32 32 32z"/>
                     </svg>
                     <small>{comment.dislikes}</small>
                  </span>
                  <span className="ud pointer r-pad-20" onClick={() => HandleLike(comment.id, true, comments, setComments)}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: comment.liked ? 'var(--theme-green)' : ''}} >
                        <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/>
                     </svg>
                     <small>{comment.likes}</small>
                  </span>
                  <span className="fs-14 underline fw-600 pointer" onClick={() => setReplyComment(comment)}>Reply</span>
               </div>
               <div className="cb-4 t-pad-5">
                  { comment.sub_comments_count > 0 &&
                  <span>
                     <span className="cb-replies pointer" onClick={(e) => HandleFetch(comment.id, e.target)}>Replies {comment.sub_comments_count}</span>
                     {/* <small className='fs-14 l-pad-10'>{comment.sub_comments_count}</small> */}
                  </span>
                  }
               </div>
               <div className="cb-5 t-pad-5">
                  {subComments && subComments[comment.id] &&
                     <CommentList comments={subComments[comment.id]} setSubComments={setSubComments} HandleLike={HandleLike} />
                  }
               </div>
            </div>

         </div>
         )
      })
   )
}

export default CommentList;