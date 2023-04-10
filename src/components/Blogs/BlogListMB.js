import React from "react";
import { Link } from "react-router-dom";
import { useUrl } from "../../hooks/useUrl";
import DisplaySvg from "../images/DisplaySvg";
import { binIcon, penIcon } from "../../Constraints";
import DisplayImg from "../images/DisplayImg";

export const BlogListMB = ({ blogs, setShowCenterPopUp, deleteBlogIdRef }) => {
  const { cloudinary_image_url } = useUrl();

  return blogs.map((blog) => {
    return (
      <div className="blog-card-mb" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          <DisplayImg
            selector={"blog-img"}
            img={`${cloudinary_image_url}/${blog.img}`}
            alt={"blog image"}
          />
        </Link>
        <div className="blog-text">
          {/* <!-- Update and Delete Container --> */}
          <div className="cud">
            <p className="blog-cat tb-pad-20">{blog.category}</p>
            {/* <!-- Update & Delete --> */}
            <div className="ud">
              <Link to={`/edit-blog/${blog.id}`}>
                <div className="l-mar-20">
                  <DisplaySvg svg={penIcon} />
                </div>
              </Link>
              <div
                className="l-mar-20"
                onClick={() => {
                  deleteBlogIdRef.current = blog.id;
                  setShowCenterPopUp(true);
                  console.log(deleteBlogIdRef.current);
                }}
              >
                <DisplaySvg svg={binIcon} />
              </div>
            </div>
          </div>
          <Link to={`/blogs/${blog.id}`}>
            <div className="tc-grid">
              <h3 title={blog.title}>{blog.title.slice(0, 35)}</h3>
              <p className="summary">{blog.content.slice(0, 65)}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  });
};
