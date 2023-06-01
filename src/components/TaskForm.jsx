import React, { useEffect, useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import PostService from './API/PostService';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
const tg = window.Telegram.WebApp;

const TaskCreatingForm = ({ action, positions, projectId, onAdded }) => {
  const [title, setTitle] = useState('');

  const [userId, setUserId] = useState(0)
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);

  const [taskPosition, setTaskPosition] = useState("");

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

  

  const addTask = () => {

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

   const response = PostService.addTask(task);

    setTitle('');
    setDescription('');
    setCost(0);
    onAdded();
  };

  console.log(positions)
  console.log(projectId)
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

      <div>Выбери позиции для поиска вакансий </div>
      <Select onChange={handlePositionChange} isSearchable isClearable name="positions" options={positions} />

      {action === 'add' ? (
        <MyButton onClick={addTask}>Добавить задачу</MyButton>
      ) : (
        <MyButton>Изменить задачу</MyButton>
      )}
    </form>
  );
};

export default TaskCreatingForm;
