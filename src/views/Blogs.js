import { Link, useParams } from 'react-router-dom';
import FooterMain from '../components/FooterMain';
import HeaderMain from '../components/HeaderMain';
import useFetch from '../hooks/useFetch';

const Blogs = () => {
   const {id} = useParams()
   const {data} = useFetch(`/blogs/${id}`)
   
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
                        <img src={data.blog.avatar} alt="avatar" />
                     </div>
                  </div>
               </div>
               
               <div className="main-img-section t-pad-50">
                  <div className="blog-img-big">
                     <img src={data.blog.img} alt="blog-cover" />
                  </div>
               </div>
               
               <div className="body-section t-pad-50 lr-pad-50">
   
                  <div className="main-text lh-30">
                     <p>{data.blog.content} <br/> <br/> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor cupiditate assumenda consequatur quam laboriosam consequuntur quae sit, labore ea maxime. Recusandae, minima consectetur sapiente sint rem aut alias sit asperiores quisquam, tenetur quas porro expedita, itaque in voluptatem. Similique voluptatibus ratione, ea temporibus non atque, sapiente qui placeat voluptatum voluptates libero ullam? Tempora nesciunt nulla quos quia placeat dolorum quis molestiae iure, nemo similique repellendus fuga porro sequi sapiente beatae laboriosam id impedit aliquam explicabo repudiandae. Quis, vero quia. Quibusdam facere, animi provident voluptatem itaque error commodi ad totam culpa! Voluptatum ducimus laboriosam fugiat aperiam. Suscipit voluptas quam eius saepe iste voluptate quis accusamus architecto ex nulla veritatis quo eveniet, blanditiis ducimus deserunt tempore laboriosam eum! Rerum quia veritatis voluptatum cupiditate, ad nulla dignissimos obcaecati, nemo dolorem voluptatem deleniti voluptates placeat quod assumenda perferendis possimus hic molestias veniam maxime. Excepturi, delectus labore! Adipisci perferendis voluptate soluta labore omnis illum voluptatum rerum consequuntur tenetur vero sint, aliquid sunt, accusantium, facilis ipsum officiis velit porro laborum. Harum libero aperiam quas officiis vero, impedit tenetur sapiente suscipit earum voluptas tempora magni ducimus ipsam cum accusantium veniam eveniet modi, totam explicabo dolorum fugit hic. Laudantium modi odit dignissimos nobis, molestiae enim cumque facere iure.</p>
                  </div>
   
                  <div className="about-user">
                     <Link to={`/users/${data.blog.user_id}`}>
   
                        <div className="user-card">
                           <div className="user-card-top">
                              <div className="round-img-s">
                                 <img src={data.blog.avatar} alt="avatar" />
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
