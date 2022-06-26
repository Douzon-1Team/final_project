import styled from "styled-components";
export const Container = styled.div`
  height: fit-content;
  width: 800px;
  float: left;
  margin-left: 1vw;
  margin-top: 1vh;
`;
// ---------------------------------------------
export const LeaveSort = styled.div`
  border-top: 2px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 40px;
`;
export const LeaveTerm = styled.div`
  display: ${({ termValid }) => (termValid === true ? "block" : "none")};
  border-top: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 40px;
`;
export const LeaveTime = styled.div`
  display: ${({ timeValid }) => (timeValid === true ? "block" : "none")};
  border-top: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 40px;
`;
export const LeaveName = styled.div`
  border-top: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 40px;
`;
export const LeaveReason = styled.div`
  border-top: 1px solid black;
  border-bottom: 2px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 170px;
`;
// ---------------------------------------------
export const SortTag = styled.div`
  margin-top: 5px;
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const TermTag = styled.div`
  margin-top: 5px;
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const TimeTag = styled.div`
  margin-top: 5px;
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const NameTag = styled.div`
  margin-top: 5px;
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const ReasonTag = styled.div`
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
  margin-top: 70px;
`;
// ---------------------------------------------
export const SortContent = styled.div`
  margin-top: 7px;
  float: left;
`;
export const TermContent = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  float: left;
`;
export const TimeContent = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  float: left;
`;
export const NameContent = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const ReasonContent = styled.input`
  margin-left: 10px;
  margin-top: 5px;
  height: 150px;
  width: 620px;
`;
// ---------------------------------------------
export const ButtonBox = styled.div`
  margin-top: 10px;
  width: fit-content;
`;
export const Button2_1 = styled.button`
  margin-left: 300px;
  border: 0px;
  cursor: pointer;
  background-color: #00aaff;
  color: #ffffff;
  border-radius: 30px;
  height: 30px;
  width: 80px;
  font-size: 15px;
  box-shadow: 5px 5px 5px gray;
`;
export const Button2_2 = styled.button`
  border: 0px;
  cursor: pointer;
  background-color: red;
  color: #ffffff;
  border-radius: 30px;
  radius: 5px;
  margin-left: 30px;
  height: 30px;
  width: 80px;
  font-size: 15px;
  box-shadow: 5px 5px 5px gray;
`;
// ---------------------------------------------
export const ButtonA = styled.button`
  background-color: ${({ sortNum }) => (sortNum === 1 ? "#00aaff" : "")};
  color: ${({ sortNum }) => (sortNum === 1 ? "#ffffff" : "")};
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  margin-left: 10px;
  border: 0px;
  width: 70px;
  height: 25px;
  font-size: 13px;
  font-weight: bolder;
`;
export const ButtonB = styled.button`
  background-color: ${({ sortNum }) => (sortNum === 2 ? "#00aaff" : "")};
  color: ${({ sortNum }) => (sortNum === 2 ? "#ffffff" : "")};
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  margin-left: 10px;
  border: 0px;
  width: 70px;
  height: 25px;
  font-size: 13px;
  font-weight: bolder;
`;
export const ButtonC = styled.button`
  background-color: ${({ sortNum }) => (sortNum === 3 ? "#00aaff" : "")};
  color: ${({ sortNum }) => (sortNum === 3 ? "#ffffff" : "")};
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  margin-left: 10px;
  border: 0px;
  width: 70px;
  height: 25px;
  font-size: 13px;
  font-weight: bolder;
`;
export const ButtonD = styled.button`
  background-color: ${({ sortNum }) => (sortNum === 4 ? "#00aaff" : "")};
  color: ${({ sortNum }) => (sortNum === 4 ? "#ffffff" : "")};
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  margin-left: 10px;
  border: 0px;
  width: 70px;
  height: 25px;
  font-size: 13px;
  font-weight: bolder;
`;
// ---------------------------------------------
export const TermSelect = styled.div`
  input {
    width: 120px;
    border: 1px solid black;
    border-radius: 2px;
    background-color: #eaeaea;
    cursor: pointer;
  }
  float: left;
`;
export const TimeSelect = styled.div`
  input {
    width: 120px;
    border: 1px solid black;
    border-radius: 2px;
    background-color: #eaeaea;
    cursor: pointer;
  }
  float: left;
`;
export const Text1 = styled.div`
  float: left;
  padding-top: 3px;
  padding-right: 10px;
  padding-left: 5px;
`;
export const HalfLeaveSet = styled.div`
  display: ${({ sortNum }) =>
    sortNum === 2 || sortNum === 3 ? "none" : "block"};
  height: fit-content;
  width: 350px;
  height: 30px;
`;
// ---------------------------------------------

// ---------------------------------------------
export const style = {
  Container,
  LeaveSort,
  LeaveTerm,
  LeaveTime,
  LeaveName,
  LeaveReason,
  SortTag,
  TermTag,
  TimeTag,
  NameTag,
  ReasonTag,
  SortContent,
  TermContent,
  TimeContent,
  NameContent,
  ReasonContent,
  ButtonBox,
  Button2_1,
  Button2_2,
  ButtonA,
  ButtonB,
  ButtonC,
  ButtonD,
  TermSelect,
  TimeSelect,
  Text1,
  HalfLeaveSet,
};
