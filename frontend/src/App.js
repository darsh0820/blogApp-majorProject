import Header from "./components/Header";
import { Routes, Route } from "react-router-dom"
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import {authActions} from "./store"

function App() {
  const isLoggedIn = useSelector(state=> state.isLoggedIn)
  const dispatch = useDispatch()
  console.log(isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  },[dispatch])
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? 
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/login" element={<Auth />} />
            <Route path="/auth/signup" element={<Auth/>} />
          </> :
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/add" element={<AddBlog />} />
          </>}
        </Routes>
      </main>
    </>
  );
}

export default App;
