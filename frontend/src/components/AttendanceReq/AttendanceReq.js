import React, {useEffect, useState} from "react";
import {style} from "./AttendanceReqStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/esm/locale";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {modalStyle} from "../common/Modal/ModalStyle";
import axios from "axios";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import {MainStyle} from "../../styles/Globalstyle"

export const AttendanceReq = () => {
    const {state} = useLocation(); // TODO : 달력으로부터 넘어온 데이터
    const selectedDate = (state == null) ? null : state._date;
    const empName = useSelector((state) => state.EMP_INFO.empInfo[1]);
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);
    const [loadingData, setLoadingData] = useState(true);
    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(18);
    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:8080/getvacationdata", {params: {'empNo': empNo}})
                .then((res) => {
                    console.log(res.data)
                    setLoadingData(false);
                    setStartTime(res.data[0].workStart.substr(0, 2));
                    setEndTime(res.data[0].workEnd.substr(0, 2));
                })
                .catch((res) => {
                    console.log("수신실패 : ", res);
                })
        }

        if (loadingData) {
            getData();
        }
    }, [])
    const f1 = () => {
        axios
            .post("/vacationreq2", {
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
    // -------------------------------------------
    const [sortNum, setSortNum] = useState(0); // 근태구분
    const today = new Date();
    const [startDate, setStartDate] = useState(state == null ? today : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), startTime, 0, 0)); // 근태조정 시작 시간
    const [endDate, setEndDate] = useState(state == null ? today : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), endTime, 0, 0)); // 근태조정 시작 시간
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
        }
    }

    function tempset() {
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime, 0))
        setEndDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime, 0))
    }

    function completed() {
        f1();
        navigate("/main");
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
    function sendData(sortNum) {
        if (sortNum === 0) {
            setModalSwitch(true);
        } else {
            setSendBefore(true);
        }
    }

    // ---------------------------------------------------------------------------------
    let navigate = useNavigate();
    // ----------------------------------------------------------

    return (
        <>
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
                                onClick={() => {
                                    tempset();
                                    setSendAfter(true);
                                    setSendBefore(false)
                                }}
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
                    <TermTag>조정일자</TermTag>
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
                <LeaveName>
                    <NameTag>대상자</NameTag>
                    <NameContent>{empName}</NameContent>
                </LeaveName>
                {/* ------------------------- */}
                <LeaveReason>
                    <ReasonTag>사유</ReasonTag>
                    <ReasonContent name="comment" onChange={handleChangeComment}/>
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
    ButtonB,
    ButtonC,
    ButtonD,
    ButtonE,
    TermSelect,
} = style;

const {Modal, ModalWindow, ModalTitle, YesButton, NoButton} = modalStyle;

export default AttendanceReq;
