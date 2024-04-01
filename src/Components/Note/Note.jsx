import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, useFormik } from "formik";
import * as yup from 'yup'
import axios from 'axios'
import { Fade } from "react-awesome-reveal";


export default function Note({note,getUserNotes}) {
    
        

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
      onSubmit: updateNote,
 
      validationSchema
 
   })

   function updateNote(values){
      console.log(values)
      console.log(note._id)
      console.log(`3b8ny__${localStorage.getItem("userToken")}`)

      axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}` , values ,{
       headers:{
         token: `3b8ny__${localStorage.getItem("userToken")}`
       }
     })
     .then((res)=>{
       console.log(res)
       getUserNotes()
       
     })
     .catch((err)=>{console.log(err)})
     .finally(() =>{
       handleClose()
     })
 }

     function DeleteNote(){
        axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,{
         headers:{
            token:`3b8ny__${localStorage.getItem("userToken")}`
         }
        })
        .then((res)=>{
         console.log(res)
         getUserNotes()
      })
        .catch((error)=>{console.log(error)})
       }
       

   
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
            update Note
          </Button>
        </Modal.Footer>
      </Modal>

       <div className="col-md-6 p-3">
       <Fade direction="down" >
       <div >
           <Card >
              <Card.Body>
                 <Card.Title>{note.title}</Card.Title>
              <Card.Text>
                 {note.content}
              </Card.Text>
            <Card.Link >
               <i className="fa-solid fa-pen-to-square fa-xl px-3 cursor-pointer" variant="primary" onClick={handleShow} ></i>
            </Card.Link>
           <Card.Link >
               <i className="fa-solid fa-trash fa-xl cursor-pointer " onClick={DeleteNote} ></i>
           </Card.Link>
         </Card.Body >
        </Card> 
        </div>
       </Fade>
       
       </div>

    </>
  );
}

