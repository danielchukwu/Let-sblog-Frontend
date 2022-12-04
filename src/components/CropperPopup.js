import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { ClipLoader } from "react-spinners";
import { useConstants } from "../hooks/useConstants";
import getCroppedImg from "../utils/cropImage";

const CropperPopup = ({ yourImg, setImage, setCroppedImage, isLoading, setIsLoading }) => {
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState();
   const {spinnerStyle} = useConstants();
   
   useEffect(() => {
      console.log(yourImg);
   }, [yourImg])

   const showCroppedImage = async () => {
      try {
         // grab cropped Image and save it in croppedImage state
         const {file, url} = await getCroppedImg(yourImg, croppedAreaPixels);
         setCroppedImage(file);
      } catch (e) {
         console.error(e);
      }
   }

   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
      // console.log(croppedAreaPixels);
   }, [])
   
   return (
      <>
         <div className="pc-wrapper">
            
            {/* Dark Background */}
            <div className="pc-bg z-index-1" onClick={() => setImage(null)}></div>

            {/* Crop Image Pop up */}
            <div className="crop-box">
               {/* <div className="f-title">
                  <h3></h3>
               </div> */}
               <div className='eb-title'>
                  <h3 className='fs-20'>Update Profile Picture</h3>
                  <span className='up-cancel' onClick={() => setImage(false)}>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                     </svg>
                  </span>
               </div>
               <div className="cp-container">
                     <Cropper
                        image={yourImg}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                     />
               </div>
               <div className="cp-wrapper">
                  <input type={'range'} min="1" max="4" step={0.01} className="slider" value={zoom} onChange={(e) => {setZoom(e.target.value)}}/>
                  <div className="flex-right">
                     {!isLoading && <button className="btn-square t-mar-20" onClick={(e) => {setIsLoading(true); showCroppedImage()}}>Save</button>}
                     {isLoading && 
                     <button className="btn-square-loading t-mar-20" disabled>
                           <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>
                     </button>}
                  </div>
               </div>
               {/* <div className="">
                  {croppedImage && <img src={croppedImage}/>}
               </div> */}
            </div>
         </div>
      </>
   )
}

export default CropperPopup;