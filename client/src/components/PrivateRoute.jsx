import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element: Component, ...rest }) => {
   // console.log("in private route");
    const {currentUser} = useSelector(state=>state.user)
    return currentUser ? Component : <Navigate to='/sign-in'  />
    
  
}

export default PrivateRoute