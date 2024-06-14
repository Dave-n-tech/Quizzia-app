import React from 'react'
import "./componentStyles/navbar.css"
import logo from "../assets/QUIZZIA.png"
import { useNavigate } from 'react-router-dom'
import PlayButton from './PlayButton'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header>
        <h1 className='logo' onClick={() => navigate("/")}>QUIZZIA</h1>
        {/* <img src={logo} alt="" className='logo' onClick={() => navigate("/")}/> */}
    </header>
  )
}
