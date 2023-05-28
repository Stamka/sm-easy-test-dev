import React, { useState, useEffect } from 'react';
import PostService from './API/PostService';
import './ProjectItem.css'

const ProjectItem = ({ project }) => {
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await PostService.getProjectTasks(project.id);
        setProjectTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
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
    </div>
  );
};

export default ProjectItem;
