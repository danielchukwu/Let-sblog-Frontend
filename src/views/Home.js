import HeaderMain from '../components/HeaderMain'
import FooterMain from '../components/FooterMain'
import BlogList from '../components/BlogList'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import getCookie from '../utils/getCookie'
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants'


const Home = () => {
  const {data} = useFetch('');
  const navigate = useNavigate();
  const {spinnerStyle} = useConstants();
  
  return (
    <div>
      {getCookie('usrin') && <HeaderMain owner={data ? data.owner : data} showRight={data ? true : false }/>}
      {!getCookie('usrin') && <HeaderMain owner={data ? data.owner : data}/>}

      {!data && 
      <div className='spinner-container t-pad-30'>
        <ClipLoader color={"var(--theme-green)"} size={30} cssOverride={spinnerStyle}/>
      </div>}
      
      
      <main className="t-pad-220">
        <div className="content-wrapper max-w-1000">
          <div className="grid-wrapper">

            {data && <BlogList blogs={data.blogs} />}

          </div>
        </div>
      </main>

      {data && <FooterMain />}

    </div>

  )
}

export default Home