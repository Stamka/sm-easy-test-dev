import React from 'react'
import MyButton from '../UI/button/MyButton'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  const navigate = useNavigate();


  return (
    <div>
      <div>
        Welcome Username!
      </div>
        <div>
        <MyButton onClick={ () => navigate(`/mytasks`)} >My Tasks</MyButton>
        <MyButton onClick={ () => navigate(`/myprojects`)} >My projects</MyButton>
        <MyButton onClick={ () => navigate(`/profile`)} >My Profile</MyButton>
        <MyButton onClick={ () => navigate(`/about`)} >About us</MyButton>
        </div>
    </div>
  )
}

export default MainPage