import React, { useEffect,useState } from 'react'
import TaskForm from './TaskForm';
import MyModal from './UI/MyModal/MyModal'
import MyButton from './UI/button/MyButton';
import PostService from './API/PostService';


const AddTask = ({projectId, onAdded}) => {
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
  return (
    <div>
        <MyButton onClick={() => setModal(true)}>Create New Task!</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <TaskForm action={"add"} positions={positions} projectId={projectId} onAdded={onAdded}/>
        </MyModal>
    </div>
  )
}

export default AddTask