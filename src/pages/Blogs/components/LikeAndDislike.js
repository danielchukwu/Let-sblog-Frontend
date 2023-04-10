import { useContext } from "react";
// import { BlogContext } from "../../../context/BlogContext";
// import { useUrl } from "../../../hooks/useUrl";

import { Link, useParams } from 'react-router-dom';
import { useUrl } from '../../../hooks/useUrl';
import getCookie from '../../../utils/getCookie';
import DisplaySvg from '../../../components/images/DisplaySvg';
import { thumbsDown, thumbsUp } from '../../../Constraints';
import { BlogContext } from '../../../context/BlogContext';

const LikeAndDislike = () => {
  const {id, blog, setBlog} = useContext(BlogContext);
  const { cloudinary_image_url, host_url } = useUrl();

  // Handle Top Likes
  const HandleLike = async (id, is_like) => {
    // Passing comments state and the setComments function
    // will alow the handling of sub comments states
    let config = { params: { "x-access-token": getCookie("usrin") } };

    // Update like state (Blogs)
    function updateLikeStateBlog(liked, likes, disliked, dislikes) {
      const newData = { ...blog };
      newData[liked] = !newData[liked];
      newData[likes] =
        newData[liked] === true ? newData[likes] + 1 : newData[likes] - 1;
      if (newData[liked] === true && newData[disliked] === true) {
        newData[disliked] = false;
        newData[dislikes] =
          newData[disliked] === true
            ? newData[dislikes] + 1
            : newData[dislikes] - 1;
      }
      setBlog({ ...newData });
    }

    // POST like request
    function sendLikeRequest(like_type) {
      // like_type (likes or dislikes)
      console.log("Sending Like:...");
      const body = { user_id: blog.user_id };
      console.log(body);

      fetch(`${host_url}/blogs/${id}/${like_type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": getCookie("usrin"),
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }

    // Like Or Dislike
    if (is_like) {
      // LIKE
      // If like is for a blog
      updateLikeStateBlog("liked", "likes", "disliked", "dislikes");
      sendLikeRequest("likes");
      // })
    } else {
      // DISLIKE
      // If dislike is for a blog
      updateLikeStateBlog("disliked", "dislikes", "liked", "likes");
      sendLikeRequest("dislikes");
    }
  };

  return (
    <div className="top-section">
      <div className="title-container">
        <h1>{blog.title}</h1>
      </div>

      <div className="blog-owner t-pad-50">
        <Link to={`/users/${blog.user_id}`}>
          <em className="btn-edit-profile r-mar-10">
            created by {blog.username}
          </em>
        </Link>
        <div className={"round-img-25"}>
          {!blog.avatar && (
            <p className="img-t-14">{blog.username[0].toUpperCase()}</p>
          )}
          {blog.avatar && (
            <img src={`${cloudinary_image_url}/${blog.avatar}`} alt="" />
          )}
        </div>
      </div>
      <div className="cb-3 t-pad-5">
        <span
          className="ud pointer r-pad-20"
          onClick={() => HandleLike(id, false)}
        >
          <DisplaySvg svg={thumbsDown(blog)} />
          <small>{blog.dislikes}</small>
        </span>
        <span
          className="ud pointer r-pad-20"
          onClick={() => HandleLike(id, true)}
        >
          <DisplaySvg svg={thumbsUp(blog)} />
          <small>{blog.likes}</small>
        </span>
      </div>
    </div>
  );
};

export default LikeAndDislike;
