import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const HeaderLogin = (owner=null) => {
   return (
      <header className="content-wrapper">
         <div className="wrapper-rl max-w-1000"> 
            <div className="left">
               <Link to="/">
                  <div className="logo-text">
                     <h1 title="Home">Let's Bl😉g.</h1>
                  </div>
               </Link>
            </div>
         </div>
         {/* Add Right */}
      </header>
   )
}

export default HeaderLogin