import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import AddOrChangeTask from '../AddOrChangeTask';
import EditProject from '../EditProject';
import MyButton from '../UI/button/MyButton';
import '../UI/css/ProjectOverview.css'
import PostService from '../API/PostService';
import TasksList from '../TasksList';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
const tg = window.Telegram.WebApp;



const ProjectOverview = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [projectTasks, setProjectTasks] = useState([]);
  const [userId, setUserId] = useState();
  const [currentProject, setCurrentProject] = useState({});
  const [currentSpending, setCurrentSpending] = useState(0);
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [findingExecutorTasksCount, setFindingExecutorTasksCount] = useState(0);
  const [taskWithExecutorCount, setTaskWithExecutorCount] = useState(0);

  useEffect(()=>{
    fetchTasks();
    fetchProject();
    tg.ready();
    setUserId(tg.initDataUnsafe?.user?.id || 231279140)
  }, [])

  useEffect(() => {
    setCurrentSpending(calculateBudget());
  }, [projectTasks])

  console.log("CurProj", location, currentProject)
  const tasksByStatus = projectTasks.reduce((acc, task) => {
    if (acc[task.status]) {
      acc[task.status].push(task);
    } else {
      acc[task.status] = [task];
    }
    return acc;
  }, {});

  const fetchTasks = async () => {
    try {
      const response = await PostService.getProjectTasks(params.id);
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




  const fetchProject = async () => {
    try {
        console.log('ProjectOverview: fetchProject ',params.id);
        const response = await PostService.getProject(params.id);
        setCurrentProject(response.data);
    } catch (error) {
        console.log(error);
    }
  };

  const actionTaskChanged = async () => {
    console.log('taskadded')
    await fetchProject();
    await fetchTasks();
  }

  const calculateBudget = () => {
    console.log("Proj. Budget: ", currentProject.budget);
    console.log(projectTasks);
    var totalPrice = 0;
    projectTasks.forEach(function(task) {
      totalPrice += task.price;
    });
    console.log("Total price: ", totalPrice)
    return totalPrice;
  }



  console.log("Project", params.id)
  return (
    <div>
      {currentProject
      ? (<div className="project-container">
            <div className="project-info">
                <div className="project-name">{currentProject.name}</div>
                <div className="project-description">{currentProject.description}</div>
                <div className="project-details">
                {projectTasks.length > 0 ? (
                    <div>
                      <div>Всего задач: {projectTasks.length}</div>
                      <div>Сейчас исполнители найдены для {taskWithExecutorCount} из {projectTasks.length} задач</div>
                      <div>Ищется {findingExecutorTasksCount} исполнителей</div>
                      <div>Количество задач со статусом "DONE": {doneTasksCount}</div>
                    </div>
                ) : (
                    <div>В этом проекте еще нет задач</div>
                )}
                <div>
                  {(currentProject.budget)
                    ? <div>Израсходовано: {currentSpending} из {currentProject.budget}</div>
                    : <div>Израсходовано: {currentSpending}</div>
                  }
                </div>
                </div>
            </div>
      <div className='button-container'>
        <EditProject project={currentProject} userId={userId}/>
        <AddOrChangeTask projectId={params.id} onAddedOrChanged={actionTaskChanged} action={"add"}/>
      </div>
      {
        projectTasks && <TasksList rawTasks={projectTasks} actionTaskChanged={actionTaskChanged}/> 
      }
    </div>)
      : <div>Loading</div>
      }
    <BackButton onClick={ () => navigate(`/projects`) }></BackButton>
    </div>
  );
};

export default ProjectOverview