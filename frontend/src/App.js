import React from 'react';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import {useSelector} from "react-redux";
// import User from "./components/common/User";

function App() {
  const token = useSelector((state) => { return state })
  console.log(token)

  return (
      <>
        <Link to="/">HOME</Link>&nbsp;
        {
          token.ACCESS_TOKEN.authenticated === false
              ? <Link to="/login">LOGIN</Link> : <Link to="/logout">LOGOUT</Link>
        }

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/*<Route path="/user" element={<User />} />*/}
          {/* 404 page */}
          <Route path="*" element={<div> 없는 페이지 </div>} />
        </Routes>
      </>
  );
}

export default App;
