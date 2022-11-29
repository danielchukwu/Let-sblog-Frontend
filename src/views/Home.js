import HeaderMain from '../components/HeaderMain'
import FooterMain from '../components/FooterMain'
import BlogList from '../components/BlogList'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import getCookie from '../utils/getCookie'
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../hooks/useConstants'


const Home = () => {
  const {data: owner, setData: setOwner} = useFetch('/users/me');
  const {data: blogs} = useFetch('');
  const navigate = useNavigate();
  const {spinnerStyle} = useConstants();
  
  return (
    <div>
      {getCookie('usrin') && <HeaderMain owner={owner ? owner : owner} showRight={owner ? true : false } setOwner={setOwner} />}
      {!getCookie('usrin') && <HeaderMain owner={owner ? owner : owner}/>}

      {!blogs && 
      <div className='spinner-container t-pad-30'>
        <ClipLoader color={"var(--theme-green)"} size={30} cssOverride={spinnerStyle}/>
      </div>}
      
      
      <main className="t-pad-220">
        <div className="content-wrapper max-w-1000">
          <div className="grid-wrapper">

            {blogs && <BlogList blogs={blogs} />}

          </div>
        </div>
      </main>

      {owner && <FooterMain />}

    </div>

  )
}

export default Home