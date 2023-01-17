import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"
import './Blog.css'

const BlogDetail = () =>{
    const navigate = useNavigate()
    const [blog,setBlog] = useState()
    const id = useParams().id
    const isLoggedIn = useSelector(state=> state.isLoggedIn)
    const [inputs, setInputs] = useState()
    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    const fetchDetails = async() =>{
        const resp  = await axios.get(`http://localhost:5050/api/blog/${id}`)
            .catch(err=>console.log(err))
        const data = await resp.data
        return data
    }
    useEffect(()=>{
        fetchDetails()
        .then(data=>{
            setInputs({title:data.blog.title,description:data.blog.description})
            setBlog(data.blog)
        })
    },[id])
    console.log(blog)
    const sendRequest = async() => {
        const resp = await axios.put(`http://localhost:5050/api/blog/update/${id}`,
            {   title:inputs.title,
                description:inputs.description    
            }).catch(err=>console.log(err))
        const data = await resp.data
        return data
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(inputs)
        sendRequest()
        .then((data)=>console.log(data))
        .then(()=>navigate("/myBlogs"))
    }
    return(
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                {isLoggedIn && inputs &&
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h3>Post Your Blog</h3>
                                <br/>
                                <label>Title</label>
                                <input name='title' onChange={handleChange} value={inputs.title} className="form-control" type="text"></input>
                                
                                <label>Description</label>
                                <textarea name='description' onChange={handleChange} value={inputs.description} className="form-control"></textarea>
                                <br/>
                                
                                <button type="submit" className="btn btn-primary">Post</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}
export default BlogDetail