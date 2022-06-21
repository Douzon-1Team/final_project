import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Main from "./pages/Main";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import LeaveReq from "./components/LeaveReq/LeaveReq";
// import EmpInfo from "./pages/EmpInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          {/*<Route path="/empInfo" element={<EmpInfo />} />*/}
          <Route path="/logout" element={<Logout />} />
          <Route path="/leavereq" element={<LeaveReq />} />
        </Route>

        {/* 404 page */}
        <Route
          path="*"
          element={
            <div>
              {" "}
              없는 페이지 <Login />{" "}
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
