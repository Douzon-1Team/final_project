import styled from 'styled-components';
import SideLogo from '../../../../src/assets/img/sidebarlogo.png';

export const LogoForm = styled.div`
  height: 7vh;
`;

export const LogoImgbox = styled.div`
  height: 15vh;
  width: 20vh;
  margin-left: 2vw;
  background-image: url(${SideLogo});
  background-size: cover;
  &:hover { cursor: pointer; }
`;

export const Profilefrom = styled.div`
  position: absolute;
  height: 7vh;
  width: 8vw;
  margin-left: 85%;
  display: inline-block;
  min-width: 200px;
`;

export const UserImg = styled.img`
    width: 55px;
    height: 55px; 
    border-radius: 50%;
`;

export const UserName = styled.div`
  float: left;
  width: 3vw;
  padding-top: 2vh;
  padding-left: 0.5vw;
  color: #6f6f6f;
  font-weight: bolder;
  min-width: 60px;
`;

export const UserSetting = styled.div`
  width: 1vw;
  height: fit-content;
  margin-top: 2vh;
  margin-left: -0.2vw;
  display: inline-block;
  cursor: pointer;
  min-width: 10px;
`;

export const SettingOpen = styled.div`
  border: 1px solid black;
  width: fit-content;
  height: fit-content;
  max-width: 150px;
  background-color: #f0f0f0;
  margin-top: 1px;
  margin-left: 60px;
  border-radius: 2%;
`;

export const SetForm = styled.div`
  cursor: pointer;
  text-align: center;
  margin-top: 3px;
  height: 25px;
  width: 110px;
  &:hover {
    color: #ffffff;
    font-weight: bolder;
    font-size: 20px;
    background-color: #9c9c9c;
  }
`;

export const style = {
  LogoForm,
  LogoImgbox,
  Profilefrom,
  UserImg,
  UserName,
  UserSetting,
  SettingOpen,
  SetForm,
};
