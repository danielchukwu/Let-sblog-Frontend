const DisplaySvg = ({svg, selector}) => {
  return (
    <div className={`${selector ? selector : ''}`}>
      {svg}
    </div>
  );
};

export default DisplaySvg;
