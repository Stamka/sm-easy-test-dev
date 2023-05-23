import React from "react"
import MainPage from "../pages/MainPage"
import About from "../pages/About"
import Profile from "../pages/Profile"
import Tasks from "../pages/Tasks"
import Projects from "../pages/Projects"


export const routes = [
        {path:'/', element:<MainPage/>},
        {path:'/profile', element:<Profile/>},
        {path:'/mytasks', element:<Tasks/>},
        {path:'/myprojects', element:<Projects/>}

]