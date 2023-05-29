import React from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import MyButton from '../UI/button/MyButton';
import '../UI/css/ProjectOverview.css'



const ProjectOverview = ({project}) => {
  const location = useLocation();
  const params = useParams()
  const projectTasks = location.state?.projectTasks;
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

  return (
    <div>
      <h1>Project: {project}</h1>
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