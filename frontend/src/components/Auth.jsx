import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Auth.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'
import pic1 from './carousel/3_8.png';
import pic2 from './carousel/3_9.png';
import pic3 from './carousel/3_10.png';


const Auth = () =>{
    const isLoggedIn = useSelector(state=> state.isLoggedIn)
    // console.log(isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        name:"",email:"",password:""
    })
    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    const sendRequest = async (type='login') => {
        const resp = await axios.post(`http://localhost:5050/api/user/${type}`,{
            name:inputs.name,
            email:inputs.email,
            password:inputs.password
        }).catch(err=>console.log(err))

        const data = await resp.data;
        console.log(data)
        return data;
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(inputs)
        if(window.location.pathname==='/auth/signup'){
            sendRequest("signup")
            .then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate('/blogs'))
            .then(data=>console.log(data))
        }
        else{
            sendRequest()
            .then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate('/blogs'))
            .then(data=>console.log(data))
        }
    }

    return(
        <>  
            <br/>
            <br/>
            <br/>
            {(window.location.pathname==='/auth' && !isLoggedIn) ?
                <div className='carousel-div'>
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active bg-dark"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1" className="bg-dark"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2" className="bg-dark"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={pic1} alt="Login" className="d-block w-100"></img>
                        </div>
                        <div className="carousel-item">
                            <img src={pic2} alt="All Blogs" className="d-block w-100"></img>
                        </div>
                        <div className="carousel-item">
                            <img src={pic3} alt="Add Blog" className="d-block w-100"></img>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark"></span>
                    </button>
                </div>
      
            </div>:
            <div className='login-div'>
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        {(window.location.pathname==='/auth/login' && !isLoggedIn) ? 
                            <div>
                                <h2>Login</h2>
                                <input onChange={handleChange} type="email" placeholder='Email' className='form-control'value={inputs.email} name='email'></input>
                                <input onChange={handleChange} type="password" placeholder='Password' className='form-control' value={inputs.password} name='password'></input>
                                <button className='btn-primary btn mx-auto d-block' type='submit'>Submit</button>
                                <p>Create new account. <Link to={'/auth/signup'}>Sign Up</Link></p>
                            </div> : 
                            (window.location.pathname==='/auth/signup' && !isLoggedIn) ?
                                <div>
                                    <h2>Signup</h2>
                                    <input onChange={handleChange} type="text" placeholder='Name' className='form-control' value={inputs.name} name='name'></input>
                                    <input onChange={handleChange} type="email" placeholder='Email' className='form-control' value={inputs.email} name='email'></input>
                                    <input onChange={handleChange} type="password" placeholder='Password' className='form-control' value={inputs.password} name='password'></input>
                                    <button className='btn btn-primary mx-auto d-block' type='submit'>Submit</button>
                                    <p>Already have an account? <Link to={'/auth/login'}>Log In</Link></p>
                                </div> :
                                <div>
                                  <h2>Page not Found</h2>  
                                </div>
                        }
                    </div>
                </form>
            </div>
            }
        </>
    )
}
export default Auth