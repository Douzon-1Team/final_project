import styled from "styled-components";

export const Title = styled.div`
  width: 40%;
  font-size: 32px;
  font-weight: bolder;
  border-bottom: 2px solid black;
  margin-bottom: 30px;
  padding-bottom: 10px;
  margin-left: 30%;
  text-align: center;
`;
export const Container = styled.div`
  height: fit-content;
  float: left;
  width: 900px;
  margin-left: 200px;
  margin-top: 50px;
`;
export const LeaveSort = styled.div`
  border-top: 2px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 50px;
`;
export const LeaveTerm = styled.div`
  display: ${({sortNum}) => (sortNum === 0 ? "none" : "")};
  border-top: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 50px;
`;
export const LeaveTime = styled.div`
  display: ${({sortNum}) => (sortNum === 0 ? "none" : "")};
  border-top: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 50px;
`;
export const LeaveName = styled.div`
  border-top: 1px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 50px;
`;
export const LeaveReason = styled.div`
  border-top: 1px solid black;
  border-bottom: 2px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 220px;
`;
export const SortTag = styled.div`
  margin-top: 13px;
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const TermTag = styled.div`
  margin-top: 13px;
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const TimeTag = styled.div`
  margin-top: 13px;
  text-align: center;
  width: 150px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const NameTag = styled.div`
  margin-top: 13px;
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
  margin-top: 90px;
`;
export const SortContent = styled.div`
  margin-top: 13px;
  float: left;
`;
export const TermContent = styled.div`
  margin-top: 13px;
  margin-left: 10px;
  float: left;
`;
export const TimeContent = styled.div`
  margin-top: 13px;
  margin-left: 10px;
  float: left;
`;
export const NameContent = styled.div`
  margin-top: 13px;
  margin-left: 10px;
  float: left;
  font-weight: bolder;
  font-size: 17px;
`;
export const ReasonContent = styled.input`
  margin-left: 10px;
  margin-top: 20px;
  height: 170px;
  width: 620px;
`;
export const ButtonBox = styled.div`
  margin-top: 20px;
  width: fit-content;
`;
export const Button2_1 = styled.button`
  background-color: ${({avail}) => (avail === true ? "#00aaff" : "gray")};
  margin-left: 350px;
  border: 0px;
  cursor: ${({avail}) => (avail === true ? "pointer" : "")};
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
export const ButtonA = styled.button`
  background-color: ${({sortNum}) => (sortNum === 1 ? "#00aaff" : "")};
  color: ${({sortNum}) => (sortNum === 1 ? "#ffffff" : "")};
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
  background-color: ${({sortNum}) => (sortNum === 2 ? "#00aaff" : "")};
  color: ${({sortNum}) => (sortNum === 2 ? "#ffffff" : "")};
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
  background-color: ${({sortNum}) => (sortNum === 3 ? "#00aaff" : "")};
  color: ${({sortNum}) => (sortNum === 3 ? "#ffffff" : "")};
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
  background-color: ${({sortNum}) => (sortNum === 4 ? "#00aaff" : "")};
  color: ${({sortNum}) => (sortNum === 4 ? "#ffffff" : "")};
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
export const TermSelect = styled.div`
  input {
    width: 130px;
    border: 1px solid black;
    border-radius: 2px;
    background-color: #eaeaea;
    cursor: pointer;
    font-weight: bolder;
    font-size: 15px;
  }

  float: left;
  margin-right: 5px;
`;
export const TimeSelect1 = styled.div`
  input {
    border: 1px solid black;
    border-radius: 2px;
    width: 70px;
    cursor: pointer;
    background-color: ${({pointerAble1}) => (pointerAble1 === true ? "#eaeaea" : "none")};
    pointer-events: ${({pointerAble1}) => (pointerAble1 === true ? "" : "none")};
    border: ${({pointerAble1}) => (pointerAble1 === true ? "" : "0px")};
    font-weight: bolder;
    font-size: 15px;
  }

  float: left;
  margin-right: 5px;
`;
export const TimeSelect2 = styled.div`
  input {
    width: 70px;
    border: 1px solid black;
    border-radius: 2px;
    cursor: pointer;
    background-color: ${({pointerAble2}) => (pointerAble2 === true ? "#eaeaea" : "none")};
    pointer-events: ${({pointerAble2}) => (pointerAble2 === true ? "" : "none")};
    border: ${({pointerAble2}) => (pointerAble2 === true ? "" : "0px")};
    font-weight: bolder;
    font-size: 15px;
  }

  float: left;
  margin-right: 5px;
`;
export const Text1 = styled.div`
  float: left;
  padding-top: 2px;
  padding-right: 10px;
`;
export const HalfLeaveSet = styled.div`
  display: ${({sortNum}) =>
    sortNum === 2 || sortNum === 3 || sortNum === 4 ? "none" : "block"};
  width: 380px;
  height: 30px;
`;
export const Div1 = styled.div`
  margin-bottom: 10px;
  width: fit-content;
  margin-left: 70%;
`;
export const Hours = styled.div`
  font-weight: bolder;
  display: inline;
  color: #00aaff;
`;
export const UseInfo = styled.div`
  width:fit-content;
  float:left;
  margin-top:13px;
  margin-left:${({avail}) => (avail === true ? "225px" : "220px")};
  color: ${({avail}) => (avail === true ? "black" : "red")};
  font-weight: ${({avail}) => (avail === true ? "" : "bolder")};
`;
export const UseHour = styled.div`
  color: red;
  font-weight: bolder;
  display:inline;
`;
export const style = {
    Title,
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
    TimeSelect1,
    TimeSelect2,
    Text1,
    HalfLeaveSet,
    Div1,
    Hours,
    UseInfo,
    UseHour,
};
