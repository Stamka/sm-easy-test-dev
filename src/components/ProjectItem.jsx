import React, { useState, useEffect} from 'react';
import PostService from './API/PostService';
import './ProjectItem.css'
import { useNavigate } from 'react-router';
import MyButton from './UI/button/MyButton';
import MyModal from './UI/MyModal/MyModal';

const ProjectItem = ({ project, onDeleteProject }) => {
  const [projectTasks, setProjectTasks] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  const handleOpenProject = () => {
    navigate(`/projects/${project.id}`, { state: {projectTasks, project}});
  };
  const fetchTasks = async (projectId) => {
    try {
      const response = await PostService.getProjectTasks(projectId);
      setProjectTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks(project.id);

  }, [project.id]);

  const deleteProject = async (projectId) => {
    console.log("Delete project", projectId);
    const response = await PostService.deleteProject(projectId);
    onDeleteProject(projectId); 
    setDeleteConfirmation(false);
  }


  return (
    <div className="project-item">
      <div className="project-info">
        <div className="project-name">{project.name}</div>
        <div className="project-details">
          {projectTasks.length > 0 ? (
            <div>Количество задач: {projectTasks.length}</div>
          ) : (
            <div>В этом проекте еще нет задач</div>
          )}
        </div>
      </div>
      <div className='buttons-container'>
        <MyButton id="open-button" onClick={handleOpenProject} >Открыть проект</MyButton>
        <MyButton id="delete-button" onClick={()=>{setDeleteConfirmation(true)}}>Удалить проект</MyButton>
        <MyModal  visible={deleteConfirmation} setVisible={setDeleteConfirmation}>
                <MyButton onClick={() => deleteProject(project.id)}>
                Удалить
                </MyButton>
                <MyButton>
                Отмена
                </MyButton>
        </MyModal>
      </div>
    </div>
  );
};

export default ProjectItem;
