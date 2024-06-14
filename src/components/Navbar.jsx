import React from 'react'
import "./componentStyles/navbar.css"
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header>
        <h1 className='logo' onClick={() => navigate("/")}>QUIZZIA</h1>
    </header>
  )
}
