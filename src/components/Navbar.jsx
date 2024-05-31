import React from 'react'
import "./componentStyles/navbar.css"
import logo from "../assets/QUIZZIA.png"
import PlayButton from './PlayButton'

export default function Navbar() {
  return (
    <header>
        <img src={logo} alt="" />
        {/* <PlayButton /> */}
    </header>
  )
}
