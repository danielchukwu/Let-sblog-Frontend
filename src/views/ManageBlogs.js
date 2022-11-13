import { useEffect } from 'react'
import { BlogListMB } from '../components/BlogListMB';
import { HeaderSub } from '../components/HeaderSub'
import useFetch from '../hooks/useFetch'

export const ManageBlogs = () => {
   const {data} = useFetch();

   useEffect(() => {
      console.log(data);
   }, [data])
   
   
   return (
      <div className='manage-blogs-react'>
         {data && <HeaderSub owner={data.owner} />}

         <main class="t-pad-120">
            <div class="content-wrapper max-w-1000">

               {/* <!-- Manage Blogs Banner --> */}
               <div class="mb-container">
                  <h3>Manage Your Blogs</h3>
                  <p>Total blogs: 5</p>
               </div>
               
               <div class="grid-wrapper t-pad-50">

                  {data && <BlogListMB blogs={data.blogs} />}

               </div>
            </div>

         </main>

      </div>
   )
}
