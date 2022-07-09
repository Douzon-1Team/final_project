import styled from "styled-components";

export const DeleteButton = styled.button`
  border: 0px;
  cursor: pointer;
  background-color: red;
  color: #ffffff;
  border-radius: 3px;
  height: 25px;
  width: 60px;
  font-size: 14px;
  font-weight: bolder;
  box-shadow: 3px 3px 3px gray;
  margin-top: 40px;
  float: left;
  margin-left: 10px;
`;

export const Title = styled.div`
  width: 25%;
  font-size: 32px;
  font-weight: bolder;
  border-bottom: 2px solid black;
  margin-bottom: 35px;
  margin-left: 30%;
  padding-bottom: 10px;
  text-align: center;
`;

export const Container = styled.div`
  width: fit-content;
  margin-left: 15px;
  padding-bottom: 20px;
`;

export const style = {
    DeleteButton, Title, Container,
}
