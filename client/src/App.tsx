import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import UserCreateForm from './components/UserCreateForm';
import path from 'path';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Users/>} path='/'/>
        <Route element={<UserCreateForm/>} path='/create'/>
      </Routes>
    </div>
  );
}

export default App;
