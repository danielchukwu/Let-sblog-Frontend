const DisplayImg = ({selector="blog-img", img, alt="blogs"}) => {
  return (
    <div className={selector}>
      <img src={img} alt={alt} />
    </div>
  );
};

export default DisplayImg;
