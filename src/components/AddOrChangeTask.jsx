import React, { useEffect,useState } from 'react'
import TaskForm from './TaskForm';
import MyModal from './UI/MyModal/MyModal'
import MyButton from './UI/button/MyButton';
import PostService from './API/PostService';
import './UI/css/ProjectOverview.css'


const AddOrChangeTask = ({projectId, onAddedOrChanged, action,task = {}}) => {
  const [modal, setModal] = useState(false);

  const [positions, setPositions] = useState([]);

  const getPositions = async ()=>{
    const response = await PostService.getParsedPositions()
    setPositions(response);
    return response
  }

  useEffect(()=>{
    getPositions()
  }, [])

  console.log("Task", task)
  return (
    <div>


        {(action === "add")
          ? <MyButton id="open-button" onClick={() => setModal(true)}>Добавить задачу</MyButton>
          : <MyButton id="open-button" onClick={() => setModal(true)}>Изменить задачу</MyButton>
        }
        
        <MyModal visible={modal} setVisible={setModal}>
            <TaskForm action={action} positions={positions} projectId={projectId} onAddedOrChanged={onAddedOrChanged} initTask={task}/>
        </MyModal>
    </div>
  )
}

export default AddOrChangeTask