import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override: CSSProperties = {
   display: "block",
   margin: "auto",
   border: "3px solid"
}

const Spinner = () => {
   const [loading, setLoading] = useState(true);

   return (
      <div className='spinner-container'>
         <ClipLoader loading={loading} color={"var(--theme-green)"} size={30} cssOverride={{
   display: "block",
   margin: "auto",
   border: "3px solid"
}}/>
      </div>
   )
}

export default Spinner;