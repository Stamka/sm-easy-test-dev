import React from "react"
import MainPage from "../pages/MainPage"
import About from "../pages/About"
import Profile from "../pages/Profile"
import Tasks from "../pages/Tasks"
import Projects from "../pages/Projects"
import ProjectOverview from "../pages/ProjectOverview"
import TaskOverview from "../pages/TaskOverview"


export const routes = [
        {path:'/', element:<MainPage/>},
        {path:'/profile', element:<Profile/>},
        {path:'/mytasks', element:<Tasks/>},
        {path:'/projects/:id', element:<ProjectOverview/>},
        {path: '/projects/:id/tasks/:taskid', element: <TaskOverview/>},
        {path:'/projects', element:<Projects/>},
        {path:'/about', element:<About/>}

]