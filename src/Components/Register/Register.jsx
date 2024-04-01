
import { useFormik } from "formik";
import * as yup from 'yup'
import notesImg from "../../Assests/notes1.png";
import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import Login from './../Login/Login';


export default function Register() {

   const [signUpMsg, setSignUpMsg]= useState()
   const [signUpFieldMsg, setSignUpFieldMsg] = useState()
   let navigate = useNavigate()

   const validationSchema= yup.object({
    name:yup.string().required("Name is required").min(3, "min length must be 3 characters").max(20, "max length must be 20 characters"),
    email: yup.string().required("Email is required").email("please enter valid email"),
    password:yup.string().required("password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must contain special character, number more than 8 characters and less than 18 characters"),
    age:yup.number().required("age is required").min(16, "Enter under age").max(65, "Age must be less than 65"),
    phone:yup.string().required("Phone is required").matches(/^(\+?20|0)?1\d{9}$/, 'Invalid Egyptian phone number')

   })
   let formik = useFormik({
        initialValues:{
          name:'',
          email:'',
          password:'',
          age:'',
          phone:''
        },
        validationSchema,
        onSubmit: signUp
        
      })
      
      function signUp(values){
        axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
            .then((res)=> {
              console.log(res)
              setSignUpMsg(res.data.msg)
              navigate("/Login")
            })
            .catch((err) =>{
                 console.log(err)
                 setSignUpFieldMsg(err.response.data.msg)
            })
      }

      function clearMsg(){
        setSignUpMsg("")
        setSignUpFieldMsg("")
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
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                    />
                      {formik.touched.name ? <p>{formik.errors.name}</p> : null}
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
                    
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter Your Age"
                    />
                    {formik.touched.age ? <p>{formik.errors.age}</p> : null}

                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                    {formik.touched.phone ? <p>{formik.errors.phone}</p> : null}

                    <button 
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2">
                      Sign Up
                    </button>
                    {signUpMsg ? <p> {signUpMsg} </p> : null}
                    {signUpFieldMsg ? <p> {signUpFieldMsg} </p> : null}

                  </form>
                  <p>Already Have Account ?<Link to={'/login'} > Login </Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  
  )
}
