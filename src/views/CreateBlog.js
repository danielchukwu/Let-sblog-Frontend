import { useLayoutEffect, useEffect, useState, useRef } from 'react'
import HeaderLogin from '../components/HeaderLogin'
import gsap from 'gsap';
import useFetch from '../hooks/useFetch';
import { useCloudinary } from '../hooks/useCloudinary';
import axios from 'axios';
import { useUrl } from '../hooks/useUrl';
import getCookie from '../utils/getCookie';
import displayPopup from '../utils/displayPopup';
import { useNavigate } from 'react-router-dom';

export const CreateBlog = () => {
   const {data} = useFetch('');
   const {host_url} = useUrl();
   const navigate = useNavigate();

   // Inputs
   const [title, setTitle] = useState();
   const [category, setCategory] = useState();
   const [cover, setCover] = useState();
   const [content, setContent] = useState('');

   // Animate page
   useLayoutEffect(() => {
      window.scrollTo(0, 0);
      const abortCont = new AbortController()
      gsap.from('main', {background: 'none', paddingTop: 250, duration: 0.5, ease: 'circ', opacity: 0.3})
      return () => abortCont.abort()
   }, [])

   
   // Handle Submission
   const HandleSubmit = async (e) => {
      e.preventDefault();
      
      const imageId = await useCloudinary(cover);
      // const imageId = true;
      
      // Check content
      if (content.length < 500) {
         displayPopup('content_below_500')
         return
      } else if (content.length > 5000){
         displayPopup('content_over_5000')
         console.log()
         return
      }
      
      if (imageId){
         const body = {'id': data.owner.id, 'title': title, 'category': category, 'cover': imageId, 'content': content}
         console.log(host_url)
         console.log(body)
         axios.post(`${host_url}/blogs`, body)
         .then(res => {
            console.log(res)
            
            displayPopup('successful_blog_creation')
            setTimeout(() => {
               navigate(`/blogs/${res.data}`)
            }, 2000)
         })
      }
   }

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


   // Preview Image
   useEffect(() => {
      // UPLOAD IMAGE: Preview
      const imageInput = document.querySelector('input[type="file"]');
      var uploaded_image = '';
      
      console.log(imageInput);
      imageInput.addEventListener("change", function() {
         const reader = new FileReader();
         reader.addEventListener('load', () => {
            uploaded_image = reader.result;
            document.querySelector('.display-image img').src = uploaded_image;
         })
         reader.readAsDataURL(this.files[0]);
      }, [data])
   }, [])


   return (
      <div className='create-blog'>

         <HeaderLogin />

         {/* POP UP */}
         <div class="pop-up-container"></div>

         <main className=" t-pad-120 b-pad-50">
            
            <form onSubmit={(e) => HandleSubmit(e)}>
               <div className="rl-wrapper">
                  <div className="rl-container-2 max-w-1000">
                     
                     <div className="create-blog-container lr-pad-30 tb-pad-30 traditional-input">

                        {/* TITLE */}
                        <div className="cb-title rl-fields">
                           <label htmlFor="title">Title</label>
                           <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} required />
                        </div>

                        {/* THUMBNAIL */}
                        <div className='cb-category rl-fields t-pad-35'>
                           <label htmlFor="category">Category</label>
                           <input type="text" name='category' id='category' onChange={(e) => setCategory(e.target.value)} required />
                        </div>

                        <div className="t-pad-50">
                           <input type="file" onChange={(e) => setCover(e.target.files[0])} required/>
                        </div>
                        <div className="cb-thumbnail display-image t-mar-50">
                           <img src='' alt=''/>
                        </div>

                        {/* CONTENT */}
                        <div className="cb-content rl-fields t-mar-50">
                           <div class="cb-content-flex">
                              <label for="content">Content</label>
                              <span  style={content.length > 5000 ? {color: "red"} : {color: "var(--theme-text-grey)"}}>{content.length}/5000</span>
                           </div>
                           <textarea name="content" className="" id="textarea" onChange={(e) => setContent(e.target.value)} required></textarea>
                           <div className="flex-right">
                           <button className="btn-square t-mar-10" >Create</button>
                           {/* {content.length <= 5000 && <button className="btn-square t-mar-10" >Create</button>} */}
                              {/* {content.length > 5000 && <button className="btn-square btn-square-disabled t-mar-10" disabled>Create</button>} */}
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
