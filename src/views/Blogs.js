import { Link, useParams } from 'react-router-dom';
import FooterMain from '../components/FooterMain';
import HeaderMain from '../components/HeaderMain';
import useFetch from '../hooks/useFetch';
import { useUrl } from '../hooks/useUrl';
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants';


const Blogs = () => {
   const {id} = useParams();
   const {data} = useFetch(`/blogs/${id}`);
   const {cloudinary_image_url} = useUrl();
   const {spinnerStyle} = useConstants();
   
   return (
      <div className='blogs'>

         <HeaderMain owner={data ? data.owner : null} showRight={data ? true : false} />

         {!data && 
         <div className='spinner-container t-pad-30'>
            <ClipLoader color={"var(--theme-green)"} size={30} cssOverride={spinnerStyle}/>
         </div>}

         {data && 
         <main className="t-pad-200">
            <div className="content-wrapper max-w-1000">

               <div className="top-section">
                  <div className="title-container">
                     <h1>{data.blog.title}</h1>
                  </div>
         
                  <div className="blog-owner t-pad-50">
                     <Link to={`/users/${data.blog.user_id}`}>
                        <em>created by {data.blog.username}</em>
                     </Link>
                     <div className="round-img-xs">
                        <img src={`${cloudinary_image_url}/${data.blog.avatar}`} alt="avatar" />
                     </div>
                  </div>
               </div>
               
               <div className="main-img-section t-pad-50">
                  <div className="blog-img-big">
                     <img src={`${cloudinary_image_url}/${data.blog.img}`} alt="blog-cover" />
                  </div>
               </div>
               
               <div className="body-section t-pad-50 lr-pad-50">
   
                  <div className="main-text lh-30">
                     <p className='white-space'>{data.blog.content}</p>
                  </div>
   
                  <div className="about-user">
                     <Link to={`/users/${data.blog.user_id}`}>
   
                        <div className="user-card">
                           <div className="user-card-top">
                              <div className="round-img-s">
                                 <img src={`${cloudinary_image_url}/${data.blog.avatar}`} alt="avatar" />
                              </div>
                              <div className="username l-pad-10">
                                 <h3>{data.blog.username}</h3>
         
                              </div>
                           </div>
                           <div className="user-card-body t-pad-25">
                              <p>{data.blog.bio}</p>
                           </div>
                           <div className="user-card-footer t-pad-25">
                              <p>{data.blog.location}</p>
                           </div>
                        </div>
   
                     </Link>
                  </div>
   
               </div>
               {/* COMMENT SECTION */}
               <div class="comment-container t-mar-50">
                  <div class="comment-wrapper lr-pad-20 tb-pad-20">

                     <div class="comment-form">
                        <p>571 Comments</p>
                        <div class="cb-grid t-pad-20">
                           <div class="round-img-s">
                              <img src={`${cloudinary_image_url}/${data.blog.avatar}`} alt="" />
                           </div>
                           <input type="text" name="comment" id="comment" />
                        </div>
                     </div>


                     {/* Comment Box */}
                     <div class="comment-box cb-grid t-pad-20">
                        {/* Profile Picture */}
                        <div class="round-img-s">
                           <img src={`${cloudinary_image_url}/${data.blog.avatar}`} alt="" />
                        </div>
                        {/* Content */}
                        <div class="">
                           <div class="cb-1">
                              <span class="cb-username fs-15 pointer">jones</span>
                              <span class="cb-time fs-13">1 hour ago</span>
                           </div>
                           <div class="cb-2 t-pad-5">
                              <p class="cb-content fs-16">Zion had flashbacks of that little kid that tried to defend him in high school.</p>
                           </div>
                           <div class="cb-3 t-pad-5">
                              <span class="fs-14 pointer">Like</span>
                              <span class="fs-14 pointer">Dislike</span>
                              <span class="fs-14 fw-600 pointer">Reply</span>
                           </div>
                           <div class="cb-4 t-pad-5">
                              <p class="cb-replies pointer">Replies</p>
                           </div>
                        </div>

                     </div>
                     
                  </div>
               </div>
            </div>
         </main>
         }



         {data && <FooterMain />}
      </div>
   )
}

export default Blogs;
