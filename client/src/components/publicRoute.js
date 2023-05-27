import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../resources/general.css";

function PublicRoute({children}) {
    const navigation = useNavigate();
    useEffect(() => {
       if(localStorage.getItem('token')){
         navigation('/')
       }
    }, [])

  return (
    <div>
        {children}
    </div>
  )
}

export default PublicRoute