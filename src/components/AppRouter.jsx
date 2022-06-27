import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect
  } from "react-router-dom";
import Response from '../pages/Response'
import ListFieldComponents from '../pages/ListFieldComponents'
import Error from "../pages/Error";
import AddResponse from "../pages/AddResponse";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Response />} />
          <Route path="/fields" element={<ListFieldComponents />} />
          <Route path="/addResponse" element={<AddResponse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<Error />} />
         {/*  <Redirect to="/error" /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
