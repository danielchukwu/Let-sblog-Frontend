import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blogs from './views/Blogs';
import { CreateBlog } from './views/CreateBlog';
import EditProfile from './views/EditProfile';
import Home from './views/Home';
import Login from './views/Login';
import { ManageBlogs } from './views/ManageBlogs';
import Profile from './views/Profile';
import Register from './views/Register';
import Spinner from './views/Spinner';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/spinner' element={<Spinner />} />
          <Route path='/manage-blogs' element={<ManageBlogs />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/edit-blog/:id' element={<CreateBlog />} />
          <Route path='/blogs/:id' element={<Blogs />} />
          <Route path='/users/:id' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

