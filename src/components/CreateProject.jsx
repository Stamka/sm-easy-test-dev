import React, { useState, useEffect } from 'react'
import ProjectForm from './ProjectForm';
import MyModal from './UI/MyModal/MyModal'
const tg = window.Telegram.WebApp;

const CreateProject = ({modal, setModal}) => {

  const [userId, setUserId] = useState(0)

  useEffect(()=> {
        tg.ready();
        setUserId(tg.initDataUnsafe?.user?.id || 231279140)
    }, [userId])
    
  return (
    
    <div>
        <MyModal visible={modal} setVisible={setModal}>
            <ProjectForm action={"add"} userId={userId}/>
        </MyModal>  
    </div>
  )
}

export default CreateProject