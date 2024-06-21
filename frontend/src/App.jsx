import { useState } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/signin/SignIn'
import Posts from './pages/posts/Posts'
import { useAuthContext } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navBar/Navbar.jsx';
import Myposts from './pages/myposts/Myposts.jsx';

function App() {
  const {authUser}=useAuthContext();

  return (
    <>
    <Navbar/>
     <Routes>
				<Route path='/' element={authUser ?<Posts />:<Navigate to="/login"/>} />
				<Route path='/login' element={authUser?<Navigate to="/"/>:<SignIn />} />
				<Route path='/signup' element={authUser?<Navigate to="/"/>:<SignUp />} />
        <Route path='/myPosts' element={authUser?<Myposts/>:<Navigate to="/login"/>} />
			</Routes>
      <Toaster/>
    </>
  )
}

export default App
