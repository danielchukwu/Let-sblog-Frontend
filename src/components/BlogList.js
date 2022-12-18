import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUrl } from "../hooks/useUrl";

const BlogCard = ({blogs}) => {
   const {cloudinary_image_url} = useUrl();

   // const coverAnimation = (blogCard) => {
   //    console.log(blogCard)
   //    console.log(blogCard.getElementsByClassName("blog-img"));
   //    const blogImg = blogCard.parentElement;
   //    blogImg.style.cssText = {width: "100px"}
   // }

   return (
      blogs.map(blog => {
         return (
         <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div className="blog-card">
               {/* <div className="blog-img" onMouseOver={(e) => coverAnimation(e.target)}> */}
               <div className="blog-img">
                  <img src={`${cloudinary_image_url}/${blog.img}`} alt="blogs" />
               </div>
               <div className="blog-text">
                  <p className="blog-cat line-clamp-1">{blog.category}</p>
                  <div className="tc-grid">
                     {/* <h3 title={blog.title}>{blog.title.slice(0,35)}</h3> */}
                     <h3 className="blog-title line-clamp-2" title={blog.title}>{blog.title}</h3>
                     <p className="summary line-clamp-2">{blog.content} ...</p>
                  </div>
               </div>
            </div>
         </Link>
         )
      })
   )
}

export default BlogCard;