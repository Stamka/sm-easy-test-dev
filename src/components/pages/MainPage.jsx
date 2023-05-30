import React, { useEffect } from 'react'
import { useState } from 'react';
import MyButton from '../UI/button/MyButton'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const tg = window.Telegram.WebApp;

const MainPage = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    tg.ready();
  })

  const onClose = () => {
    tg.close();
  }

  return (
    <div>
      Hello! {tg.initDataUnsafe?.user?.username}
      <div>
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