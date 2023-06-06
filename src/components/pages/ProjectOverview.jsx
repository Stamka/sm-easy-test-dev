import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import AddOrChangeTask from '../AddOrChangeTask';
import EditProject from '../EditProject';
import MyButton from '../UI/button/MyButton';
import '../UI/css/ProjectOverview.css'
import PostService from '../API/PostService';
import TasksList from '../TasksList';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
const tg = window.Telegram.WebApp;



const ProjectOverview = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [projectTasks, setProjectTasks] = useState([]);
  const [userId, setUserId] = useState();
  const [currentProject, setCurrentProject] = useState({});

  useEffect(()=>{
    fetchTasks();
    fetchProject();
    tg.ready();
    setUserId(tg.initDataUnsafe?.user?.id || 231279140)
  }, [])

  console.log("CurProj", location, currentProject)
  const tasksByStatus = projectTasks.reduce((acc, task) => {
    if (acc[task.status]) {
      acc[task.status].push(task);
    } else {
      acc[task.status] = [task];
    }
    return acc;
  }, {});

  const fetchTasks = async () => {
    try {
      const response = await PostService.getProjectTasks(params.id);
      setProjectTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchProject = async () => {
    try {
        console.log('ProjectOverview: fetchProject ',params.id);
        const response = await PostService.getProject(params.id);
        setCurrentProject(response.data);
    } catch (error) {
        console.log(error);
    }
  };

  const actionTaskChanged = async () => {
    console.log('taskadded')
    await fetchProject();
    await fetchTasks();
  }



  console.log("Project", params.id)
  return (
    <div>
      {currentProject
      ? (<div className="project-container">
            <div className="project-info">
                <div className="project-name">{currentProject.name}</div>
                <div className="project-description">{currentProject.description}</div>
                <div className="project-details">
                {projectTasks.length > 0 ? (
                    <div>Всего задач: {projectTasks.length}</div>
                ) : (
                    <div>В этом проекте еще нет задач</div>
                )}
                </div>
            </div>
      <div className='button-container'>
        <EditProject project={currentProject} userId={userId}/>
        <AddOrChangeTask projectId={params.id} onAddedOrChanged={actionTaskChanged} action={"add"}/>
      </div>
      {
        projectTasks && <TasksList rawTasks={projectTasks} actionTaskChanged={actionTaskChanged}/> 
      }
    </div>)
      : <div>Loading</div>
      }
    <BackButton onClick={ () => navigate(`/projects`) }></BackButton>
    </div>
  );
};

export default ProjectOverview