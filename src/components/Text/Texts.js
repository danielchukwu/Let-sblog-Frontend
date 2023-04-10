export const TextParagraph = ({selector="main-text", text}) => (
  <div className={selector}>
    <p>{text}</p>
  </div>
);
export const TextH1 = ({selector="main-text", text}) => (
  <div className={selector}>
    <h1>{text}</h1>
  </div>
);
export const TextH2 = ({selector="main-text", text}) => (
  <div className={selector}>
    <h2>{text}</h2>
  </div>
);
export const TextH3 = ({selector="main-text", text}) => (
  <div className={selector}>
    <h3>{text}</h3>
  </div>
);