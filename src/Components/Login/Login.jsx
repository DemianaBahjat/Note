import { useFormik } from "formik";
import * as yup from 'yup'
import notesImg from "../../Assests/notes1.png";
import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import Login from './../Login/Login';


export default function Register() {

   const [signInMsg, setSignInMsg]= useState()
   const [signInFieldMsg, setSignInFieldMsg] = useState()
   let navigate = useNavigate()

   const validationSchema= yup.object({

    email: yup.string().required("Email is required").email("please enter valid email"),
    password:yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must contain special character, number more than 8 characters and less than 18 characters"),

   })
   let formik = useFormik({
        initialValues:{

          email:'',
          password:'',
          
        },
        validationSchema,
        onSubmit: signIn
        
      })
      
      function signIn(values){
        axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values)
            .then((res)=> {
              console.log(res)
              setSignInMsg(res.data.msg)
              navigate("/home")
              localStorage.setItem("userToken" , res.data.token )
            })
            .catch((err) =>{
                 console.log(err)
                 setSignInFieldMsg(err.response.data.msg)
            })
      }

      function clearMsg(){
        setSignInMsg("")
        setSignInFieldMsg("")
      }

  return (
    <>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                   
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                   {formik.touched.email ? <p>{formik.errors.email}</p> : null}
                    
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                    {formik.touched.password ? <p>{formik.errors.password}</p> : null}
                    
                    

                    
                    <button 
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2">
                      Sign In
                    </button>
                    {signInMsg ? <p> {signInMsg} </p> : null}
                    {signInFieldMsg ? <p> {signInFieldMsg} </p> : null}

                  </form>
                  <p>Don't Have Account ? <Link to={'/'} > Register </Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  
  )
}
