export const TextP = ({selector="main-text", text, showTitle=false}) => (
  <div className={selector}>
    <p title={showTitle ? text : null}>{text}</p>
  </div>
);
export const TextH1 = ({selector="main-text", text, showTitle=false}) => (
  <div className={selector}>
    <h1 title={showTitle ? text : null}>{text}</h1>
  </div>
);
export const TextH2 = ({selector="main-text", text, showTitle=false}) => (
  <div className={selector}>
    <h2 title={showTitle ? text : null}>{text}</h2>
  </div>
);
export const TextH3 = ({selector="main-text", text, showTitle=false}) => (
  <div className={selector}>
    <h3 title={showTitle ? text : null}>{text}</h3>
  </div>
);
export const TextEm = ({selector="main-text", text, showTitle=false}) => (
  <div className={selector}>
    <em title={showTitle ? text : null}>{text}</em>
  </div>
);