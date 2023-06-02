import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router';
import AddTask from '../AddTask';
import EditProject from '../EditProject';
import MyButton from '../UI/button/MyButton';
import '../UI/css/ProjectOverview.css'
import PostService from '../API/PostService';
import TasksList from '../TasksList';
const tg = window.Telegram.WebApp;



const ProjectOverview = () => {
  const location = useLocation();
  const params = useParams()
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

const deleteTask = async (taskId) => {
  console.log(taskId);
  const response = await PostService.deleteTask(taskId);
  setProjectTasks(projectTasks.filter((_, i)=> _.id !== taskId))

}

  console.log("Project", params.id)
  return (
    <div>
      {currentProject
      ? (<div className="project-item">
        <div className="project-info">
        <div className="project-name">Project Name: {currentProject.name}</div>
        <div className="project-description">Project Description: {currentProject.description}</div>
        <div className="project-details">
          {projectTasks.length > 0 ? (
            <div>Total Tasks: {projectTasks.length}</div>
          ) : (
            <div>There are no tasks in your project</div>
          )}
        </div>
      </div>
      <EditProject project={currentProject}/>
      <AddTask projectId={params.id} onAdded={actionTaskChanged}/>
      {
        projectTasks && <TasksList rawTasks={projectTasks} actionTaskChanged={actionTaskChanged}/> 
      }
    </div>)
      : <div>Loading</div>
      }
    </div>
  );
};

export default ProjectOverview