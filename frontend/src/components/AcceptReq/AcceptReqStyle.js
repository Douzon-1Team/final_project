import styled from "styled-components"

export const Modal = styled.div`
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;
export const ModalWindow = styled.div`
  height: 300px;
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
export const Title = styled.div`
  width: 30%;
  font-size: 32px;
  font-weight: bolder;
  border-bottom: 2px solid black;
  margin: auto;
  padding-bottom: 10px;
  text-align: center;
`;
export const Reason = styled.input`
  border: 1px solid black;
  height: 60%;
  width: 90%;
  margin-left: 1%;
  margin-top: 20px;
  margin-bottom: 3%;
`;
export const Button1 = styled.button`
  cursor: pointer;
  border-radius: 10px;
  border: 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;
export const Button2 = styled.button`
  cursor: pointer;
`;

export const Button3 = styled.input`
  border-radius: 10px;
  border: 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const style = {
    Modal, ModalWindow, Title, Reason, Button1, Button2, Button3
}
