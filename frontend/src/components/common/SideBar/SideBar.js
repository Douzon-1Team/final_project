import React, { useState } from "react";
import { style } from "./SideBarStyle";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// BsChevronDoubleUp
export const SideBar = ({ role }) => {
  const sideMenu = [
    {
      id: 1,
      menu: "나의 근태 현황",
    },
    {
      id: 2,
      menu: "휴가 신청",
    },
    {
      id: 3,
      menu: "근태 조정 신청",
    },
    {
      id: 4,
      menu: "팀 관리",
    },
    {
      id: 5,
      menu: "관리자"
    }
  ];
  const SideMenu1 = [
    {
      id: 1,
      menu: "일별 현황",
    },
    {
      id: 2,
      menu: "월별 현황",
    },
  ];
  const SideMenu2 = [
    {
      id: 1,
      menu: "휴가 신청",
    },
    {
      id: 2,
      menu: "휴가 신청 목록",
    },
  ];
  const SideMenu3 = [
    {
      id: 1,
      menu: "근태조정 신청",
    },
    {
      id: 2,
      menu: "근태조정 신청 목록",
    },
  ];
  const SideMenu4 = [
    {
      id: 1,
      menu: "근태 조정",
    },
    {
      id: 2,
      menu: "사원 목록",
    },
    {
      id: 3,
      menu: "보고서 관리",
    },
  ];

  const SideMenu5 = [
    {
      id: 1,
      menu: "사원 등록"
    },
    {
      id: 2,
      menu: "사원 정보 조회"
    }
  ]

  const [secondMenu1, setSecondMenu1] = useState(false);
  const [secondMenu2, setSecondMenu2] = useState(false);
  const [secondMenu3, setSecondMenu3] = useState(false);
  const [secondMenu4, setSecondMenu4] = useState(false);
  const [secondMenu5, setSecondMenu5] = useState(false);

  let navigate = useNavigate();

  return (
    <BarBox>
      <Menu>
        <SideMenuForm onClick={() => setSecondMenu1(!secondMenu1)}>
          <MenuTextBox>{sideMenu[0].menu}</MenuTextBox>
          <SideMenuBox>
            {secondMenu1 === true ? (
              <BsChevronCompactUp />
            ) : (
              <BsChevronCompactDown />
            )}
          </SideMenuBox>
        </SideMenuForm>
        {secondMenu1 === true ? (
          <SmallSide>
            {/*일별 현황*/}
            <SmallSideMenu>{SideMenu1[0].menu} </SmallSideMenu>
            {/*월별 현황*/}
            <SmallSideMenu>{SideMenu1[1].menu}</SmallSideMenu>
          </SmallSide>
        ) : null}
        {/* ---------------------------------------- */}
        <SideMenuForm onClick={() => setSecondMenu2(!secondMenu2)}>
          <MenuTextBox>{sideMenu[1].menu}</MenuTextBox>
          <SideMenuBox>
            {secondMenu2 === true ? (
              <BsChevronCompactUp />
            ) : (
              <BsChevronCompactDown />
            )}
          </SideMenuBox>
        </SideMenuForm>
        {secondMenu2 === true ? (
          <SmallSide>
            {/*휴가 신청*/}
            <SmallSideMenu onClick={() => navigate("/leavereq")}>
              {SideMenu2[0].menu}
            </SmallSideMenu>
            {/*휴가 신청 목록*/}
            <SmallSideMenu onClick={() => navigate("/leavelist")}>{SideMenu2[1].menu}</SmallSideMenu>
          </SmallSide>
        ) : null}
        {/* ---------------------------------------- */}
        <SideMenuForm onClick={() => setSecondMenu3(!secondMenu3)}>
          <MenuTextBox>{sideMenu[2].menu}</MenuTextBox>
          <SideMenuBox>
            {secondMenu3 === true ? (
              <BsChevronCompactUp />
            ) : (
              <BsChevronCompactDown />
            )}
          </SideMenuBox>
        </SideMenuForm>
        {secondMenu3 === true ? (
          <SmallSide>
            {/*근태 신청*/}
            <SmallSideMenu onClick={() => navigate("/attendancereq")}>{SideMenu3[0].menu}</SmallSideMenu>
            {/*근태 목록*/}
            <SmallSideMenu onClick={() => navigate("/attendancelist")}>{SideMenu3[1].menu}</SmallSideMenu>
          </SmallSide>
        ) : null}
        {/* ---------------------------------------- */}
        {role !== 0 ? (
          <SideMenuForm onClick={() => setSecondMenu4(!secondMenu4)}>
            <MenuTextBox>{sideMenu[3].menu}</MenuTextBox>
            <SideMenuBox>
              {secondMenu4 === true ? (
                <BsChevronCompactUp />
              ) : (
                <BsChevronCompactDown />
              )}
            </SideMenuBox>
          </SideMenuForm>
        ) : null}
        {secondMenu4 === true ? (
          <SmallSide>
            <SmallSideMenu>{SideMenu4[0].menu}</SmallSideMenu>
            <SmallSideMenu>{SideMenu4[1].menu}</SmallSideMenu>
            <SmallSideMenu>{SideMenu4[2].menu}</SmallSideMenu>
          </SmallSide>
        ) : null}
        {/* ---------------------------------------- */}
        {role === 2 ? (
            <SideMenuForm onClick={() => setSecondMenu5(!secondMenu5)}>
              <MenuTextBox>{sideMenu[4].menu}</MenuTextBox>
              <SideMenuBox>
                {secondMenu5 === true ? (
                    <BsChevronCompactUp />
                ) : (
                    <BsChevronCompactDown />
                )}
              </SideMenuBox>
            </SideMenuForm>
        ) : null}
        {secondMenu5 === true ? (
            <SmallSide>
              <SmallSideMenu onClick={() => navigate("/profile/new")}>{SideMenu5[0].menu}</SmallSideMenu>
              <SmallSideMenu onClick={() => navigate("/admin/list")}>{SideMenu5[1].menu}</SmallSideMenu>
            </SmallSide>
        ) : null}
      </Menu>
    </BarBox>
  );
};
const {
  BarBox,
  Menu,
  SideMenuForm,
  MenuTextBox,
  SideMenuBox,
  SmallSide,
  SmallSideMenu,
} = style;
export default SideBar;
