import React from 'react';
import ReactDOM from 'react-dom/client';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeList from "./Employeelist";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import Login from './Login';
import Logout from './Logout';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
    <Routes>
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/add" element={<AddEmployee />} />
      <Route path="/edit/:id" element={<EditEmployee />} />
      <Route path="/" element={<Login />} />
      <Route path="/logout" element={<Logout/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

