import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRout({children}) {

   const navigate =useNavigate()

   useEffect(() =>{

       if(!localStorage.getItem('userToken')){
        navigate('/login')
       }

   },[])

   return children
    
}