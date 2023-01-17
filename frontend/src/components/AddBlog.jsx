import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
const AddBlog = () =>{
    const navigate = useNavigate()
    // const isLoggedIn = useSelector(state=> state.isLoggedIn)
    const [inputs, setInputs] = useState({
        title:"",description:"",imageURL:""
    })
    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    const sendRequest = async () => {
        const resp = await axios.post("http://localhost:5050/api/blog/add",
        {
            title: inputs.title,
            description: inputs.description,
            image: inputs.imageURL,
            user: localStorage.getItem("userId")
        }).catch(err=>console.log(err))
        const data = await resp.data 
        return data
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputs)
        sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"))
    }
    return(
        <>
            <br/>
            <br/>
            <br/>
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
                            <label>Image URL</label>
                            <input name='imageURL' onChange={handleChange} value={inputs.imageURL} type='text' className="form-control"></input>
                            
                            <button type="submit" className="btn btn-primary">Post</button>
                        </div>
                    </form>
                </div>
        </>
    )
}
export default AddBlog