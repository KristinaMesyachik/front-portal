import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from "./components/navbar/HeaderComponent";
import AppRouter from "./components/AppRouter";

function App() {

  return (
    <div>
      <HeaderComponent />
      <AppRouter />
    </div>
  )
}

export default App;
