import React from 'react'
import TaskCreatingForm from './TaskCreatingForm';
import MyModal from './UI/MyModal/MyModal'
import MyButton from './UI/button/MyButton';
import { useState } from 'react';

const AddTask = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
        <MyButton onClick={() => setModal(true)}>Create New Task!</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <TaskCreatingForm action={"add"}/>
        </MyModal>
    </div>
  )
}

export default AddTask