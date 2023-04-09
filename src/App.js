import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogsPage from './pages/Blogs/BlogsPage';
import { CreateBlogPage } from './pages/CreateBlog/CreateBlogPage';
import EditProfilePage from './pages/EditProfile/EditProfilePage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import { ManageBlogsPage } from './pages/ManageBlogs/ManageBlogsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import Register from './pages/Register/RegisterPage';
import Spinner from './pages/Spinner';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/edit-profile' element={<EditProfilePage />} />
          <Route path='/spinner' element={<Spinner />} />
          <Route path='/manage-blogs' element={<ManageBlogsPage />} />
          <Route path='/create-blog' element={<CreateBlogPage />} />
          <Route path='/edit-blog/:id' element={<CreateBlogPage />} />
          <Route path='/blogs/:id' element={<BlogsPage />} />
          <Route path='/users/:id' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

