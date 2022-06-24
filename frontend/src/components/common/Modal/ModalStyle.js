import styled from "styled-components";

export const Modal = styled.div`
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;
export const ModalWindow = styled.div`
  height: 150px;
  width: 400px;
  background-color: rgba(255, 255, 255);
  position: absolute;
  border-radius: 3%;
  border: 1px solid #ffffff;

  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const ModalTitle = styled.div`
  font-size: 20px;
  margin-top: 10%;
`;
export const YesButton = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: #00aaff;
  margin-top: 30px;
  float: left;
  width: 80px;
  margin-left: ${({ modalSwitch, sendBefore, sendAfter }) =>
    modalSwitch === true
      ? "35%"
      : sendBefore === true
      ? "30%"
      : sendAfter === true
      ? "35%"
      : ""};
  &:hover {
    font-size: 22px;
    font-weight: bolder;
  }
`;
export const NoButton = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-top: 30px;
  margin-right: 25%;
  width: 80px;
  float: right;
  &:hover {
    font-size: 22px;
    font-weight: bolder;
  }
`;

export const modalStyle = {
  Modal,
  ModalWindow,
  ModalTitle,
  YesButton,
  NoButton,
};
