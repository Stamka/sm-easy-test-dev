import React, { useEffect, useState } from 'react'
import PostService from '../API/PostService';
import TasksList from '../TasksList';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router';

const tg = window.Telegram.WebApp;

const Tasks = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState(0);
    const [tasks, setTasks] = useState();

    const fetchTasks = async (userId) => {
        try {
          const tasks = await PostService.getExecutorTasks(userId);
          console.log('fetching executor tasks', tasks.data);
          setTasks(tasks.data);
        } catch (error) {
          console.log(error);
        }
      };

      const actionTaskChanged = async () => {
        console.log('taskadded')
        await fetchTasks(userId);
      }

    useEffect(() => {
        tg.ready();
        setUserId(tg.initDataUnsafe?.user?.id || 231279140);
        fetchTasks(userId);
    }, [userId]);

    return (
        <div>
            <div>Tasks</div>
            {
                tasks
                ? <TasksList rawTasks={tasks}  actionTaskChanged={actionTaskChanged}/>
                : <h1>Loading...</h1>
            }
            <BackButton onClick={ () => navigate(`/`) }></BackButton>
        </div>
    )
}

export default Tasks