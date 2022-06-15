import React, { useState } from 'react';
import { style } from './LogoStyle';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';

const Logo = ({ role }) => {
  const [open, setOpen] = useState(false);
  const setLists = [
    {
      id: 1,
      menu: '마이프로필',
    },
    {
      id: 2,
      menu: '화면잠금',
    },
    {
      id: 3,
      menu: '환경설정',
    },
    {
      id: 4,
      menu: '로그아웃',
    },
  ];

  return (
    <LogoForm>
      <LogoImgbox />
      <Profilefrom>
        <UserImg />
        <UserName>홍길동</UserName>
        <UserSetting onClick={() => setOpen(!open)}>
          {open === true ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
        </UserSetting>
        {open && (
          <SettingOpen onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
            <SetForm>{setLists[0].menu}</SetForm>
            <SetForm>{setLists[1].menu}</SetForm>
            {role !== 0 ? <SetForm>{setLists[2].menu}</SetForm> : null}
            <SetForm>{setLists[3].menu}</SetForm>
          </SettingOpen>
        )}
      </Profilefrom>
    </LogoForm>
    // -----------------------------
  );
};
const { LogoForm, LogoImgbox, Profilefrom, UserImg, UserName, UserSetting, SettingOpen, SetForm } =
  style;
export default Logo;