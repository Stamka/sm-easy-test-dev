import React from "react"
import MainPage from "../pages/MainPage"
import About from "../pages/About"
import Profile from "../pages/Profile"
import Tasks from "../pages/Tasks"
import Projects from "../pages/Projects"
import ProjectOverview from "../pages/ProjectOverview"


export const routes = [
        {path:'/', element:<MainPage/>},
        {path:'/profile', element:<Profile/>},
        {path:'/mytasks', element:<Tasks/>},
        {path:'/myprojects/:id', element:<ProjectOverview/>},
        {path:'/myprojects', element:<Projects/>}

]