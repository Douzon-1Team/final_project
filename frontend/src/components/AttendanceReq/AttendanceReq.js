import React, { useState } from "react";
import { style } from "./AttendanceReqStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { modalStyle } from "../common/Modal/ModalStyle";
import axios from "axios";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import {MainStyle} from "../../styles/Globalstyle"

export const AttendanceReq = () => {
  const { state } = useLocation(); // TODO : 달력으로부터 넘어온 데이터
  // TODO : state데이터가 존재하지 않으면 null데이터 출력 -> state에서 넘어온 데이터 있으면 값 넣어주면 됨
  const empName = useSelector( (state) => state.EMP_INFO.empInfo[1] );
  const empNo=useSelector( (state) => state.EMP_INFO.empInfo[0] );
  // const [empNo, setEmpNo] = useState(empName);
  // -------------------------------------------
  const [sortNum, setSortNum] = useState(0); // 근태구분
  const today = new Date();
  const [startDate, setStartDate] = useState(today); // 휴가&반차 시작일
  const [endDate, setEndDate] = useState(today); // 휴가&반차 종료일
  const [timeValid, setTimeValid] = useState(true);
  // -------------------------------------------
  const [modalSwitch, setModalSwitch] = useState(false);
  const [sendBefore, setSendBefore] = useState(false);
  const [sendAfter, setSendAfter] = useState(false);
  const [req, setReq] = useState("");
  // -------------------------------------------
  function onSet(para) {
    if (para === 1) setReq("지각");
    else if (para === 2) setReq("조퇴");
    else if (para == 3) setReq("결근");
    else if (para == 4) setReq("출근미등록");
    else if (para == 5) setReq("퇴근미등록");

    if (sortNum === para) {
      setSortNum(0);
    } else {
      setSortNum(para);
      if (para === 3) setTimeValid(false);
      else setTimeValid(true);
    }
  }
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  let startFormat, endFormat;
  startFormat = start.format("YYYY-MM-DD HH:mm:00");
  endFormat = end.format("YYYY-MM-DD HH:mm:00");
  // ----------------------------------------------------------
  const [comment, setComment] = useState("");
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------
  function sendData(sortNum) {
    if (sortNum === 0) {
      setModalSwitch(true);
    } else {
      setSendBefore(true);
    }
  }
  // ---------------------------------------------------------------------------------
  let navigate = useNavigate();
  const f1 = () => {
    axios
        .post("/vacationreq", {
          empNo: empNo,
          req: req,
          startFormat: startFormat,
          endFormat: endFormat,
          comment: comment,
        })
        .then((response) => {
          console.log("전달완료 무야호");
        })
        .catch((error) => {
          console.log(error, "*******************************");
        });
  };
  function completed() {
    f1();
    navigate("/main");
  }
  // ----------------------------------------------------------

  return (
      <MainStyle>
        <Container>
          {modalSwitch && (
              <Modal>
                <ModalWindow>
                  <ModalTitle>근태 구분을 선택해주세요</ModalTitle>
                  <YesButton
                      onClick={() => setModalSwitch(false)}
                      modalSwitch={modalSwitch}
                  >
                    확 인
                  </YesButton>
                </ModalWindow>
              </Modal>
          )}
          {sendBefore && (
              <Modal>
                <ModalWindow>
                  <ModalTitle>신청서를 제출하시겠습니까?</ModalTitle>
                  <YesButton
                      onClick={() => {setSendAfter(true); setSendBefore(false)}}
                      sendBefore={sendBefore}
                  >
                    확 인
                  </YesButton>
                  <NoButton onClick={() => setSendBefore(false)}>취 소</NoButton>
                </ModalWindow>
              </Modal>
          )}
          {sendAfter && (
              <Modal>
                <ModalWindow>
                  <ModalTitle>성공적으로 신청되었습니다.</ModalTitle>
                  <YesButton onClick={() => completed()}>
                    확 인
                  </YesButton>
                </ModalWindow>
              </Modal>
          )}
          <LeaveSort>
            <SortTag>근태구분</SortTag>
            <SortContent>
              <ButtonA onClick={() => onSet(1)} sortNum={sortNum}>
                지각
              </ButtonA>
              <ButtonB onClick={() => onSet(2)} sortNum={sortNum}>
                조퇴
              </ButtonB>
              <ButtonC onClick={() => onSet(3)} sortNum={sortNum}>
                결근
              </ButtonC>
              <ButtonD onClick={() => onSet(4)} sortNum={sortNum}>
                출근 미등록
              </ButtonD>
              <ButtonE onClick={() => onSet(5)} sortNum={sortNum}>
                퇴근 미등록
              </ButtonE>
            </SortContent>
          </LeaveSort>
          {/* ------------------------- */}
          <LeaveTerm>
            <TermTag>조정기간</TermTag>
            <TermContent>
              <TermSelect>
                <DatePicker
                    sortNum={sortNum}
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                    maxDate={startDate}
                />
              </TermSelect>
            </TermContent>
          </LeaveTerm>
          {/* ------------------------- */}
          <LeaveTime timeValid={timeValid}>
            <TimeTag>조정시간</TimeTag>
            <TimeContent>
              {" "}
              <TimeSelect>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setEndDate(date);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    minTime={new Date().setHours(9, 0, 0, 0)}
                    maxTime={new Date().setHours(18, 0, 0, 0)}
                />
              </TimeSelect>
              <Text1> 부터 </Text1>
              <TimeSelect>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setEndDate(date);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    minTime={new Date().setHours(9, 0, 0, 0)}
                    maxTime={new Date().setHours(18, 0, 0, 0)}
                />
              </TimeSelect>
              <Text1> 까지 </Text1>
            </TimeContent>
          </LeaveTime>
          {/* ------------------------- */}
          <LeaveName>
            <NameTag>대상자</NameTag>
            <NameContent>{empName}</NameContent>
          </LeaveName>
          {/* ------------------------- */}
          <LeaveReason>
            <ReasonTag>사유</ReasonTag>
            <ReasonContent name="comment" onChange={handleChangeComment} />
          </LeaveReason>
          {/* ------------------------- */}
          <ButtonBox>
            <Button2_1 onClick={() => sendData(sortNum)}>신 청</Button2_1>
            <Button2_2 onClick={() => navigate("/main")}>취 소</Button2_2>
          </ButtonBox>
        </Container>
      </MainStyle>
  );
};

const {
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
  ButtonE,
  TermSelect,
  TimeSelect,
  Text1,
} = style;

const { Modal, ModalWindow, ModalTitle, YesButton, NoButton } = modalStyle;

export default AttendanceReq;
