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
  }, []);
  console.log(role);

  return (
      <>
        {role !== null ?
            <>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} role2={role} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} role2={role} />
            </>
            : <></> }
      </>
  );
};

export default Layout;
