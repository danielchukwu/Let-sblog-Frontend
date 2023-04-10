import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUrl } from '../../hooks/useUrl';
import getCookie from '../../utils/getCookie';
import { CommentContext } from '../../context/BlogContext';

const CommentList = (props) => {
   const {cloudinary_image_url, host_url} = useUrl();
   const [comments, setComments] = useState();
   const [subComments, setSubComments] = useState({});
   const {replyCommentIds, setReplyCommentIds} = useContext(CommentContext);

   // Add Comments
   useEffect(() => {
      setComments(props.comments);
      // console.log(props.comments)
   }, [props])


   // Handle Submission
   const HandleSubmit = async (e, comment_id, user_id) => {
      e.preventDefault();
      console.log(`input-${comment_id}`)
      const input = document.querySelector(`#input-${comment_id}`);
      const content = input.value;
      input.value = '';

      if (content.length === 0){
         return;
      }
      const body = {'content': content, 'comment_id': comment_id, 'user_id': user_id}
      // setCommentIsLoading(true);

      const updateRepliesCount = () => {
         const newData = comments;
         newData.map(comment => {
            if (comment.id === comment_id){
               comment['sub_comments_count'] += 1
            }
         })
         setComments([...newData])
      }
      
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
         updateRepliesCount();
         const newData = subComments;
         if (newData[comment_id]){
            newData[comment_id].unshift(data);
         }
         setSubComments({...newData});
      })
   }
   
   
   // Handle Like
   const HandleLike = async (id, is_like, comments, setComments, user_id) => {
      // Passing comments state and the setComments function 
      // will alow the handling of sub comments states
      let config = {params : {'x-access-token': getCookie('usrin')}}

      // Update like state (Comments)
      function updateLikeStateComments (liked, likes, disliked, dislikes) {
         const newDataList = comments;
         console.log("NewDataList: ");

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

      // POST like request
      function sendLikeRequest(like_type) {  // like_type (likes or dislikes)
         const body = {'user_id': user_id}
         
         fetch(`${host_url}/comments/${id}/${like_type}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Access-Token': getCookie('usrin')
            },
            body: JSON.stringify(body)
         })
         .then(res => res.json())
         .then(data => {
            // console.log(data)
         })
      }

      // Like Or Dislike
      if (is_like){                     // If like. like comment
         updateLikeStateComments('liked', 'likes', 'disliked', 'dislikes');
         sendLikeRequest('likes');
         } else {                        // If dislike. dislike comment
            updateLikeStateComments('disliked', 'dislikes', 'liked', 'likes');
            sendLikeRequest('dislikes');
      }

   }


   // Fetch sub comments
   const HandleFetch = (id, element) => {
      const subCommentsContainer = element.parentElement.parentElement.parentElement.querySelector('.cb-5');
      
      let config = {params : {'x-access-token': getCookie('usrin')}};
      axios.get(`${process.env.REACT_APP_HOST_API}/comments/${id}/comments`, config)
      .then(data => {
         if (data.data.message){
            throw Error('missing token');
         }
         let newData = null;
         if (subComments[id]){
            newData = subComments;
            delete newData[id];
            setSubComments({...newData});
         } else {
            newData = subComments;
            newData[id] = data.data;
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
            <div className={"round-img-40 t-mar-5"}>
               {!comment.avatar && <p className="img-text">{comment.username[0].toUpperCase()}</p>}
               {comment.avatar  && <img src={`${cloudinary_image_url}/${comment.avatar}`} alt="" />}
            </div>
            {/* Content */}
            <div className="">
               <Link to={`/users/${comment.user_id}`} >
                  <div className="cb-1">
                     <span className="cb-username fs-15 pointer">{comment.username}</span>
                     {/* <span className="cb-time fs-13 l-mar-10">3 mins ago</span> */}
                  </div>
               </Link>
               <div className="cb-2 t-pad-5">
                  <p className="cb-content white-space fs-16">{comment.content}</p>
               </div>
               <div className="cb-3 t-pad-5">
                  <span className="ud pointer r-pad-20" onClick={() => {
                        // HandleLike('comments', comment.id, false, comments, setComments)
                        HandleLike(comment.id, false, comments, setComments, comment.user_id)
                     }}>
                     <svg className="t-pad-5 " style={{fill: comment.disliked ? 'var(--theme-green)' : ''}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-25.3-19.5-46-44.3-47.9c7.7-8.5 12.3-19.8 12.3-32.1c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 320H96c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64V288c0 17.7 14.3 32 32 32z"/>
                     </svg>
                     <small>{comment.dislikes}</small>
                  </span>
                  <span className="ud pointer r-pad-20" onClick={() => HandleLike(comment.id, true, comments, setComments, comment.user_id)}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: comment.liked ? 'var(--theme-green)' : ''}} >
                        <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/>
                     </svg>
                     <small>{comment.likes}</small>
                  </span>
                  <span className="fs-14 underline fw-600 pointer" onClick={() => {
                     const newData = replyCommentIds;
                     newData.add(comment.id);
                     setReplyCommentIds(new Set(newData));
                  }}>Reply</span>
               </div>
               {/* Reply Comment */}
               { replyCommentIds.has(comment.id) &&
               <div class="cb-content rc t-pad-5 traditional-input-2">
                  
                  <textarea name="content" id={`input-${comment.id}`} onChange={(e) => {props.autoResize(e.target)}} autoFocus></textarea>
                  {/* <input type="text" name="comment" id={`input-${comment.id}`} autoFocus /> */}

                  
                  <div class="sc-container">
                     <div class="sc-buttons">
                        <span class="btn-round-off" onClick={() => {
                           const newData = replyCommentIds;
                           newData.delete(comment.id);
                           setReplyCommentIds(new Set(newData));
                        }}>Cancel</span>
                        <span class="btn-round l-mar-10" onClick={(e) => HandleSubmit(e, comment.id, comment.user_id)}>Reply</span>
                     </div>
                  </div>
               </div>
               }
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
                     // <CommentList comments={subComments[comment.id]} setSubComments={setSubComments} HandleLike={HandleLike} />
                     <CommentList comments={subComments[comment.id]} />
                  }
               </div>
            </div>

         </div>
         )
      })
   )
}

export default CommentList;