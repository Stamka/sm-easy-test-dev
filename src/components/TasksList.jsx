import React, { useEffect, useState } from 'react';
import PostService from './API/PostService';
import MyButton from './UI/button/MyButton';
import './UI/css/ProjectOverview.css'
const tg = window.Telegram.WebApp;



const TasksList = ( {rawTasks, actionTaskChanged} ) => {


    const [userId, setUserId] = useState();

    useEffect(()=>{
        tg.ready();
        setUserId(tg.initDataUnsafe?.user?.id || 231279140)
    }, [userId])

    const tasksByStatus = rawTasks.reduce((acc, task) => {
        if (acc[task.status]) {
          acc[task.status].push(task);
        } else {
          acc[task.status] = [task];
        }
        return acc;
    }, {});

    console.log('tasksStatus',tasksByStatus);

    return (
        <div className='ContainerTasks'>
            {Object.entries(tasksByStatus).map(([status, tasks]) => ( 
                <div className={`status-block ${status}`} key={status}>
                    <h2 className="status-heading">{status}</h2>
                    <ul className="task-list">
                        {
                            tasks.map((task) => (
                                <li className='ContainerTask' key={task.id}>
                                    {console.log('task in return', task)}
                                    {TaskCard(task, userId,actionTaskChanged)}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))}
        </div>
    );
};

 

const TaskCard = (task, userId, actionTaskChanged) => {

    const changeTaskStatus = async (taskId, taskStatus) => {
        console.log(taskStatus);
        const response = await PostService.changeTaskStatus(userId, taskId, taskStatus);
        console.log("ChangeTask: ", response)
        actionTaskChanged();
     }
     
    const statusLabels = {
        'HOLD': [{'Начать поиск исполнителя':'FINDING_EXECUTOR'}],
        'FINDING_EXECUTOR': [{'Прекратить поиск исполнителя':'HOLD'}],
        'TO_DO': [{'Перевести в работу':"IN_PROGRESS"}],
        'IN_PROGRESS': [{'Перевести на обзор':'REVIEW'}, {'Отложить':'TO_DO'}],
        'REVIEW': [{'Перевести в работу':'IN_PROGRESS'}, {'Сделано':"DONE"}],
        'DONE': [{'Перевести в работу':'REVIEW'}]
    };

    const parseTaskStatusForButton = (status, taskId) => {
        return (
            <div className='button-container'>
                {statusLabels[status].map((label) => (
                    <MyButton id='open-button' onClick={()=> changeTaskStatus(taskId, Object.values(label)[0])}>{Object.keys(label)}</MyButton>
                ))}
            </div>
        )
    }
    return (
        <div>
            <div>
                <div className='TaskName'>{task.name}</div>
                <div className='TaskDescription'>{task.description}</div>
            </div>
            <div>{task.price}</div>
            {parseTaskStatusForButton(task.status, task.id)}
        </div>
    );
};

export default TasksList;