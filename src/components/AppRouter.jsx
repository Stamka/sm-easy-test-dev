import React from 'react'
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import { routes } from './router/Router';


const AppRouter = () => {
  return (
      
      <Routes>
        {routes.map(route => 
            <Route key={route.path} path={route.path} element={route.element}></Route>
        )}
      </Routes>
  )
}

export default AppRouter