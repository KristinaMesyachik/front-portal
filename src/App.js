import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from "./components/navbar/HeaderComponent";
import AppRouter from "./components/AppRouter";
import HeaderComponentLogin from "./components/navbar/HeaderComponentLogin";

function App() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    setUsername(
      sessionStorage.getItem("USER_NAME_SESSION_ATTRIBUTE_NAME")
    )
  }, sessionStorage.getItem("USER_NAME_SESSION_ATTRIBUTE_NAME")
  )

  return (
    <div>
      {username !== null ?
        <HeaderComponent username = {username}/>
        :
        <HeaderComponentLogin />
      }
      <AppRouter />
    </div>
  )
}

export default App;
