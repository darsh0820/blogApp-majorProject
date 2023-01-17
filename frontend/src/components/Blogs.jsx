import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
const Blogs = () =>{
    // const isLoggedIn = useSelector(state=> state.isLoggedIn)
    const [blogs,setBlogs] = useState()
    const sendRequest = async() => {
        const resp = await axios.get('http://localhost:5050/api/blog')
        .catch(err=>console.log(err))
        const data = await resp.data
        return data
    }
    useEffect(()=>{
        sendRequest().then(data=>setBlogs(data.blogs))
    },[])
    console.log(blogs)
    return(
        <>
            <br/>
            <br/>
            <br/>
            {blogs && blogs.map((blog,index)=>
                <Blog 
                    // isUser={true}
                    id={blog._id}
                    isUser={localStorage.getItem('userId')===blog.user._id} 
                    userName={blog.user.name} 
                    title={blog.title} 
                    description={blog.description} 
                    imageURL={blog.image} 
                />
                ).reverse()}
            
        </>
    )
}
export default Blogs