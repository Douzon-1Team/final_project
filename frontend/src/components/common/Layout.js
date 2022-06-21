import React, { useState } from "react";
import Header from "../common/Header/Header";
import Logo from "../common/Logo/Logo";
import SideBar from "../common/SideBar/SideBar";

const Layout = () => {
  const [role, setRole] = useState(0); // 0 일반 사용자, 1 담당자, 2 관리자
  const [sideView, setSideView] = useState(false); // 사이드바 개시 여부
  const changeState = () => {
    setSideView(!sideView);
  };
  return (
    <>
      <Logo role={role} />
      <Header role={role} sideView={sideView} changeState={changeState} />
      {sideView && <SideBar role={role} />}
    </>
  );
};
export default Layout;
