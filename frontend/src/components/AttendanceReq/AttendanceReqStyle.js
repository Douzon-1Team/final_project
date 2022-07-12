import styled from "styled-components";

export const Container = styled.div`
  height: fit-content;
  float: left;
  width: 900px;
  margin-left: 200px;
  margin-top: 50px;
`;
export const Title = styled.div`
  width: 40%;
  font-size: 32px;
  font-weight: bolder;
  border-bottom: 2px solid black;
  margin-bottom: 40px;
  padding-bottom: 10px;
  margin-left: 30%;
  text-align: center;
`;
export const LeaveSort = styled.div`
  border-top: 2px solid black;
  border-left: 0px;
  border-right: 0px;
  height: 50px;
`;
export const LeaveTerm = styled.div`
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
  margin-left: 350px;
  border: 0px;
  cursor: ${({statusColor}) => (statusColor === true ? "pointer" : "no-drop")};
  background-color: ${({statusColor}) => (statusColor === true ? "#00aaff" : "gray")};
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
  width: 90px;
  height: 25px;
  font-size: 13px;
  font-weight: bolder;
`;
export const ButtonE = styled.button`
  background-color: ${({sortNum}) => (sortNum === 5 ? "#00aaff" : "")};
  color: ${({sortNum}) => (sortNum === 5 ? "#ffffff" : "")};
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  margin-left: 10px;
  border: 0px;
  width: 90px;
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

  margin-right: 5px;
  float: left;
`;
export const AttendanceInfo = styled.div`
  display: ${({acceptShow}) => (acceptShow === true ? "" : "none")};
  border-top: 1px solid black;
  height: 50px;
  font-size: 17px;
`;
export const InfoCon = styled.div`
  margin-left: 25%;
  height: 50px;
  width: 600px;
`;
export const ConditionInfo = styled.div`
  margin-top: 13px;
  float: left;
  font-size: 17px;
  margin-right: 20px;
  text-align: center;
  font-weight: bolder;
  color: ${({statusColor}) => (statusColor === true ? "red" : "")};
`;
export const AcceptButton = styled.div`
  float: left;
  margin-top: 13px;
  margin-left: 10px;
  width: 70px;
  height: 22px;
  cursor: ${({statusColor}) => (statusColor === true ? "pointer" : "no-drop")};
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  background-color: ${({statusColor}) => (statusColor === true ? "#00aaff" : "gray")};
  color: ${({statusColor}) => (statusColor === true ? "#ffffff" : "#ffffff")};
  text-align: center;
`;
export const Text1 = styled.div`
  float: left;
  margin-top: 13px;
  margin-right: 10px;
`;
export const style = {
    Title,
    Container,
    LeaveSort,
    LeaveTerm,
    LeaveName,
    LeaveReason,
    SortTag,
    TermTag,
    NameTag,
    ReasonTag,
    SortContent,
    TermContent,
    NameContent,
    ReasonContent,
    ButtonBox,
    Button2_1,
    Button2_2,
    ButtonA,
    ButtonC,
    ButtonD,
    ButtonE,
    TermSelect,
    AttendanceInfo,
    ConditionInfo,
    AcceptButton,
    Text1,
    InfoCon,
};
