import React from 'react'
import useLogout from '../../hooks/useLogout.js';
import { Link } from 'react-router-dom';

const Logout = () => {
    const {loading,logout}=useLogout();
  return (
    <li>{!loading?<Link className="dropdown-item fs-5 fw-semibold" onClick={logout}>Logout</Link>
:<span className='spinner-border spinner-border-sm text-light' role="status">
<span class="visually-hidden">Loading...</span>
</span> }</li>
  )
}

export default Logout