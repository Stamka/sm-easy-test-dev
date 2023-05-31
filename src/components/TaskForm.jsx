import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import PostService from './API/PostService';

const TaskCreatingForm = ({ action }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
  };

  const addTask = () => {
    const task = {
      "name": title,
      "description": description,
      "price": cost
    };
    console.log(task)

   //const response = PostService.addTask(task);

    setTitle('');
    setDescription('');
    setCost(0);
  };

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

      {action === 'add' ? (
        <MyButton onClick={addTask}>Добавить задачу</MyButton>
      ) : (
        <MyButton>Изменить задачу</MyButton>
      )}
    </form>
  );
};

export default TaskCreatingForm;
