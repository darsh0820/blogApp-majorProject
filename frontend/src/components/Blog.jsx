import './Blog.css'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
const Blog = ({title,description,imageURL,userName,isUser,id}) =>{
//    console.log(title,isUser)
{/* <i className="fa-regular fa-user"></i> */}
    const navigate = useNavigate()
    const handleUpdate = (e) => {
        navigate(`/myblogs/${id}`)
    }
    const deleteRequest = async() => {
        const resp = await axios.delete(`http://localhost:5050/api/blog/${id}`)
            .catch(err=>console.log(err))
        const data = await resp.data
        return data
    }
    const handleDelete = () => {
        deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"))
    }
    return(
        <>
            <div className="card">
                <div className='user-handle row mx-2'>
                    <div className='user col-sm-1 col-1'> {userName.charAt(0)} </div>
                    <div className='username col-sm-8 col-8'><h5> {userName} </h5></div>
                    {isUser && 
                        <div className='edit-btns row col-sm-3 col-3'>
                            <button onClick={handleDelete} className='delete btn col-sm-6 col-6'>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                            <button onClick={handleUpdate} className='update btn col-sm-6 col-6'>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                    }
                </div>
                <img src={imageURL} className="card-img-top" alt="..."></img>
                <hr/>
                <br/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </>
    )
}
export default Blog