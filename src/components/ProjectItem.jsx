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
    navigate(`/myprojects/${project.id}`, { state: {projectTasks, project}});
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
        <div className="project-name">Project Name: {project.name}</div>
        <div className="project-details">
          {projectTasks.length > 0 ? (
            <div>Total Tasks: {projectTasks.length}</div>
          ) : (
            <div>There are no tasks in your project</div>
          )}
        </div>
      </div>
      <MyButton onClick={handleOpenProject} >Открыть</MyButton>
      <MyButton onClick={()=>{setDeleteConfirmation(true)}}>Удалить проект</MyButton>
      <MyModal  visible={deleteConfirmation} setVisible={setDeleteConfirmation}>
            <MyButton onClick={() => deleteProject(project.id)}>
              Удалить
            </MyButton>
            <MyButton>
              Отмена
            </MyButton>
      </MyModal>
    </div>
  );
};

export default ProjectItem;
