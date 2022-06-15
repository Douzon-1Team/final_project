import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Main from './pages/Main';
import { useSelector } from 'react-redux';

// import User from "./components/common/User";

function App() {
  const token = useSelector((state) => {
    return state;
  });
  console.log(token);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/main" element={<Main />} />
        {/* <Route path="/user" element={<User />} /> */}
        {/* 404 page */}
        <Route path="*" element={<div> 없는 페이지 </div>} />
      </Routes>
    </>
  );
}

export default App;
