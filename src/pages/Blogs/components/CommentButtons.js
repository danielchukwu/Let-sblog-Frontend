import React, { useContext } from "react";
import { RoundButton } from "../../../components/Buttons";
import { BlogContext } from "../../../context/BlogContext";

const CommentButtons = ({submitComment, setShowCommentBtn, commentIsLoading}) => {
  const {blog} = useContext(BlogContext);
  
  return (
    <div class="sc-container">
      <div class="sc-buttons">
        <RoundButton
          isOutlined={true}
          content="Cancel"
          onClick={() => {
            setShowCommentBtn(false);
            const textarea = document.getElementById("textarea");
            if (textarea.innerHTML.length === 0) {
              textarea.style.cssText = "";
            }
          }}
        />
        {!commentIsLoading && (
          <RoundButton
            onClick={(e) => submitComment(e, blog.id)}
            isLoading={commentIsLoading}
            content="Comment"
          />
        )}
        {commentIsLoading && <RoundButton isLoading={commentIsLoading} />}
      </div>
    </div>
  );
};

export default CommentButtons;
