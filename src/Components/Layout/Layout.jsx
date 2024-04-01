import React from 'react'
import {Outlet} from 'react-router-dom'
import {  useRecoilState } from 'recoil'
import { noteState } from '../../Atoms/noteAtoms'

export default function Layout() {
        
       const [noteLength, setNoteLength ] = useRecoilState(noteState)

  return (
    <>

    <div style={{backgroundColor:"#61dafb" , fontWeight:"bold" , fontSize:"20px"}} className=' main-color text-white  p-2 text-center fixed-top '>  Notes App : {noteLength}</div>
    <div>
        <Outlet/>
    </div>

    </>
  )
}
