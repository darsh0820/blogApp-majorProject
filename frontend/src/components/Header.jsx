import { Link } from 'react-router-dom'
import './Header.css'
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../store'
// import { useState } from 'react'
const Header = () =>{
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state=> state.isLoggedIn)
    return(
        <>
            <nav className="navbar navbar-expand-sm bg-light navbar-light fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand blogPost" to=''>BlogPost</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        {isLoggedIn && <ul className='links navbar-nav'>
                            <li className={window.location.pathname === "/blogs" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/blogs">All Blogs</Link>
                            </li>
                            <li className={window.location.pathname === "/myBlogs" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/myBlogs">My Blogs</Link>
                            </li>
                            <li className={window.location.pathname === "/blogs/add" ? "nav-item active" : "nav-item"}>
                                <Link className="nav-link" to="/blogs/add">Add Blog</Link>
                            </li>
                        </ul>}
                        <ul className="navbar-nav auth">
                            {!isLoggedIn && <div>
                                <li className="nav-item login">
                                    <Link className="nav-link" to="/auth/login">Log In</Link>
                                </li>
                                <li className="nav-item signup">
                                    <Link className="nav-link" to="/auth/signup">Sign Up</Link>
                                </li>
                            </div>}
                            {isLoggedIn && <div>
                                <li className="nav-item logout">
                                <Link className="nav-link" to="/auth" onClick={()=>dispatch(authActions.logout())}>Log Out</Link>
                            </li>
                            </div> } 
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header