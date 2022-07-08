import styled from "styled-components"

export const Modal=styled.div`
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;
export const ModalWindow=styled.div`
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
export const Title=styled.div`
  font-weight: bolder;
  font-size: 20px;
  margin-top:15px;
`;
export const Reason=styled.input`
  border:1px solid black;
  height:60%;
  width:90%;
  margin-left:1%;
  margin-top:20px;
  margin-bottom:3%;
`;
export const Button1=styled.button`
    margin-right:5%;
  cursor: pointer;
`;
export const Button2=styled.button`
  cursor: pointer;
`;

export const style={
    Modal, ModalWindow, Title,Reason,Button1,Button2
}
