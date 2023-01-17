import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"

const UserBlogs = () =>{
    // const isLoggedIn = useSelector(state=> state.isLoggedIn)
    const [user,setUser] = useState()
    const id = localStorage.getItem('userId')
    const sendRequest = async()=>{
        const resp = await axios.get(`http://localhost:5050/api/blog/user/${id}`)
        .catch(err=>console.log(err))
        const data = await resp.data
        return data
    }
    useEffect(()=>{
        sendRequest().then((data)=>setUser(data.user))
    },[])
    console.log(user)
    return(
        <>
            <br/>
            <br/>
            <br/>
            {user && user.blogs && user.blogs.map((blog,index)=>
                <Blog 
                    key={index}  
                    id={blog._id}
                    isUser={localStorage.getItem('userId')===user._id}
                    userName={user.name} 
                    title={blog.title} 
                    description={blog.description} 
                    imageURL={blog.image} />).reverse()}
        </>
    )
}
export default UserBlogs