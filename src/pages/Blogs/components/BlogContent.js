import { useContext } from "react";
import DisplayImg from "../../../components/images/DisplayImg";
import TitleLikeDislike from "../components/TitleLikeDislike";
import { TextP } from "../../../components/Text/Texts";
import AboutCard from "../components/AboutCard";
import { BlogContext } from "../../../context/BlogContext";
import CommentSection from "./CommentSection";


const BlogContent = ({owner}) => {
  const { blog } = useContext(BlogContext);

  return (
    <main className="t-pad-200">
      <div className="content-wrapper max-w-1000">

        {/* title, like, and dislike */}
        <TitleLikeDislike />

        {/* blog image cover */}
        <DisplayImg
          selector="blog-img-big"
          img={blog.img}
          alt="blog image"
        />

        {/* grid - blog content and user card */}
        <div className="blog-body-grid">
          <TextP selector="main-text" text={blog.content} />
          <AboutCard />
        </div>

        {/* comment section */}
        <CommentSection />
        
      </div>
    </main>
  );
};

export default BlogContent;
