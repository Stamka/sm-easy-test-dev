import React, { useState, useEffect} from 'react';
import PostService from './API/PostService';
import './ProjectItem.css'
import { useNavigate } from 'react-router';
import MyButton from './UI/button/MyButton';

const ProjectItem = ({ project }) => {
  const [projectTasks, setProjectTasks] = useState([]);
  const navigate = useNavigate();
  const handleOpenProject = () => {
    navigate(`/myprojects/${project.id}`, { state: { projectTasks} });
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
    </div>
  );
};

export default ProjectItem;
