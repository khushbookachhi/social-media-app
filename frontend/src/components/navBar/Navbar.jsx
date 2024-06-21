import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import Logout from '../logout/Logout';
import { Link, NavLink, useLocation } from 'react-router-dom';


const Navbar = () => {
    const {authUser}=useAuthContext();
    const location=useLocation();
    const [path,setpath]=useState("/");

    useEffect(()=>{
        setpath(location.pathname)
         },[setpath])
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand fw-bolder fs-3" href="/">SocialMedia</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link fs-5 fw-semibold" aria-current="page" activeClassName={(path=="/")?"active":""} to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link  fs-5 fw-semibold" aria-current="page" activeClassName={(path=="/myposts")?"active":""} to="/myposts">myPosts</NavLink>
          </li>
         
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle fs-5 fw-semibold" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {authUser.username}
            </Link>
            <ul className="dropdown-menu">
              <Logout/>
             
            </ul>
          </li>
         
        </ul>
       
      </div>
    </div>
  </nav>
  
  </>
  )
}

export default Navbar