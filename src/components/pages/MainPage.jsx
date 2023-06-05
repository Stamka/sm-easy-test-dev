import React, { useEffect } from 'react'
import MyButton from '../UI/button/MyButton'
import { useNavigate } from 'react-router-dom';
import PostService from '../API/PostService';
import classes from './MainPage.module.css'


const tg = window.Telegram.WebApp;

const MainPage = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    tg.ready();
    tg.expand();
  })

  return (
    <div className={classes.MainPage}>
        <h1>Hello! {tg.initDataUnsafe?.user?.username}</h1>
        <div className={classes.ButtonContainer}>
        <MyButton onClick={ () => navigate(`/mytasks`)} >Мои задачи</MyButton>
        <MyButton onClick={ () => navigate(`/projects`)} >Мои проекты</MyButton>
        <MyButton onClick={ () => navigate(`/profile`)} >Мой профиль</MyButton>
        <MyButton onClick={ () => navigate(`/about`)} >Про нас</MyButton>
        </div>
    </div>
  )
}

export default MainPage