import React, { useState } from 'react';
import Header from './Header/Header';
import Logo from './Logo/Logo';
import SideBar from './SideBar/SideBar';

const Layout = () => {
  const [role, setRole] = useState(1); // 0 일반 사용자, 1 담당자, 2 관리자
  const [sideView, setSideView] = useState(false); // 사이드바 개시 여부
  const changeState = () => {
    setSideView(!sideView);
  };
  return (
    <>
      <Logo role={role} />
      <Header role={role} sideView={sideView} changeState={changeState} />
      {sideView === true ? <SideBar role={role} /> : null}
    </>
  );
};
export default Layout;
