import React from 'react'
import { useState, useEffect } from 'react'

const TaskComments = ({taskId}) => {

    const [TaskComments, setTaskComments] = useState([])
    const fetchTaskComments = async (taskId) => {

        const data = [
            {
              id: "de305d54-75b4-431b-adb2-eb6b9e546014",
              description: "Это первый комментарий.",
              username: "user1",
              python_time: "2023-07-18T10:30:00"
            },
            {
              id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
              description: "Это второй комментарий.",
              username: "user2",
              python_time: "2023-07-18T11:15:00"
            },
            {
              id: "5aa1c4a1-efc7-43f5-8b33-10d2d37c1c50",
              description: "Это третий комментарий.",
              username: "user3",
              python_time: "2023-07-18T12:00:00"
            },
            {
              id: "798d8e6c-7466-48d2-9763-1c87cb1e6e22",
              description: "Это четвёртый комментарий.",
              username: "user4",
              python_time: "2023-07-18T12:45:00"
            },
            {
              id: "f3d59f14-1e10-4c0a-9b88-7137e1a17f6d",
              description: "Это пятый комментарий.",
              username: "user5",
              python_time: "2023-07-18T13:30:00"
            }
          ]
    
        // Сортировка комментариев по времени
        const sortedComments = data.sort((a, b) => {
          return new Date(a.python_time) - new Date(b.python_time);
        });

        setTaskComments(sortedComments);


    }

    useEffect( 
        ()=>{
            fetchTaskComments(taskId);
        }, [taskId]
    )
    
  
  return (
    <div>
        <h2>Сортированные комментарии</h2>
        {TaskComments.map((comment, index) => (
          <div key={index} className="comment-box">
            <p>Username: {comment.username}</p>
            <p>
              Время: {new Date(comment.python_time).toLocaleString('ru-RU', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
            <p>Description: {comment.description}</p>
          </div>
        ))}
      </div>
  )
}

export default TaskComments