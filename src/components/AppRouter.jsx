import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Response from '../pages/Response'
import ListFieldComponents from '../pages/ListFieldComponents'
import Error from "../pages/Error";
import AddResponse from "../pages/AddResponse";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import SuccessfulResponse from "../pages/SuccessfulResponse";
import ChangeProfile from "../pages/ChangeProfile";
import EditPassword from "../pages/EditPassword";
import Registration from "../pages/Registration";


const AppRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AddResponse />} />
          <Route path="/fields" element={<ListFieldComponents />} />
          <Route path="/responses" element={<Response />} />
          <Route path="/login" element={<Login />} />   
          <Route path="/registration" element={<Registration />} />        
          <Route path="/queationnaires/:id" element={<SuccessfulResponse />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/changeProfile" element={<ChangeProfile />} />
          <Route path="/editPassword" element={<EditPassword />} />
          <Route path="/error" element={<Error />} />
         {/*  <Redirect to="/error" /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
