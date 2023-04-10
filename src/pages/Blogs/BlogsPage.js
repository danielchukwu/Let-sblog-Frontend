import { Link, useParams } from "react-router-dom";
import FooterMain from "../../components/FooterMain";
import HeaderMain from "../../components/HeaderMain";
import useFetch from "../../hooks/useFetch";
import { useUrl } from "../../hooks/useUrl";
import { ClipLoader } from "react-spinners";
import { useConstants } from "../../hooks/useConstants";
import getCookie from "../../utils/getCookie";
import CommentList from "../../components/Comments/CommentList";
import { createContext, useState } from "react";
import DisplayImg from "../../components/images/DisplayImg";
import LikeAndDislike from "./components/LikeAndDislike";
import { BlogContext } from "../../context/BlogContext";
import Spinner from "../Spinner";
import { TextParagraph } from "../../components/Text/Texts";
import AboutCard from "./components/AboutCard";

export const CommentContext = createContext();

const BlogsPage = () => {
  const { id } = useParams();
  const { host_url } = useUrl();
  const { data: blog, setData: setBlog } = useFetch(`/blogs/${id}`);
  const { data: owner, setData: setOwner } = useFetch(`/users/me`);
  const { data: comments, setData: setComments } = useFetch(
    `/blogs/${id}/comments`
  );
  const { cloudinary_image_url } = useUrl();
  const { spinnerStyle } = useConstants();
  const [showCommentBtn, setShowCommentBtn] = useState(false);

  const [commentIsLoading, setCommentIsLoading] = useState(false);
  const [replyCommentIds, setReplyCommentIds] = useState(new Set());

  // Input
  const [content, setContent] = useState();

  // Handle Submission
  const HandleSubmit = async (e, blog_id) => {
    e.preventDefault();
    if (content.length === 0) {
      return;
    }
    const body = { content: content, blog_id: blog_id, user_id: blog.user_id };
    // setShowSubmitCommentBtn(false);
    setCommentIsLoading(true);
    setContent(""); // Empty Comment Input Field

    fetch(`${host_url}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": getCookie("usrin"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newBlog = [data, ...comments];
        setCommentIsLoading(false);
        setComments(newBlog);
      });
  };

  // Textarea Auto Resize
  const autoResize = (textarea) => {
    console.log(textarea);
    console.log(textarea.style);

    textarea.style.cssText = `height: ${textarea.scrollHeight}px; overflow-y: hidden;`;

    textarea.addEventListener("input", function () {
      console.log("just changed!");
      this.style.height = "auto";
      this.style.height = `${this.scrollHeight}px`;
      window.scrollTo = window.scrollY + 500;
    });
  };

  return (
    <CommentContext.Provider value={{ replyCommentIds, setReplyCommentIds }}>
      <BlogContext.Provider value={{ blog, setBlog, id, cloudinary_image_url }}>
        <div className="blogs">
          <HeaderMain
            owner={owner ? owner : null}
            showRight={owner ? true : false}
            setOwner={setOwner}
          />

          {/* Spinner - loading until the data is fetched */}
          {!blog && <Spinner />}

          {blog && (
            <main className="t-pad-200">
              <div className="content-wrapper max-w-1000">
                
                <LikeAndDislike />

                <DisplayImg
                  selector="main-img-section blog-img-big"
                  img={`${cloudinary_image_url}/${blog.img}`}
                  alt="blog image"
                />

                <div className="body-section t-pad-50 lr-pad-30">
                  <TextParagraph selector="main-text" text={blog.content} /> 

                  <AboutCard />
                </div>

                {/* COMMENT SECTION */}
                <div className="comment-container t-mar-50">
                  <div className="comment-wrapper lr-pad-20 tb-pad-20">
                    <div className="comment-form b-pad-10">
                      <div className="ct-container b-pad-20">
                        <span>
                          {comments ? comments.length : "0"} Comment
                          {comments && comments.length === 1 ? "" : "s"}
                        </span>
                        {/* <span>Replying to @dandizzy</span> */}
                      </div>
                      <div className="cb-grid traditional-input-2">
                        <div className="flex-a-center">
                          <div className={"round-img-40"}>
                            {owner && !owner.avatar && (
                              <p className="img-text">
                                {owner.name[0].toUpperCase()}
                              </p>
                            )}
                            {owner && owner.avatar && (
                              <img
                                src={`${cloudinary_image_url}/${owner.avatar}`}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                        <div class="cb-content rc t-pad-5 traditional-input-2">
                          <textarea
                            name="content"
                            className=""
                            id="textarea"
                            value={content}
                            onChange={(e) => {
                              setContent(e.target.value);
                              autoResize(e.target);
                            }}
                            onFocus={() => setShowCommentBtn(true)}
                          ></textarea>
                          {/* <input type="text" name="comment" value={content} id="comment" onChange={(e) => setContent(e.target.value)} onFocus={() => setShowCommentBtn(true)}/> */}
                          {showCommentBtn && (
                            <div class="sc-container">
                              <div class="sc-buttons">
                                <span
                                  class="btn-round-off"
                                  onClick={() => {
                                    setShowCommentBtn(false);
                                    const textarea =
                                      document.getElementById("textarea");
                                    if (textarea.innerHTML.length === 0) {
                                      textarea.style.cssText = "";
                                    }
                                  }}
                                >
                                  Cancel
                                </span>
                                <span
                                  class="btn-round l-mar-10"
                                  onClick={(e) => HandleSubmit(e, blog.id)}
                                >
                                  Comment
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {commentIsLoading && (
                      <div className="comment-loader">
                        <ClipLoader
                          color={"var(--theme-green)"}
                          size={20}
                          cssOverride={spinnerStyle}
                        />
                      </div>
                    )}

                    <CommentList comments={comments} autoResize={autoResize} />
                  </div>
                </div>
                {/* End Of Comment Section */}
              </div>
            </main>
          )}

          {blog && <FooterMain />}
        </div>
      </BlogContext.Provider>
    </CommentContext.Provider>
  );
};

export default BlogsPage;
