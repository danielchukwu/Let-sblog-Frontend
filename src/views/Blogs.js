import { Link, useParams } from 'react-router-dom';
import FooterMain from '../components/FooterMain';
import HeaderMain from '../components/HeaderMain';
import useFetch from '../hooks/useFetch';
import { useUrl } from '../hooks/useUrl';

const Blogs = () => {
   const {id} = useParams()
   const {data} = useFetch(`/blogs/${id}`)
   const {cloudinary_image_url} = useUrl()
   
   return (
      <div className='blogs'>

         {data && <HeaderMain owner={data.owner}/>}

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
            </div>
         </main>
         }

         {data && <FooterMain />}
      </div>
   )
}

export default Blogs;
