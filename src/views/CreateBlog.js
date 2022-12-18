import { useLayoutEffect, useEffect, useState, useRef } from 'react'
import gsap from 'gsap';
import useFetch from '../hooks/useFetch';
import { useCloudinary } from '../hooks/useCloudinary';
import axios from 'axios';
import { useUrl } from '../hooks/useUrl';
import getCookie from '../utils/getCookie';
import displayPopup from '../utils/displayPopup';
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderSub } from '../components/HeaderSub';
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants'
import CropperPopup from '../components/CropperPopup';


export const CreateBlog = () => {
   const {id} = useParams();
   const {data: owner} = useFetch(`/users/me`);
   const {data: blog} = useFetch(id ? `/blogs/${id}` : null);
   const {cloudinary_image_url, host_url} = useUrl();
   const navigate = useNavigate();
   const {spinnerStyle} = useConstants();
   const [isLoading, setIsLoading] = useState(false);


   // Inputs
   const [title, setTitle] = useState();
   const [category, setCategory] = useState();
   const [cover, setCover] = useState();
   const [content, setContent] = useState('');
   
   
   // Cropper Related States
   const [newCover, setNewCover] = useState();
   const [selectedCover, setSelectedCover] = useState();
   const inputImageRef = useRef();
   const [croppedImage, setCroppedImage] = useState();
   const [isCropperBtnLoading, setIsCropperBtnLoading] = useState(false);

   // Add data of blog to be updated
   useEffect(() => {
      if (blog){
         setTitle(blog.title)
         setCategory(blog.category)
         setCover(blog.img)
         setContent(blog.content)
      }
   }, [blog])

   // Animate page
   useLayoutEffect(() => {
      if (window){
         window.scroll(0, 0);
      }
      const abortCont = new AbortController();
      gsap.from('main', {background: 'none', paddingTop: 250, duration: 0.5, ease: 'circ', opacity: 0.3});
      return () => abortCont.abort();
   }, [])

   
   // Handle Submission
   const HandleSubmit = async (e) => {
      e.preventDefault();
      console.log('Submitting...');
      
      let originalImage = null;
      if (blog) {originalImage = blog.img}
      
      let imageId = await useCloudinary(originalImage !== cover ? cover : null);
      console.log(`imageId: ${imageId}`);
      console.log(`originalImage: ${originalImage}`);
      console.log(`img: ${cover}`);
      // const imageId = true;
      
      // Check content
      if (content.length < 500) {
         displayPopup('content_below_500');
         setIsLoading(false);
         return
      } else if (content.length > 5000){
         displayPopup('content_over_5000')
         setIsLoading(false);
         return
      }

      // Create a new Blog
      function createBlog () {
         const body = {'title': title, 'category': category, 'cover': imageId, 'content': content}
         fetch(`${host_url}/blogs`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Access-Token': getCookie('usrin')
            },
            body: JSON.stringify(body)
         })
         .then(res => {
            return res.json()
         })
         .then(data => {
            console.log(data)
            setIsLoading(false);
            displayPopup('Blog Was Successfully Updated! ✅')
            
            setTimeout(() => {
               navigate(`/blogs/${data.id}`)
            }, 2000)
         }).catch(e => {
            console.log(e.message);
            setIsLoading(false);
         })
         setIsLoading(false);
      } 
      
      // Update an existing Blog
      function updateBlog () {
         // Ensure image is not null if user doesn't update it
         imageId = imageId ? imageId : blog.img;
         
         const keys = ['title', 'category', 'img', 'content'];
         const currentFields = {'title': title, 'category': category, 'img': imageId, 'content': content};
         const body = {};
         
         // Add only changed fields to body
         keys.map(key => {
            if (blog[key] !== currentFields[key]){
               body[key] = currentFields[key];
            }
         });
         console.log("Updated Fields: ")
         console.log(body)
         
         // Update user
         fetch(`${host_url}/blogs/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'X-Access-Token': getCookie('usrin')
            },
            body: JSON.stringify(body)
         })
         .then(res => res.json())
         .then(data => {
            console.log(data)
            setIsLoading(false);
            displayPopup('Blog Was Successfully Updated! ✅');
            setTimeout(() => {
               navigate(`/blogs/${data.id}`);
            }, 2000)
         })
      }

      if (blog){
         updateBlog()
      } else if (imageId) {
         createBlog();
      }
   }

   // Textarea Auto Resize
   useEffect(() => {
      const textarea = document.getElementById("textarea")

      textarea.style.cssText = `height: ${textarea.scrollHeight}px; overflow-y: hidden;`
      
      textarea.addEventListener("input", function() {
         console.log('just changed!')
         this.style.height = 'auto';
         this.style.height = `${this.scrollHeight}px`;
         window.scrollTo = window.scrollY + 500
      })
   }, [content])


   // // Preview Image
   // useEffect(() => {
   //    // UPLOAD IMAGE: Preview
   //    const imageInput = document.querySelector('input[type="file"]');
   //    var uploaded_image = '';
      
   //    imageInput.addEventListener("change", function() {
   //       const reader = new FileReader();
   //       reader.addEventListener('load', () => {
   //          uploaded_image = reader.result;
   //          document.querySelector('.display-image img').src = uploaded_image;
   //       })
   //       reader.readAsDataURL(this.files[0]);
   //    })
   // })


   // Then avatar state to croppedImage file
   // For the faithful time of submission
   useEffect(() => {
      if (croppedImage) {
         const croppedImageFile = new File([croppedImage], 'croppedImage');
         setIsCropperBtnLoading(false);
         setCover(croppedImage);
         setNewCoverToImageReaderFormat({0: croppedImage}, true);
      }
   }, [croppedImage])



   // Handle Image Upload to Cropper Component
   // To crop image before upload
   function setNewCoverToImageReaderFormat (data, updateAvatar) {
      const reader = new FileReader();
      const result = reader.addEventListener('load', () => {
         // To be sent to CropperPopup.js component for cropping
         setSelectedCover(reader.result);
         // To be shown in edit-profile avatar spot after being cropped
         if (updateAvatar === true) {
            setNewCover(reader.result);
         }
      })
      reader.readAsDataURL(data[0]);
      return result;
   }


   return (
      <div className='create-blog'>

         <HeaderSub owner={owner ? owner : null} />

         {selectedCover && <CropperPopup yourImg={selectedCover} setImage={setSelectedCover} setCroppedImage={setCroppedImage} isLoading={isCropperBtnLoading} setIsLoading={setIsCropperBtnLoading} cropType={"cover"}/>}


         {/* POP UP */}
         <div className="pop-up-container"></div>

         <main className=" t-pad-120 b-pad-50">
            
            <form onSubmit={(e) => HandleSubmit(e)}>
               <div className="rl-wrapper">
                  <div className="rl-container-2 max-w-1000">
                     
                     <div className="create-blog-container lr-pad-30 tb-pad-30 traditional-input">

                        {/* TITLE */}
                        <div className="cb-title rl-fields">
                           <label htmlFor="title">Title</label>
                           <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        {/* THUMBNAIL */}
                        <div className='cb-category rl-fields t-pad-35'>
                           <label htmlFor="category">Category</label>
                           <input type="text" name='category' value={category} id='category' onChange={(e) => setCategory(e.target.value)} required />
                        </div>

                        <div className="t-pad-50">
                           {/* {blog && <input type="file" onChange={(e) => setImg(e.target.files[0])}/>}
                           { !blog && <input type="file" onChange={(e) => setImg(e.target.files[0])} required/>} */}
                           {blog && <input ref={inputImageRef} type='file' onChange={(e) => setNewCoverToImageReaderFormat(e.target.files)} />}
                           {!blog && <input ref={inputImageRef} type='file' onChange={(e) => setNewCoverToImageReaderFormat(e.target.files)} required />}
                        </div>
                        <div className="cb-thumbnail display-image t-mar-50">
                           {/* <img src={img ? `${cloudinary_image_url}/${img}` : ''} alt=''/> */}
                           {!newCover && <img src={cover ? `${cloudinary_image_url}/${cover}` : ''} alt='user' onClick={() => inputImageRef.current.click()} />}
                           {newCover && <img src={newCover} alt='user' onClick={() => inputImageRef.current.click()} />}
                        </div>

                        {/* CONTENT */}
                        <div className="cb-content rl-fields t-mar-50">
                           <div className="cb-content-flex">
                              <label htmlFor="content">Content</label>
                              <span  style={content.length > 5000 ? {color: "red"} : {color: "var(--theme-text-grey)"}}>{content.length}/5000</span>
                           </div>
                           <textarea name="content" className="" id="textarea" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                           <div className="flex-right">
                              {!isLoading && <button className="btn-square t-mar-10" onClick={(e) => {setIsLoading(true); HandleSubmit(e)}}>{blog ? 'Save' : 'Create'}</button>}
                              {isLoading && 
                              <button className="btn-square-loading t-mar-10" disabled>
                                    <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>
                              </button>}
                           </div>

                        </div>

                     </div>
                     
                  </div>
               </div>
            </form>

         </main>
         
      </div>
   )
}
