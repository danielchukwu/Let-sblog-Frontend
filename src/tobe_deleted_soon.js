{/* Liked blog item */}
<div className='ns-item'>
   <div className='ns-img'>
      <div className={"round-img-35"}>
         {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
         {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
      </div>
   </div>
   <div className='ns-text'>
      <p><b className='bold'>{owner.username}</b> liked your post.</p>
   </div>
   <div className='ns-blog'>
      {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
   </div>
</div>
{/* Liked comment item */}
<div className='ns-item'>
<div className='ns-img'>
   <div className={"round-img-35"}>
      {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
      {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
   </div>
</div>
<div className='ns-text'>
   <p><b className='bold'>{owner.username}</b> liked your comment on a post.</p>
</div>
</div>
{/* Commented on your blog item */}
<div className='ns-item'>
   <div className='ns-img'>
      <div className={"round-img-35"}>
         {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
         {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
      </div>
   </div>
   <div className='ns-text'>
      <p><b className='bold'>{owner.username}</b> commented on your blog.</p>
   </div>
   <div className='ns-blog'>
      {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
   </div>
</div>
{/* Responded to your comment item */}
<div className='ns-item'>
   <div className='ns-img'>
      <div className={"round-img-35"}>
         {!owner.avatar && <p className="img-text">{owner.username[0].toUpperCase()}</p>}
         {owner.avatar  && <img src={`${cloudinary_image_url}/${owner.avatar}`} alt="" />}
      </div>
   </div>
   <div className='ns-text'>
      <p><b className='bold'>{owner.username}</b> responded to your comment.</p>
   </div>
   <div className='ns-blog'>
   </div>
</div>