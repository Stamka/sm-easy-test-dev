import React, { useState } from 'react'
import ProjectForm from './ProjectForm'
import MyButton from './UI/button/MyButton'
import MyModal from './UI/MyModal/MyModal'

const EditProject = ({project, userId}) => {

    const [modal, setModal] = useState(false)
    console.log("Edit project", project)
  return (
    <div>
        <MyButton onClick={() => setModal(true)}>Edit Project</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <ProjectForm PrevProject={project} userId={userId}/>
        </MyModal>
    </div>
  )
}

export default EditProject