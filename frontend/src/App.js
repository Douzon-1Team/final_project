import React from "react";
import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Main from "./pages/Main";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import LeaveReq from "./components/LeaveReq/LeaveReq";
import Layout from "./components/common/Layout";
import EmpList from "./components/admin/EmpList";
import {useSelector} from "react-redux";
import LeaveList from './components/List/LeaveList'
import AttendanceList from "./components/List/AttendanceList";
import {AttendanceReq} from "./components/AttendanceReq/AttendanceReq";
import UpdateEmp from "./components/admin/UpdateEmp"
import DeptVacation from "./components/DeptVacation/DeptVacation";
import AcceptReq from "./components/AcceptReq/AcceptReq"
import VacationGraph from "./components/report/Chart/VacationGraph";
import DeptMember from "./components/DeptMember/DeptMember";
import AttendanceProblem from "./components/report/Chart/AttendanceProblem";
import Report from "./components/Report";
import Page404 from "./pages/Page404";
import { styled } from '@mui/material/styles';
import CollapseList from "./components/report/List/CollapseList";
import Graph52h from "./components/report/Chart/Graph52h";
import DayWorkChart from "./components/report/Chart/DayWorkChart";

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

function App() {
    const empRole = useSelector( (state) => state.EMP_INFO.empInfo[2] );
    const LoginChk = localStorage.getItem("LoginChk");

    return (
        <RootStyle>
            <Routes>
                <Route path="/" element={ LoginChk === null ? <Login /> : <Navigate replace to="/main" /> } />
                <Route element={ <> <Layout /> <PrivateRoute /> </>}>
                    <Route path="/main" element={<Main />} />
                    <Route path="/profile" element={ <Profile />}/>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/leavereq" element={<LeaveReq />} />
                    <Route path="/leavelist" element={<LeaveList />} />
                    <Route path="/attendancereq" element={<AttendanceReq />} />
                    <Route path="/attendancelist" element={<AttendanceList />} />
                    <Route path="/admin/list" element={<EmpList/>} />
                    <Route path="/dvacation" element={<DeptVacation />} />
                    <Route path="/deptmember" element={<DeptMember />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/admin/list" element={empRole !== "ROLE_ADMIN" ? <Navigate replace to="*"/> : <EmpList/>}/>
                    <Route path="/profile/:empno" element={empRole !== "ROLE_ADMIN" ? <Navigate replace to="*"/> : <UpdateEmp/>}/>
                    <Route path="/profile/new" element={empRole !== "ROLE_ADMIN" ? <Navigate replace to="*"/> : <UpdateEmp/>}/>
                    <Route path="/dvacation" element={<DeptVacation />}/>
                    <Route path="/acceptreq" element={<AcceptReq />} />
                    <Route path="/report/att" element={<CollapseList/>}/>
                    <Route path="/dvacation-status" element={<VacationGraph />}/>
                    <Route path="/report/52Gr" element={<Graph52h />} />
                    <Route path="/report/weekworkGr" element={<DayWorkChart />} />
                    <Route path="/report/vacationGr" element={<VacationGraph/>} />
                    <Route path="/report/AttGr" element={<AttendanceProblem />} />
                </Route>

                {/* 404 page */}
                <Route
                    path="*"
                    element={
                        <div>
                            {" "}
                            <Page404 />{" "}
                        </div>
                    }
                />
            </Routes>
        </RootStyle>
    );
}

export default App;
