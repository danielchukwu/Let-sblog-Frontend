import React, { useContext } from "react";
import { BlogContext } from "../../../context/BlogContext";
import { Link } from "react-router-dom";
import { TextH3, TextParagraph } from "../../../components/Text/Texts";

const AboutCard = () => {
  const {blog, cloudinary_image_url} = useContext(BlogContext);

  return (
    <div className="about-user">
      <Link to={`/users/${blog.user_id}`}>
        <div className="user-card">
          <div className="user-card-top">
            <div className={"round-img-50"}>
              {!blog.avatar && (
                <TextParagraph selector="img-text" text={blog.username[0].toUpperCase()}/>
              )}
              {blog.avatar && (
                <img src={`${cloudinary_image_url}/${blog.avatar}`} alt="" />
              )}
            </div>
            <TextH3 selector="username l-pad-10" text={blog.username} />
          </div>
          <TextParagraph selector="user-card-body t-pad-25" text={blog.bio}/>
          <TextParagraph selector="user-card-footer t-pad-25" text={blog.location}/>
        </div>
      </Link>
    </div>
  );
};

export default AboutCard;
