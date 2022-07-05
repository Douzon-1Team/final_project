import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Logo from "./Logo/Logo";
import SideBar from "./SideBar/SideBar";
import { useSelector } from "react-redux";
import DashboardNavbar from "../common/Header/DashboardNavbar"
import DashboardSidebar from "./SideBar/DashboardSidebar";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const empRole = useSelector( (state) => state.EMP_INFO.empInfo[2] );
  const [role, setRole] = useState(""); // 0 일반 사용자, 1 담당자, 2 관리자
  const [sideView, setSideView] = useState(true); // 사이드바 개시 여부
  const changeState = () => {
    setSideView(!sideView);
  };

  useEffect(() => {
    let chkRole = [...role];
    if (empRole === "ROLE_MANAGER") {
      chkRole[1] = empRole;
      setRole(1);
    } else if (empRole === "ROLE_ADMIN") {
      chkRole[2] = empRole;
      setRole(2);
    } else {
      chkRole[0] = empRole;
      setRole(0);
    }
    return () => {};
  }, []);

  return (
      <>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        {/*<Logo role={role} />*/}
        {/*<Header role={role} sideView={sideView} changeState={changeState} />*/}
        {/*{sideView && <SideBar role={role} />}*/}
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      </>
  );
};

export default Layout;
