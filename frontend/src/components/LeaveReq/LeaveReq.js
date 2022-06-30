import React, { useState } from "react";
import { style } from "./LeaveReqStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { modalStyle } from "../common/Modal/ModalStyle";
import axios from "axios";
import { useSelector } from "react-redux";

export const LeaveReq = () => {
  const [sortNum, setSortNum] = useState(0); // 휴가구분
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(today); // 휴가&반차 시작일
  const [endDate, setEndDate] = useState(today); // 휴가&반차 종료일

  const [termValid, setTermValid] = useState(false); // 휴가기간
  const [timeValid, setTimeValid] = useState(false); // 신청시간
  // -------------------------------------------
  const [modalSwitch, setModalSwitch] = useState(false);
  const [sendBefore, setSendBefore] = useState(false);
  const [sendAfter, setSendAfter] = useState(false);
  const [req, setReq] = useState("");
  // -------------------------------------------
  function onSet(para) {
    if (para === 1) setReq("휴가");
    else if (para === 2) setReq("오전반차");
    else if (para === 3) setReq("오후반차");
    else setReq("시간연차");

    if (sortNum === para) {
      setSortNum(0);
      setTermValid(false);
      setTimeValid(false);
    } else {
      setSortNum(para);

      if (para !== 4) {
        setTermValid(true);
        setTimeValid(false);
        setStartDate(tomorrow);
        setEndDate(tomorrow);
      } else {
        setTermValid(false);
        setTimeValid(true);
        setStartDate(today);
        setEndDate(today);
      }
    }
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  let startFormat, endFormat;
  if (timeValid) {
    if (startDate.getMinutes() > 30) {
      startDate.setHours(startDate.getHours() + 1, 0, 0, 0);
    } else {
      startDate.setHours(startDate.getHours(), 30, 0, 0);
    }
    startFormat = start.format("YYYY-MM-DD 09:00:00");
    endFormat = end.format("YYYY-MM-DD 18:00:00");
  } else {
    startFormat = start.format("YYYY-MM-DD hh:mm:00");
    endFormat = end.format("YYYY-MM-DD hh:mm:00");
  }

  // ----------------------------------------------------------
  const [comment, setComment] = useState("");
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  // ---------------------------------------------------------------------------------
  const empName = useSelector( (state) => state.EMP_INFO.empInfo[1] );
  const empNo=useSelector( (state) => state.EMP_INFO.empInfo[0] );
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
  const f1 = async () => {
    await axios
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
      <>
        {modalSwitch && (
            <Modal>
              <ModalWindow>
                <ModalTitle>휴가 구분을 선택해주세요</ModalTitle>
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
        <Container>
          <LeaveSort>
            <SortTag>휴가구분</SortTag>
            <SortContent>
              <ButtonA onClick={() => onSet(1)} sortNum={sortNum}>
                휴 가
              </ButtonA>
              <ButtonB onClick={() => onSet(2)} sortNum={sortNum}>
                오전반차
              </ButtonB>
              <ButtonC onClick={() => onSet(3)} sortNum={sortNum}>
                오후반차
              </ButtonC>
              <ButtonD onClick={() => onSet(4)} sortNum={sortNum}>
                시간연차
              </ButtonD>
            </SortContent>
          </LeaveSort>
          {/* ------------------------- */}
          <LeaveTerm termValid={termValid}>
            <TermTag>휴가기간</TermTag>
            <TermContent>
              <TermSelect>
                <DatePicker
                    sortNum={sortNum}
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setEndDate(date);
                    }}
                    minDate={tomorrow}
                />
              </TermSelect>
              <HalfLeaveSet sortNum={sortNum}>
                <Text1> 부터 </Text1>
                <TermSelect>
                  <DatePicker
                      locale={ko}
                      dateFormat="yyyy년 MM월 dd일"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={startDate}
                  />
                </TermSelect>
                <Text1> 까지 </Text1>
              </HalfLeaveSet>
            </TermContent>
          </LeaveTerm>
          {/* ------------------------- */}
          <LeaveTime timeValid={timeValid}>
            <TimeTag>신청시간</TimeTag>
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
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    minTime={startDate}
                    maxTime={new Date().setHours(18, 0, 0, 0)}
                />
              </TimeSelect>
              <Text1> 부터 </Text1>
              <TimeSelect>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    minTime={startDate}
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
      </>
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
  TermSelect,
  TimeSelect,
  Text1,
  HalfLeaveSet,
} = style;

const { Modal, ModalWindow, ModalTitle, YesButton, NoButton } = modalStyle;

export default LeaveReq;
