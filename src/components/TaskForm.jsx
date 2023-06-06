import React, { useEffect, useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import PostService from './API/PostService';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
const tg = window.Telegram.WebApp;

const TaskForm = ({ action, positions, projectId, onAddedOrChanged, initTask={} }) => {
  
  const [userId, setUserId] = useState(0)
  const [title, setTitle] = useState(initTask.name || '');
  const [description, setDescription] = useState(initTask.description || '');
  const [cost, setCost] = useState(initTask.price || 0);

  const [taskPosition, setTaskPosition] = useState(initTask.position_id || "");

  useEffect(()=> {
    tg.ready();
    setUserId(tg.initDataUnsafe?.user?.id || 231279140)

}, [userId])

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const handlePositionChange = (event) => {

    console.log(event.value)
    setTaskPosition(event.value);
  };

  
  console.log("Init Task: ", initTask)
  console.log("Positions: ", positions)

  const addOrChangeTask = async (action) => {

    let response;


    if (action === "add"){

      const jsDate = new Date(); // Get the current date and time
      const isoString = jsDate.toISOString();

      const task = {
        "project_id": projectId,
        "name": title,
        "description": description,
        "price": cost,
        "creator_id": userId,
        "created_date": isoString,
        "position_id": taskPosition, 
        "status": "HOLD"
      };

      console.log(task)

      response = await PostService.addTask(task);

    }else{

      const task = {...initTask, 
          "name": title,
          "description": description,
          "price": cost,
          "position_id": taskPosition
      }


      response = await PostService.updateTask(task.id, task);
    }

    if (response.status === 200) {
      console.log("Task successfully added", response.data)
      }else{
        console.log("Error in adding ask")
      }

    setTitle('');
    setDescription('');
    setCost(0);
    onAddedOrChanged();
  };

  console.log("Action = ", action)

  return (
    <form>
      <MyInput
        type="text"
        placeholder="Название задания"
        value={title}
        onChange={handleTitleChange}
      />
      <MyInput
        type="text"
        placeholder="Описание задания"
        value={description}
        onChange={handleDescriptionChange}
      />
      <MyInput
        type="number"
        placeholder="Стоимость таски"
        value={cost}
        onChange={handleCostChange}
      />

      { (initTask?.status === undefined
          || initTask?.status === "HOLD"
          || initTask?.status === "FINDING_EXECUTOR"
        ) && (<div>
        <div>Выбери позиции для поиска вакансий </div>
        <Select onChange={handlePositionChange} isSearchable isClearable name="positions" options={positions} />
      </div>)}
      {action === 'add' ? (
        <MyButton onClick={ () => addOrChangeTask("add")}>Добавить задачу</MyButton>
      ) : (
        <MyButton onClick={ () => addOrChangeTask("update")}>Изменить задачу</MyButton>
      )}
    </form>
  );
};

export default TaskForm;
