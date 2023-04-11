import { useContext, useRef } from "react";
import { CreateBlogContext } from "../../../context/CreateBlogContext";
import { SquareButton } from "../../../components/Buttons";
import displayPopup from "../../../utils/displayPopup";
import { cloudinaryService } from "../../../hooks/cloudinary";
import { autoResize, getCookie } from "../../../Constraints";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const {id, blog, host_url, title, setTitle, category, setCategory, cover, content, setContent, newCover, isLoading, setIsLoading, cloudinary_image_url, setNewCoverToImageReaderFormat} = useContext(CreateBlogContext);
  
  const inputImageRef = useRef();
  const navigate = useNavigate();

  // Handle Submission
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");

    let originalImage = null;
    if (blog) {
      originalImage = blog.img;
    }

    let imageId = await cloudinaryService(originalImage !== cover ? cover : null);
    console.log(`imageId: ${imageId}`);
    console.log(`originalImage: ${originalImage}`);
    console.log(`img: ${cover}`);
    // const imageId = true;

    // Check content
    if (content.length < 500) {
      displayPopup("content_below_500");
      setIsLoading(false);
      return;
    } else if (content.length > 5000) {
      displayPopup("content_over_5000");
      setIsLoading(false);
      return;
    }

    // Create a new Blog
    function createBlog() {
      const body = {
        title: title,
        category: category,
        cover: imageId,
        content: content,
      };
      fetch(`${host_url}/blogs`, {
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
          console.log(data);
          setIsLoading(false);
          displayPopup("Blog Was Successfully Updated! ✅");

          setTimeout(() => {
            navigate(`/blogs/${data.id}`);
          }, 2000);
        })
        .catch((e) => {
          console.log(e.message);
          setIsLoading(false);
        });
      setIsLoading(false);
    }

    // Update an existing Blog
    function updateBlog() {
      // Ensure image is not null if user doesn't update it
      imageId = imageId ? imageId : blog.img;

      const keys = ["title", "category", "img", "content"];
      const currentFields = {
        title: title,
        category: category,
        img: imageId,
        content: content,
      };
      const body = {};

      // Add only changed fields to body
      keys.map((key) => {
        if (blog[key] !== currentFields[key]) {
          body[key] = currentFields[key];
        }
      });
      console.log("Updated Fields: ");
      console.log(body);

      // Update user
      fetch(`${host_url}/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": getCookie("usrin"),
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          displayPopup("Blog Was Successfully Updated! ✅");
          setTimeout(() => {
            navigate(`/blogs/${data.id}`);
          }, 2000);
        });
    }

    if (blog) {
      updateBlog();
    } else if (imageId) {
      createBlog();
    }
  };
  
  return (
    <form onSubmit={(e) => HandleSubmit(e)}>
      <div className="rl-wrapper">
        <div className="rl-container-2 max-w-1000">
            
            <div className="create-blog-container lr-pad-30 tb-pad-30 traditional-input">

              {/* TITLE */}
              <div className="cb-title rl-fields">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              {/* Category */}
              <div className='cb-category rl-fields t-pad-35'>
                  <label htmlFor="category">Category</label>
                  <input type="text" name='category' value={category} id='category' onChange={(e) => setCategory(e.target.value)} required />
              </div>

              {/* File Picker */}
              <div className="t-pad-50">
                  {blog && <input ref={inputImageRef} type='file' onChange={(e) => setNewCoverToImageReaderFormat(e.target.files)} />}
                  {!blog && <input ref={inputImageRef} type='file' onChange={(e) => setNewCoverToImageReaderFormat(e.target.files)} required />}
              </div>
              
              {/* File(Image) Display */}
              <div className="cb-thumbnail display-image t-mar-50">
                  {!newCover && <img src={cover ? `${cloudinary_image_url}/${cover}` : ''} alt='user' onClick={() => inputImageRef.current.click()} />}
                  {newCover && <img src={newCover} alt='user' onClick={() => inputImageRef.current.click()} />}
              </div>

              {/* Blog Content & Submit Button */}
              <div className="cb-content rl-fields t-mar-50">
                  <div className="cb-content-flex">
                    <label htmlFor="content">Content</label>
                    <span  style={content.length > 5000 ? {color: "red"} : {color: "var(--theme-text-grey)"}}>{content.length}/5000</span>
                  </div>
                  <textarea name="content" className="" id="textarea" value={content} onChange={(e) => {setContent(e.target.value); autoResize(e.target);}} required></textarea>
                  {/* <textarea name="content" className="" id="textarea" value={content} onChange={(e) => {setContent(e.target.value)}} required></textarea> */}
                  <div className="flex-right">                    
                    {!isLoading && <SquareButton onClick={(e) => {setIsLoading(true); HandleSubmit(e)}} content={blog ? 'Save' : 'Create'}/>}
                    {isLoading && <SquareButton isLoading={true} />}
                  </div>

              </div>

            </div>
            
        </div>
      </div>
  </form>
  )
}

export default BlogForm