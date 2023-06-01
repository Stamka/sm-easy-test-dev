import React, { useEffect, useState } from 'react'
import PostService from '../API/PostService';
import TasksList from '../TasksList';

const tg = window.Telegram.WebApp;

const Tasks = () => {

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
                ? TasksList(tasks)
                : <h1>Loading...</h1>
            }
        </div>
    )
}

export default Tasks