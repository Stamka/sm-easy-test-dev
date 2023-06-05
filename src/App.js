import React from "react";
import MainPage from "./components/pages/MainPage";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import MyButton from "./components/UI/button/MyButton";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
