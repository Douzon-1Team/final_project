import styled from 'styled-components';

export const BarBox = styled.div`
  background-color: #d9d9d9;
  width: 230px;
  height: 85vh;
  overflow: hidden;
  float: left;
`;

export const Menu = styled.div`
  padding-top: 5px;
`;

export const SideMenuForm = styled.div`
  margin-left: 10px;
  min-width: 200px;
  width: 13vw;
  height: fit-content;
  min-height: 50px;
  &:hover {
    color: #00aaff;
    font-weight: bolder;
  }
  cursor: pointer;
  margin-top: 20px;
  border-bottom: 2px solid #ababab;
`;

export const MenuTextBox = styled.div`
  margin-left: 1vw;
  font-size: 20px;
  width: 10vw;
  min-width: 200px;
  position: absolute;
`;

export const SideMenuBox = styled.div`
  width: 30px;
  font-size: 20px;
  float: right;
  margin-right: 7%;
`;

export const SmallSide = styled.div`
  padding-bottom: 5%;
  background-color: #f0f0f0;
`;

export const SmallSideMenu = styled.div`
  padding-top: 5%;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    font-weight: bolder;
    background-color: #9c9c9c;
  }
  font-size: 20px;
`;

export const style = {
  BarBox,
  Menu,
  SideMenuForm,
  MenuTextBox,
  SideMenuBox,
  SmallSide,
  SmallSideMenu,
};
