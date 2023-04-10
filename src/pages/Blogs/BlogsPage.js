import { Link, useParams } from "react-router-dom";
import FooterMain from "../../components/FooterMain";
import HeaderMain from "../../components/HeaderMain";
import useFetch from "../../hooks/useFetch";
import { useUrl } from "../../hooks/useUrl";
import { useContext, useState } from "react";
import { BlogContext, CommentContext } from "../../context/BlogContext";
import Spinner from "../Spinner";
import BlogContent from "./components/BlogContent";
import { OwnerContext } from '../../context/UserContext';


const BlogsPage = () => {
  // const {owner, setOwner} = useContext(OwnerContext);
  const { id } = useParams();
  const { data: blog, setData: setBlog } = useFetch(`/blogs/${id}`);
  const { data: owner, setData: setOwner } = useFetch(`/users/me`);
  const { cloudinary_image_url } = useUrl();
  const [replyCommentIds, setReplyCommentIds] = useState(new Set());


  return (
    <CommentContext.Provider value={{ replyCommentIds, setReplyCommentIds }}>
      <BlogContext.Provider value={{ blog, setBlog, id, cloudinary_image_url, owner }}>

        <div className="blogs">

          {/* Header */}
          <HeaderMain
            owner={owner ? owner : null}
            showRight={owner ? true : false}
            setOwner={setOwner}
          />

          {/* Spinner - loading until the data is fetched */}
          {!blog && <Spinner />}

          {/* Blog Content */}
          {blog && <BlogContent owner={owner}/>}

          {/* Footer */}
          {blog && <FooterMain />}

        </div>

      </BlogContext.Provider>
    </CommentContext.Provider>
  );
};

export default BlogsPage;