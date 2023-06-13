import React, {useEffect, useRef, useState} from 'react'
import MyInput from './UI/input/MyInput'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import MyButton from './UI/button/MyButton';
import PostService from './API/PostService';
import { components } from 'react-select';
const tg = window.Telegram.WebApp;


const ProjectForm = ({action, PrevProject = {}, userId}) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [newProject, setNewProject] = useState({})
  const [projectId, setProjectId] = useState('')

  const [value, onChange] = useState(new Date());
  const [checkboxValue, setCheckboxValue] = useState(true);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleCheckBox = () => {
    setCheckboxValue(!checkboxValue);
  }

  useEffect(()=> {
    tg.ready()
    console.log(PrevProject)
    if (Object.keys(PrevProject).length !== 0){
      setName(PrevProject?.name)
      setDescription(PrevProject?.description)
      setBudget(PrevProject?.budget)
      setProjectId(PrevProject?.id)
    }
    
    

  }, [PrevProject])


  const addOrChangeProject = async (edit = false) => {
    const tempProject = {
      "user_id":userId,
      "name":name,
      "description":description,
      "budget":budget || 0

    }
    console.log("newProject=",tempProject);
    const response = "";
    if (edit){
      tempProject.id = projectId
      response = await PostService.editProject(tempProject.id,tempProject)

    }else{
      response = await PostService.addProject(tempProject);
    }
    

    console.log("kekv")
    console.log("Response=",response);
  }


  console.log("Proejct userId=", userId, name, description);
  return (
    <form>
        <MyInput
        type="text"
        placeholder="Название проекта"
        value={name}
        onChange={handleNameChange}
        />
        <MyInput
        type="text"
        placeholder="Описание проекта"
        value={description}
        onChange={handleDescriptionChange}
        />
        <MyInput
        type="number"
        placeholder="Введите бюджет проекта"
        value={budget}
        onChange={handleBudgetChange}
        />
        <div>
          Дедлайн проекта <input type="checkbox" checked={checkboxValue} onChange={handleCheckBox} />
          { checkboxValue
           ? <DatePicker onChange={onChange} value={value} />
           : <div></div>
          }
        </div>

        {action === "add"
        ? <MyButton onClick={ () => addOrChangeProject(false)}>Добавить проект</MyButton>
        : <MyButton onClick={ () => addOrChangeProject(true)}>Изменить проект</MyButton> 
        }

    </form>
  )
}

export default ProjectForm