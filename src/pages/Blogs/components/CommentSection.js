import useFetch from "../../../hooks/useFetch";
import { useUrl } from "../../../hooks/useUrl";
import { ClipLoader } from "react-spinners";
import { useConstants } from "../../../hooks/useConstants";
import getCookie from "../../../utils/getCookie";
import CommentList from "../../../components/Comments/CommentList";
import { useContext, useState } from "react";
import DisplayImg from "../../../components/images/DisplayImg";
import { RoundButton } from "../../../components/Buttons";
import { BlogContext } from "../../../context/BlogContext";
import { TextParagraph } from "../../../components/Text/Texts";
import { autoResize, getPluralOrSingular } from "../../../Constraints";
import Spinner from "../../Spinner";
import CommentButtons from "./CommentButtons";

const CommentSection = () => {
  const { id, blog, owner } = useContext(BlogContext);
  const { host_url } = useUrl();
  const [content, setContent] = useState();
  const { data: comments, setData: setComments } = useFetch(
    `/blogs/${id}/comments`
  );
  const { spinnerStyle } = useConstants();
  const [showCommentBtn, setShowCommentBtn] = useState(false);
  const [commentIsLoading, setCommentIsLoading] = useState(false);

  // Handle Submission
  const submitComment = async (e, blog_id) => {
    e.preventDefault();
    if (content.length === 0) {
      return;
    }
    const body = { content: content, blog_id: blog_id, user_id: blog.user_id };
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

  return (
    <div className="comment-container t-mar-50">
      <div className="comment-wrapper lr-pad-20 tb-pad-20">
        <div className="comment-form b-pad-10">
          {/* Comment header - contains comment count also */}
          <TextParagraph
            selector="ct-container"
            text={getPluralOrSingular(
              comments && comments.length,
              `${comments && comments.length} Comment`
            )}
          />

          <div className="cb-grid traditional-input-2">
            {/* owners profile image */}
            <div className="cb-img-container">
              <DisplayImg
                selector="round-img-40 img-text"
                img={owner ? owner.avatar : null}
                name={owner ? owner.name : ""}
                alt="profile image"
              />
            </div>
            <div class="cb-content rc t-pad-5 traditional-input-2">
              {/* comment box */}
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

              {/* comment buttons - cancel, comment */}
              {showCommentBtn && (
                <CommentButtons
                  submitComment={submitComment}
                  commentIsLoading={commentIsLoading}
                  setShowCommentBtn={setShowCommentBtn}
                />
              )}
            </div>
          </div>
        </div>

        <CommentList comments={comments} autoResize={autoResize} />
      </div>
    </div>
  );
};

export default CommentSection;
