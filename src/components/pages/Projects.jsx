import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import CreateProject from '../CreateProject';
import { useFetching } from '../hooks/useFetching';
import ProjectItem from '../ProjectItem';
import MyButton from '../UI/button/MyButton';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router';
import classes from './Projects.module.css'
const tg = window.Telegram.WebApp;

const Projects = () => {

  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [userProjects, setUserProjects] = useState();
  const [modal, setModal] = useState(false);

  const fetchProjects = async (userId) => {
    try {
      const userProjects = await PostService.getUserProjects(userId);
      console.log('fetching projects', userProjects);
      setUserProjects(userProjects.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProjectAndUpdate = (projectId) => {
    setUserProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
  };

  useEffect(() => {
    tg.ready();
    setUserId(tg.initDataUnsafe?.user?.id || 231279140)
    fetchProjects(userId);
  }, [userId]);

  return (
    <div className={classes.Projects}>
      {console.log(userProjects)}
      <h1>Мои проекты</h1>
      <div className={classes.ContainerCreate}>
        
        <MyButton className={classes.AddButton} onClick ={() => {setModal(true)}}>
            Новый проект
        </MyButton>
        <CreateProject modal={modal} setModal={setModal}/>
      </div>
      { userProjects
        ? <div className={classes.ContainerProjects}>{userProjects.map((project, index) => 
          <ProjectItem key={index} project={project} onDeleteProject={deleteProjectAndUpdate}/>
          )}
          </div>
        : <h1>Loading</h1> 
      }
        <BackButton onClick={ () => navigate(`/`) }></BackButton>
    </div>
  );
};

export default Projects;
