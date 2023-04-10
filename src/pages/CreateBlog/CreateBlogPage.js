import { useLayoutEffect, useEffect, useState, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { useCloudinary } from "../../hooks/useCloudinary";
import { useUrl } from "../../hooks/useUrl";
import getCookie from "../../utils/getCookie";
import displayPopup from "../../utils/displayPopup";
import { useNavigate, useParams } from "react-router-dom";
import { useConstants } from "../../hooks/useConstants";
import CropperPopup from "../../components/CropperPopup";
import HeaderMain from "../../components/HeaderMain";
import BlogForm from "./components/BlogForm";
import { CreateBlogContext } from "../../context/CreateBlogContext";

export const CreateBlogPage = () => {
  const { id } = useParams();
  const { data: owner } = useFetch(`/users/me`);
  const { data: blog } = useFetch(id ? `/blogs/${id}` : null);
  const { cloudinary_image_url, host_url } = useUrl();
  const [isLoading, setIsLoading] = useState(false);

  // Inputs
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [cover, setCover] = useState();
  const [content, setContent] = useState("");

  // Cropper Related States
  const [newCover, setNewCover] = useState();
  const [selectedCover, setSelectedCover] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [isCropperBtnLoading, setIsCropperBtnLoading] = useState(false);

  // Add data of blog to be updated
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setCategory(blog.category);
      setCover(blog.img);
      setContent(blog.content);
    }
  }, [blog]);

  // Then avatar state to croppedImage file
  // For the faithful time of submission
  useEffect(() => {
    if (croppedImage) {
      const croppedImageFile = new File([croppedImage], "croppedImage");
      setIsCropperBtnLoading(false);
      setCover(croppedImage);
      setNewCoverToImageReaderFormat({ 0: croppedImage }, true);
    }
  }, [croppedImage]);

  // Handle Image Upload to Cropper Component
  // To crop image before upload
  function setNewCoverToImageReaderFormat(data, updateAvatar) {
    const reader = new FileReader();
    const result = reader.addEventListener("load", () => {
      // To be sent to CropperPopup.js component for cropping
      setSelectedCover(reader.result);
      // To be shown in edit-profile avatar spot after being cropped
      if (updateAvatar === true) {
        setNewCover(reader.result);
      }
    });
    reader.readAsDataURL(data[0]);
    return result;
  }

  return (
    <CreateBlogContext.Provider value={{id, blog, host_url, title, setTitle, category, setCategory, cover, content, setContent, newCover, isLoading, setIsLoading, cloudinary_image_url, setNewCoverToImageReaderFormat}}>
    <div className="create-blog">
      <HeaderMain owner={owner ? owner : null} />

      {selectedCover && (
        <CropperPopup
          yourImg={selectedCover}
          setImage={setSelectedCover}
          setCroppedImage={setCroppedImage}
          isLoading={isCropperBtnLoading}
          setIsLoading={setIsCropperBtnLoading}
          cropType={"cover"}
        />
      )}

      {/* POP UP */}
      <div className="pop-up-container"></div>

      <main className=" t-pad-120 b-pad-50">
        <BlogForm />
      </main>
    </div>
    </CreateBlogContext.Provider>
  );
};
