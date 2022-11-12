import HeaderMain from '../components/HeaderMain'
import FooterMain from '../components/FooterMain'
import BlogList from '../components/BlogList'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {data, tokenIsValid} = useFetch('')
  const navigate = useNavigate()
  
  return (
    <div>
      {data && <HeaderMain owner={data.owner}/>}
      
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