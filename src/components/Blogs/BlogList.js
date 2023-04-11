import { Link } from "react-router-dom";
import DisplayImg from "../images/DisplayImg";
import { TextH3, TextP } from "../Text/Texts";

const BlogCard = ({blogs}) => {
   return (
      blogs.map(blog => {
         return (
         <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div className="blog-card">
               <DisplayImg selector="blog-img" img={blog.img} alt="blogs" />
               <div className="blog-text">
                  <TextP selector="blog-cat line-clamp-1" text={blog.category}/>
                  <div className="tc-grid">
                     <TextH3 selector="blog-title line-clamp-2" text={blog.title} showTitle={true} />
                     <TextP selector="summary line-clamp-2" text={`${blog.content.slice(0,60)} ...`} />
                  </div>
               </div>
            </div>
         </Link>
         )
      })
   )
}

export default BlogCard;