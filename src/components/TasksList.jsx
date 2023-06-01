import React from 'react';
import MyButton from './UI/button/MyButton';

const TasksList = ( {rawTasks} ) => {

    const tasksByStatus = rawTasks.reduce((acc, task) => {
        if (acc[task.status]) {
          acc[task.status].push(task);
        } else {
          acc[task.status] = [task];
        }
        return acc;
    }, {});

    console.log('tasksStatus',tasksByStatus);

    return (
        <div>
            {Object.entries(tasksByStatus).map(([status, tasks]) => ( 
                <div className={`status-block ${status}`} key={status}>
                    <h2 className="status-heading">{status}</h2>
                    <ul className="task-list">
                        {
                            tasks.map((task) => (
                                <li key={task.id}>
                                    {console.log('task in return', task)}
                                    {TaskCard(task)}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))}
        </div>
    );
};

const TaskCard = ( task ) => {

    const statusLabels = {
        'HOLD': ['Начать поиск исполнителя'],
        'FINDING_EXECUTOR': ['Прекратить поиск исполнителя'],
        'TO_DO': ['Взять задание в работу'],
        'IN_PROGRESS': ['To review', 'Обратно в беклог'],
        'REVIEW': ['Обратно в работу', 'Сделано']
    };

    const parseTaskStatusForButton = (status) => {
        return (
            <div className='button-container'>
                {statusLabels[status].map((label) => (
                    <MyButton className='change-status-button'>{label}</MyButton>
                ))}
            </div>
        )
    }
    return (
        <div>
            <div>
                <h3>{task.name}</h3>
                <p>{task.description}</p>
            </div>
            <p>{task.price}</p>
            {parseTaskStatusForButton(task.status)}
        </div>
    );
};

export default TasksList;