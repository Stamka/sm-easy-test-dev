import React, { useState, useEffect} from 'react';
import PostService from './API/PostService';
import './ProjectItem.css'
import { useNavigate } from 'react-router';
import MyButton from './UI/button/MyButton';
import MyModal from './UI/MyModal/MyModal';

const ProjectItem = ({ project, onDeleteProject }) => {
  const [projectTasks, setProjectTasks] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [currentSpending, setCurrentSpending] = useState(0);
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [findingExecutorTasksCount, setFindingExecutorTasksCount] = useState(0);
  const [taskWithExecutorCount, setTaskWithExecutorCount] = useState(0);
  const navigate = useNavigate();
  const handleOpenProject = () => {
    navigate(`/projects/${project.id}`, { state: {projectTasks, project}});
  };
  const fetchTasks = async (projectId) => {
    try {
      const response = await PostService.getProjectTasks(projectId);
      setProjectTasks(response.data);
      const doneTasks = response.data.filter(task => task.status === "DONE");
      const findingExecutorTasks = response.data.filter(task => task.status === "FINDING_EXECUTOR");
      const taskWithExecutor = response.data.filter(task => (task.status !== "FINDING_EXECUTOR" && task.status !== "HOLD"));
      setDoneTasksCount(doneTasks.length);
      setFindingExecutorTasksCount(findingExecutorTasks.length);
      setTaskWithExecutorCount(taskWithExecutor.length);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks(project.id);

  }, [project.id]);

  useEffect(() => {
    setCurrentSpending(calculateBudget());
  }, [projectTasks])

  const deleteProject = async (projectId) => {
    console.log("Delete project", projectId);
    const response = await PostService.deleteProject(projectId);
    if (response.status === 200){
      onDeleteProject(projectId); 
      setDeleteConfirmation(false);
    }else{
      console.error("Cant't Delete project!")
    }
    
  }

  
  const calculateBudget = () => {
    console.log("Proj. Budget: ", project.budget);
    console.log(projectTasks);
    var totalPrice = 0;
    projectTasks.forEach(function(task) {
      totalPrice += task.price;
    });
    console.log("Total price: ", totalPrice)
    return totalPrice;
  }




  return (
    <div className="project-item">
      <div className="project-info">
        <div className="project-name">{project.name}</div>
        <div className="project-details">
          {projectTasks.length > 0 ? (
            <div>
              <div>Количество задач: {projectTasks.length}</div>
              <div>Сейчас исполнители найдены для {taskWithExecutorCount} из {projectTasks.length} задач</div>
              <div>Ищется {findingExecutorTasksCount} исполнителей</div>
              <div>Количество задач со статусом "DONE": {doneTasksCount}</div>
            </div>
          ) : (
            <div>В этом проекте еще нет задач</div>
          )}
        </div>
      </div>
      <div className='buttons-container'>
        <MyButton id="open-button" onClick={handleOpenProject} >Открыть проект</MyButton>
        <div>
          {(project.budget)
            ? <div>Израсходовано: {currentSpending} из {project.budget}</div>
            : <div>Израсходовано: {currentSpending}</div>
          }
        </div>
        <br/>
       
        
        <MyButton id="delete-button" onClick={()=>{setDeleteConfirmation(true)}}>Удалить проект</MyButton>
        <MyModal  visible={deleteConfirmation} setVisible={setDeleteConfirmation}>
                <div>Вы уверены, что хотите удалить проект <div>{project.name}</div></div>
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
