import React, { useEffect, useState } from 'react';
import PostService from './API/PostService';
import MyButton from './UI/button/MyButton';
import { useNavigate, useParams } from 'react-router';
import './UI/css/ProjectOverview.css';
const tg = window.Telegram.WebApp;

const TasksList = ({ rawTasks, actionTaskChanged }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [userId, setUserId] = useState();

  useEffect(() => {
    tg.ready();
    setUserId(tg.initDataUnsafe?.user?.id || 231279140);
  }, []);

  const tasksByStatus = rawTasks.reduce((acc, task) => {
    if (acc[task.status]) {
      acc[task.status].push(task);
    } else {
      acc[task.status] = [task];
    }
    return acc;
  }, {});

  console.log('tasksStatus', tasksByStatus);

  return (
    <div className='ContainerTasks'>
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <div className={`status-block ${status}`} key={status}>
          <h2 className="status-heading">{status}</h2>
          <ul className="task-list">
            {tasks.map((task) => (
              <li className='ContainerTask' key={task.id}>
                {console.log('task in return', task)}
                <TaskCard
                  task={task}
                  userId={userId}
                  actionTaskChanged={actionTaskChanged}
                  navigate={navigate}
                  projectId={params.id}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TasksList;


const TaskCard = ({ task, userId, actionTaskChanged, navigate, projectId }) => {
    const [executorName, setExecutorName] = useState('');
  
    useEffect(() => {
      const getExecutorNameById = async (executorId) => {
        const response = await PostService.getUser(executorId);
        console.log("Executor: ", response);
        if (response?.data?.telegram_login !== undefined) {
          setExecutorName(response.data.telegram_login);
        } else {
          setExecutorName('');
        }
      };
  
      if (task?.executor_id) {
        getExecutorNameById(task.executor_id);
      }
    }, [task?.executor_id]);
  
    const changeTaskStatus = async (taskId, taskStatus) => {
      console.log(taskStatus);
      const response = await PostService.changeTaskStatus(userId, taskId, taskStatus);
      console.log("ChangeTask: ", response);
      actionTaskChanged();
    };
  
    const handleOpenTask = () => {
      navigate(`/projects/${projectId}/tasks/${task.id}`);
    };
  
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
          {statusLabels[status].map((label, index) => (
            <MyButton key={index} id='open-button' onClick={() => changeTaskStatus(taskId, Object.values(label)[0])}>
              {Object.keys(label)}
            </MyButton>
          ))}
        </div>
      );
    };
    
    const telegramLink = `https://t.me/${executorName}`;
    
    return (
      <div>
        <div>
          <div className='TaskName'>{task.name}</div>
          <div className='TaskDescription'>{task.description}</div>
        </div>
        <div>{task.price}</div>
        <MyButton onClick={handleOpenTask}>Открыть таску</MyButton>
        { executorName ?
            <div>
                Исполнитель: {executorName}{' '}
                <a href={telegramLink}>Чат с исполнителем</a>
            </div>
            : <div></div>
        }
        {parseTaskStatusForButton(task.status, task.id)}
      </div>
    );
  };
