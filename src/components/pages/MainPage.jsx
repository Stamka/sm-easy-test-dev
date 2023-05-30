import React from 'react'
import { useState } from 'react';
import MyButton from '../UI/button/MyButton'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  const navigate = useNavigate();
  const [userId, setUserId] = useState(0)
 if (window.Telegram.initDataUnsafe !==undefined){
      setUserId(window.Telegram.WebApp.initDataUnsafe.user.id)
 }

  return (
    <div>
      <div>
        
        {(userId !== 0)
        ? <div>{userId}</div>
        : <div>Welcome Username!</div>
        }
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