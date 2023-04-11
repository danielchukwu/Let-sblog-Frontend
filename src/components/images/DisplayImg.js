import { useUrl } from "../../hooks/useUrl";

const DisplayImg = ({
  selector = "blog-img",
  img,
  name = "",
  alt = "blogs",
}) => {
  const {cloudinary_image_url} = useUrl();
  return (
    <div className={selector}>
      {img && <img className="fit" src={`${cloudinary_image_url}/${img}`} alt={alt} />}
      {!img && name.length > 0 && (
        <p>{name[0].toUpperCase()}</p>
      )}
    </div>
  );
};

export default DisplayImg;
