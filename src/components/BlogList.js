import { Link } from "react-router-dom";
import { useUrl } from "../hooks/useUrl";

const BlogCard = ({blogs}) => {
   const {cloudinary_image_url} = useUrl();

   return (
      blogs.map(blog => {
         return (
         <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div className="blog-card" >
               <div className="blog-img">
                  <img src={`${cloudinary_image_url}/${blog.img}`} alt="blogs" />
               </div>
               <div className="blog-text">
                  <p className="blog-cat tb-pad-20">{blog.category}</p>
                  <div className="tc-grid">
                     <h3 title={blog.title}>{blog.title.slice(0,35)}</h3>
                     <p className="summary">{blog.content.slice(0,65)} ...</p>
                  </div>
               </div>
            </div>
         </Link>
         )
      })
   )
}

export default BlogCard;