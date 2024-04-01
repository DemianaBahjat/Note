import React, { useEffect } from "react";
import { useState } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from 'axios'
import { useRecoilState } from "recoil";
import { noteState } from "../../Atoms/noteAtoms";
import Note from "../Note/Note";


export default function Home() {

  const [noteLength, setNoteLength ] = useRecoilState(noteState)
  const [allNotes, setAllNotes] = useState([])
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   const validationSchema = yup.object({

      title:yup.string().required(' title is required'),
      content: yup.string().required('content is required')

   })
  

  let formik= useFormik({

     initialValues:{
      title:'', 
      content: '' ,
     },
     onSubmit:addNote,

     validationSchema

  })
   function addNote(values){
       axios.post('https://note-sigma-black.vercel.app/api/v1/notes' , values ,{
        headers:{
          token: `3b8ny__${localStorage.getItem("userToken")}`
        }
      })
      .then((res)=>{
        getUserNotes()
        console.log(res)
      })
      .catch((err)=>{console.log(err)})
      .finally(() =>{
        handleClose()
      })
  }

  function getUserNotes(){
           axios.get('https://note-sigma-black.vercel.app/api/v1/notes', {
            headers:{
              token : `3b8ny__${localStorage.getItem("userToken")}`
            }
           })
           .then((res) =>{
            console.log(res)
            setNoteLength(res.data.notes.length)
            setAllNotes(res.data.notes)
          })
           .catch((error) =>{console.log(error)})
  }
  
  useEffect(() =>{
        getUserNotes()
  }, [])

  return (
    <>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <form action="">

              <input 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text" 
              name="title" 
              id="title" 
              className="form-control my-3" 
              placeholder="Please enter title" />

              <textarea 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="content" 
              id="content" 
              className="form-control my-3"
               placeholder="please enter content"></textarea>

            </form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2">
              <button className="btn btn-info text-white" variant="primary" onClick={handleShow}>
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row ">

            {allNotes.map((note) =>{
                return <Note key={note._id} note={note}  getUserNotes={getUserNotes} />
              })} 

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
