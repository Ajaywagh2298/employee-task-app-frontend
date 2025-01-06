import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import {Dashboard}from './pages/Dashboard';
import EmployeeForm from "./components/EmployeeForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
      <Router>
          <Routes>
              <Route
                  path="/"
                  element={
                      user ? (
                          user.admin === 0 ? <EmployeeForm /> : <Dashboard />
                      ) : (
                          <Login onLogin={setUser} />
                      )
                  }
              />
            <Route path={'/dashboard'} element={<Dashboard/>} />
          </Routes>
      </Router>
      // <Dashboard />
  );
};

export default App;

