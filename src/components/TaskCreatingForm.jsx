import React from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const TaskCreatingForm = ({action}) => {
  return (
    <form>
        <MyInput
        type="text"
        placeholder="Название задания"
        />
        <MyInput
        type="text"
        placeholder="Описание задания"
        />
        <MyInput
        type="number"
        placeholder="Стоимость таски"
        />

        {action === "add"
        ? <MyButton>Добавить задачу</MyButton>
        : <MyButton>Изменить задачу</MyButton> 
        }

    </form>
  )
}

export default TaskCreatingForm