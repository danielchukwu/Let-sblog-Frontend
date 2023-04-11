import { useUrl } from "../../hooks/useUrl";

const DisplayImg = ({
  selector = "blog-img",
  img,
  onClick,
  name = "",
  alt = "blogs",
  addcloudinary = true,
}) => {
  const {cloudinary_image_url} = useUrl();
  return (
    <div className={selector} onClick={onClick}>
      {img && <img className="fit" src={addcloudinary ? `${cloudinary_image_url}/${img}` : img} alt={alt} />}
      {!img && name.length > 0 && (
        <p>{name[0].toUpperCase()}</p>
      )}
    </div>
  );
};

export default DisplayImg;
