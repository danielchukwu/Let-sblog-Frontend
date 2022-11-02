import { Link } from "react-router-dom";

const BlogCard = ({blogs}) => {
   return (
      blogs.map(blog => {
         return (
         <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div className="blog-card" >
               <div className="blog-img">
                  <img src={blog.img} alt="blogs" />
               </div>
               <div className="blog-text">
                  <p className="blog-cat tb-pad-20">{blog.category}</p>
                  <div className="tc-grid">
                     <h3>{blog.title.slice(0,35)}</h3>
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