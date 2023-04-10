import HeaderMain from '../../components/HeaderMain';
import FooterMain from '../../components/FooterMain';
import BlogList from '../../components/Blogs/BlogList';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import getCookie from '../../utils/getCookie';
import { ClipLoader } from 'react-spinners';
import { useConstants } from '../../hooks/useConstants';


const HomePage = () => {
  const {data: owner, setData: setOwner} = useFetch('/users/me');
  const {data: blogs} = useFetch();
  const navigate = useNavigate();
  const {spinnerStyle} = useConstants();
  
  return (
      <div>
        {/* Header */}
        {getCookie('usrin') && <HeaderMain owner={owner ? owner : owner} showRight={owner ? true : false } setOwner={setOwner} />}
        {!getCookie('usrin') && <HeaderMain owner={null}/>}

        {/* Loader */}
        {!blogs && 
        <div className='spinner-container t-pad-30'>
          <ClipLoader color={"var(--theme-green)"} size={30} cssOverride={spinnerStyle}/>
        </div>}
        
        {/* Blogs */}
        <main className="home-body">
          <div className="content-wrapper">
            <div className="grid-wrapper">

              {blogs && <BlogList blogs={blogs} />}

            </div>
          </div>
        </main>

        {owner && <FooterMain />}

      </div>
  )
}

export default HomePage