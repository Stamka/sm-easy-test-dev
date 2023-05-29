import React from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import MyButton from '../UI/button/MyButton';
import '../UI/css/ProjectOverview.css'



const ProjectOverview = ({}) => {
  const location = useLocation();
  const params = useParams()
  const projectTasks = location.state?.projectTasks;
  const currentProject = location.state?.project;
  console.log("CurProj", location, currentProject)
  const tasksByStatus = projectTasks.reduce((acc, task) => {
    if (acc[task.status]) {
      acc[task.status].push(task);
    } else {
      acc[task.status] = [task];
    }
    return acc;
  }, {});

const parseTaskStatusForButton = (status) => {
  if (status === 'HOLD'){
    return (
      <div className="button-container">
      <MyButton className="change-status-button">Начать поиск исполнителя</MyButton>
      </div>)}
  else if (status === 'FINDING_EXECUTOR'){
    return (
      <div className="button-container">
        <MyButton className="change-status-button">Прекратить поиск исполнителя</MyButton>
     </div>)
  }
  else if (status === 'TO_DO'){
    return (
      <div className="button-container">
        <MyButton className="change-status-button">Взять задание в работу</MyButton>
     </div>)
  }
  else if (status === 'IN_PROGRESS'){
    return (
      <div className="button-container">  
        <MyButton className="change-status-button">To review</MyButton>
        <MyButton className="change-status-button">Обратно в беклог</MyButton>
     </div>)
  }
  else if (status === 'REVIEW'){
    return (
      <div className="button-container">
        <MyButton className="change-status-button">Обратно в работу</MyButton>
        <MyButton className="change-status-button">Сделано</MyButton>
     </div>)
  }
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
      <MyButton>Edit Project</MyButton>
      <MyButton>Create New Task</MyButton>
    </div>)
      : <div>Loading</div>
      }
      
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <div className={`status-block ${status}`} key={status}>
          <h2 className="status-heading">{status}</h2>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <div className="task-block">
                <div className='task-name'>Name: {task.name}</div>
                <div>Status: {task.status}</div>
                <div>Description: {task.description}</div>
                {parseTaskStatusForButton(task.status)}
                    
          
                
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectOverview