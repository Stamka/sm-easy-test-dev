import React, { useEffect, useState } from 'react'
import PostService from '../API/PostService';
import TasksList from '../TasksList';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router';

const tg = window.Telegram.WebApp;

const Tasks = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState(tg.initDataUnsafe?.user?.id || 231279140);
    const [tasks, setTasks] = useState();

    const fetchTasks = async () => {
      try {
        const response = await PostService.getExecutorTasks(userId);
        console.log('fetching executor tasks', response);
        if (response && response.length > 0) {
          setTasks(response);
        } else {
          // If the response is empty, refetch the tasks after a certain delay
          setTimeout(() => {
            fetchTasks(userId);
          }, 3000); // You can adjust the delay (in milliseconds) as needed
        }
      } catch (error) {
        console.log(error);
      }
    };

      const actionTaskChanged = async () => {
        console.log('taskadded')
        await fetchTasks();
      }

    useEffect(() => {
        tg.ready();
        setUserId(tg.initDataUnsafe?.user?.id || 231279140);
    }, []);

    useEffect(() => {
      fetchTasks();
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