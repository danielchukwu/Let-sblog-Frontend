import { ClipLoader } from "react-spinners"
import { useConstants } from "../hooks/useConstants";


export const SquareButton = ({selector, onClick, content="Submit", isLoading=false}) => {
  const {spinnerStyle} = useConstants();
  const display = (!isLoading ? content : <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>);

  return (
    <div className={selector}>
      <button className={(!isLoading ? "btn-square" : "btn-square-loading")} onClick={onClick}>{display}</button>
    </div>
  )
}

export const RoundButton = ({selector, onClick, content="Submit", isLoading=false, isOutlined=false}) => {
  const {spinnerStyle} = useConstants();
  const display = (!isLoading ? content : <ClipLoader color={"var(--theme-white)"} size={13} cssOverride={spinnerStyle}/>);

  return (
    <div className={selector}>
      <button className={isOutlined ? "btn-round-off" : (!isLoading ? "btn-round" : "btn-round-loading")} onClick={onClick}>
        {display}
      </button>
    </div>
  )
}