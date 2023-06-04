import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import CreateProject from '../CreateProject';
import { useFetching } from '../hooks/useFetching';
import ProjectItem from '../ProjectItem';
import MyButton from '../UI/button/MyButton';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router';
const tg = window.Telegram.WebApp;

const Projects = () => {

  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [userProjects, setUserProjects] = useState();
  const [modal, setModal] = useState(false);

  const fetchProjects = async (userId) => {
    try {
      const userProjects = await PostService.getUserProjects(userId);
      console.log('fetching projects', userProjects.data);
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
    <div>
      {console.log(userProjects)}
      My projects
      <div>
        <MyButton onClick ={() => {setModal(true)}}>Create New Project</MyButton>
        <CreateProject modal={modal} setModal={setModal}/>
      </div>
      { userProjects
        ? <div>{userProjects.map((project, index) => 
          <ProjectItem key={index} project={project} onDeleteProject={deleteProjectAndUpdate}/>
          )}
          <hr/>
          </div>
        : <h1>Loading</h1> 
      }
        <BackButton onClick={ () => navigate(`/`) }></BackButton>
    </div>
  );
};

export default Projects;
