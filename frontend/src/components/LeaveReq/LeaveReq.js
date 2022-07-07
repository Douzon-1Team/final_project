import React, {useEffect, useState} from "react";
import {style} from "./LeaveReqStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/esm/locale";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {modalStyle} from "../common/Modal/ModalStyle";
import axios from "axios";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";
import st from "react-datepicker";

export const LeaveReq = () => {
    const {state} = useLocation(); // TODO : 달력으로부터 넘어온 날짜데이터
    const selectedDate = (state == null) ? null : state._date;
    const [sortNum, setSortNum] = useState(state == null ? 0 : 1); // 휴가구분
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [startDate, setStartDate] = useState(state == null ? tomorrow : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9, 0, 0)); // 휴가&반차 시작일
    const [endDate, setEndDate] = useState(state == null ? tomorrow : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 18, 0, 0)); // 휴가&반차 종료일
    const [comment, setComment] = useState("");
    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };
    const [pointerAble1, setPointerAble1] = useState(false);
    const [pointerAble2, setPointerAble2] = useState(false);
    // -------------------------------------------
    const [modalSwitch, setModalSwitch] = useState(false);
    const [sendBefore, setSendBefore] = useState(false);
    const [sendAfter, setSendAfter] = useState(false);
    const [req, setReq] = useState("");
    // -------------------------------------------
    const empName = useSelector((state) => state.EMP_INFO.empInfo[1]);
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);
    const [loadingData, setLoadingData] = useState(true);
    const [startTime,setStartTime]=useState(9);
    const [endTime,setEndTime]=useState(18);
    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:8080/getvacationdata", {params: {'empNo': empNo}})
                .then((res) => {
                    console.log(res.data)
                    setLoadingData(false);
                    setStartTime(res.data[0].workStart.substr(0,2));
                    setEndTime(res.data[0].workEnd.substr(0,2));
                })
                .catch((res) => {
                    console.log("수신실패 : ", res);
                })
        }
        if (loadingData) {
            getData();
        }
    }, [])
    // -------------------------------------------
    function onSet(para) {
        if (para === 1) setReq("휴가");
        else if (para === 2) setReq("오전반차");
        else if (para === 3) setReq("오후반차");
        else setReq("시간연차");

        if (sortNum === para) {
            setSortNum(0);
        } else {
            setSortNum(para);
            if (para !== 4) { // 휴가, 반차
                setStartDate(tomorrow);
                setEndDate(tomorrow);
                setPointerAble1(false);
                setPointerAble2(false);
                if (para == 1) {
                    setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime, 0, 0))
                    setEndDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime, 0, 0))
                } else if (para == 2) {
                    setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime, 0, 0))
                    setEndDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime-5, 0, 0))
                } else if (para == 3) {
                    setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime-4, 0, 0))
                    setEndDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime, 0, 0))
                }
            } else { // 시간연차
                if (state == null) {
                    setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 1, 0, 0))
                    setEndDate(new Date(today.getFullYear(), today.getMonth(), today.getDate(), endTime, 0, 0))
                } else {
                    setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1, 0, 0))
                    setEndDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime, 0, 0))
                }
                setPointerAble1(true);
                setPointerAble2(false);
            }
        }
    }
    // ---------------------------------------------------------------------------------
    useEffect(() => {
        if (sortNum == 4) {
            if ((startDate.getFullYear() == today.getFullYear()) && (startDate.getMonth() == today.getMonth()) && (startDate.getDate() == today.getDate())) {
                // 같은 날짜
                setPointerAble1(true);
                setPointerAble2(false);
            } else { // 다른 날짜
                setPointerAble1(true);
                setPointerAble2(true);
            }
        }
    }, [sortNum, startDate])

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    let startFormat, endFormat;
    startFormat = start.format("YYYY-MM-DD HH:mm:0");
    endFormat = end.format("YYYY-MM-DD HH:mm:0");

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
                console.log("전달완료");
            })
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
                            onClick={() => {
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
                <LeaveTerm>
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
                                    if (sortNum == 1) {
                                        setEndDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTime, 0, 0))
                                    } else if (sortNum == 2) {
                                        setEndDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), startTime+4, 0, 0))
                                    } else if (sortNum == 3) {
                                        setEndDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTime, 0, 0))
                                    } else if (sortNum == 4) {
                                        setEndDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTime, 0, 0))
                                    }
                                }}
                                minDate={sortNum == 4 ? today : tomorrow}
                            />
                        </TermSelect>
                        <HalfLeaveSet sortNum={sortNum}>
                            <Text1> 부터 </Text1>
                            <TermSelect>
                                <DatePicker
                                    locale={ko}
                                    dateFormat="yyyy년 MM월 dd일"
                                    selected={endDate}
                                    onChange={(date) => {
                                        setEndDate(date)
                                    }}
                                    minDate={startDate}
                                />
                            </TermSelect>
                            <Text1> 까지 </Text1>
                        </HalfLeaveSet>
                    </TermContent>
                </LeaveTerm>
                {/* ------------------------- */}
                <LeaveTime sortNum={sortNum}>
                    <TimeTag>신청시간</TimeTag>
                    <TimeContent>
                        <TimeSelect1 pointerAble1={pointerAble1}>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setEndDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime, 0, 0));
                                }}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                minTime={new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1, 0)}
                                maxTime={new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime - 1, 0)}
                            />
                        </TimeSelect1>
                        <Text1> 부터 </Text1>
                        <TimeSelect2 pointerAble2={pointerAble2}>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => {
                                    setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime, 0, 0));
                                    setEndDate(date);
                                }}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                minTime={new Date(0, 0, 0, startTime, 0)}
                                maxTime={new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime, 0)}
                            />
                        </TimeSelect2>
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
} = style;

const {Modal, ModalWindow, ModalTitle, YesButton, NoButton} = modalStyle;

export default LeaveReq;
