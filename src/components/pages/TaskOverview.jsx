import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import PostService from '../API/PostService'
import MyButton from '../UI/button/MyButton'
import MyModal from '../UI/MyModal/MyModal'
import AddOrChangeTask from '../AddOrChangeTask'
import TaskComments from '../TaskComments'


const tg = window.Telegram.WebApp;


const TaskOverview = () => {
  const [task, setTask] = useState({})
  const [tempTask, setTempTask] = useState({})
  const [userId, setUserId] = useState(0)
  const [updateModal, setUpdateModal] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const fetchTask = async () => {
    const response = await PostService.getTask(params.taskid)
    if (response.status === 200){
        setTask(response.data)
        console.log("Task successfully fetched", response.data)
    }else{
        console.log("Error in fetching task")
    }
  }

  useEffect( 
    () => {
        tg.ready()
        setUserId(tg.initDataUnsafe?.user?.id || 231279140)
        fetchTask()
    }, []
  )


  const updateTask = async () => {
    
    const response = await PostService.updateTask(params.taskid, task)
    

  }

  const deleteTask = async (taskId) => {
    console.log(taskId);
    const response = await PostService.deleteTask(taskId);

    if (response.status === 200){
        navigate(`/projects/${params.id}`)
    }
    // setProjectTasks(projectTasks.filter((_, i)=> _.id !== taskId))
  
  }

  const onAddedOrChanged = async () => {

    console.log("Changed")
  }


  return (
    <div>TaskOverview

        {task && (
            <div>
                <div>
                    Имя:
                    {task.name}
                </div>
                <div>
                    Описание:
                    {task.description}
                </div>
                <div>
                    Статус:
                    {task.status}
                </div>

                { (userId === task.creator_id) && (
                    <div>
                        <AddOrChangeTask projectId={params.id} onAddedOrChanged={onAddedOrChanged} action={"update"} task={task}/> 
                        <MyButton onClick={() => {deleteTask(task.id)}}>удалить таску</MyButton>
                    </div>
                    
                    )
                }
                <div>
                  <div>Commenets </div>
                  <TaskComments taskId={task.id}/>
                </div>
            </div>)
        }

    </div>

  )
}

export default TaskOverview