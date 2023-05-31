import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import CreateProject from '../CreateProject';
import { useFetching } from '../hooks/useFetching';
import ProjectItem from '../ProjectItem';
import MyButton from '../UI/button/MyButton';
const tg = window.Telegram.WebApp;

const Projects = () => {
  const [userId, setUserId] = useState(0);
  const [userProjects, setUserProjects] = useState();
  const [modal, setModal] = useState(false);

  const fetchProjects = async (userId) => {
    try {
      const userProjects = await PostService.getUserProjects(userId);
      console.log(userProjects.data);
      setUserProjects(userProjects.data);
    } catch (error) {
      console.log(error);
    }
  };


  const parseProjects = (userProjects) => {
    if (userProjects !== undefined) {
      //console.log("kekv", userProjects);
      const projects = userProjects.map(project => project.name);
      //console.log("asdasd", projects);
      return projects.join(' ');
    }
  };

  useEffect(() => {
    tg.ready();
    setUserId(tg.initDataUnsafe?.user?.id || 231279140)
    //console.log(userId);
    fetchProjects(userId);
    //console.log("useeff", userProjects);
    parseProjects(userProjects);
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
          <ProjectItem key={index} project={project}/>
          )}
          <hr/>
          </div>
        : <h1>Loading</h1> 
      }
    </div>
  );
};

export default Projects;
