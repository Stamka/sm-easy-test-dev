import React, { useEffect } from 'react'
import MyButton from '../UI/button/MyButton'
import { useNavigate } from 'react-router-dom';
import PostService from '../API/PostService';


const tg = window.Telegram.WebApp;

const MainPage = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    tg.ready();
  })

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