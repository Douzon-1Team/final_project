import React, {useEffect, useState} from "react";
import {style} from "./AttendanceReqStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/esm/locale";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {modalStyle} from "../common/Modal/ModalStyle";
import axios from "axios";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {MainStyle} from "../../styles/Globalstyle"
import {BsArrowReturnRight} from "react-icons/bs";
import {LeaveReqSuccess} from "../common/alert/alert";

export const AttendanceReq = () => {
    const {state} = useLocation();
    const selectedDate = (state == null) ? null : state[1]._date;
    const [sortNum, setSortNum] = useState((state == null) ? 0 : state[0] === '지각' ? 1 : state[0] === '결근' ? 3 : state[0] === '출근미등록' ? 4 : state[0] === '퇴근미등록' ? 5 : '');
    const [statusColor, setStatusColor] = useState((state !== null));
    const [acceptShow, setAcceptShow] = useState((state !== null));
    const [status, setStatus] = useState(state == null ? "수정할 데이터 없음" : state[0]);
    const [req, setReq] = useState(state == null ? "" : state[0]);
    const accessToken = useSelector((state) => state.ACCESS_TOKEN.accessToken);
    const empName = useSelector((state) => state.EMP_INFO.empInfo[1]);
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);
    const [loadingData, setLoadingData] = useState(true);
    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(18);

    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:8080/vacation/data", {
                    params: {'empNo': empNo},
                    headers: {'Authorization': accessToken}
                })
                .then((res) => {
                    setLoadingData(false);
                    if (res.data[0].flex === 0) {
                        setStartTime(res.data[0].workStart.substr(0, 2));
                        setEndTime(res.data[0].workEnd.substr(0, 2));
                    } else if (res.data[0].flex === 1) {
                        setStartTime(res.data[0].workStartf.substr(0, 2));
                        setEndTime(res.data[0].workEndf.substr(0, 2));
                    }
                })
        }

        if (loadingData) {
            getData();
        }
    }, [])

    let navigate = useNavigate();

    const f1 = () => {
        tempset();
        axios
            .post("/attendance/req", {
                empNo: empNo,
                req: req,
                startFormat: startFormat2,
                endFormat: endFormat,
                comment: comment,
            }, {
                headers: {'Authorization': accessToken}
            })
            .then((response) => {
            })
        LeaveReqSuccess();
        navigate("/main");
    };
    const today = new Date();
    const [startDate, setStartDate] = useState(state == null ? today : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), startTime, 0, 0));
    const [endDate, setEndDate] = useState(state == null ? today : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), endTime, 0, 0));

    const start = dayjs(startDate);
    const end = dayjs(endDate)
    let startFormat;
    startFormat = start.format("YYYY-MM-DD");

    let startFormat2;
    startFormat2 = start.format("YYYY-MM-DD HH:00:00");
    let endFormat;
    endFormat = end.format("YYYY-MM-DD HH:00:00");
    const [loadingDate, setLoadingDate] = useState(true);
    const [attstatid, setAttstatid] = useState(null);

    useEffect(() => {
        async function getDate() {
            await axios
                .get("http://localhost:8080/attendance/gettargetdate", {
                    params: {'empNo': empNo, 'date': startFormat},
                    headers: {'Authorization': accessToken}
                })
                .then((res) => {
                    console.log("++", res.data);
                    setAttstatid(res.data[0].attstatid);
                    if (((res.data[0].etc === "지각") || (res.data[0].etc === "결근") || (res.data[0].etc === "출근미등록") || (res.data[0].etc === "퇴근미등록")) && (req === res.data[0].etc)) {
                        if (res.data[0].agree === 1) {
                            setStatusColor(false);
                            setStatus("근태이상 (처리됨)");
                        } else {
                            setStatusColor(true);
                            setStatus("근태이상 (" + req + ")");
                        }
                    } else {
                        setStatus("수정할 데이터 없음")
                        setStatusColor(false);
                    }
                })
        }

        if (loadingDate) {
            getDate();
        }
    }, [startFormat, req])


    async function acceptAttendance() {
        await axios
            .post("http://localhost:8080/attendance/acceptatt", {
                'attstatid': attstatid,
                'empNo': empNo,
            }, {
                headers: {'Authorization': accessToken}
            })
            .then((res) => {
                setStatus("근태이상 (처리됨)");
                setStatusColor(false);
            })
    }

    function onSet(para) {
        if (para === 1) {
            setReq("지각");
        } else if (para === 3) {
            setReq("결근");
        } else if (para === 4) {
            setReq("출근미등록");
        } else if (para === 5) {
            setReq("퇴근미등록");
        }

        if (sortNum === para) {
            setSortNum(0);
            setAcceptShow(false);
            setReq("");
        } else {
            setLoadingDate(true);
            setSortNum(para);
            setAcceptShow(true);
        }
    }

    function tempset() {
        setStartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime, 0))
        setEndDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime, 0))
    }

    const [comment, setComment] = useState("");
    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    return (
        <MainStyle>
            <Container>
                <Title> 근태조정 신청서 </Title>
                <LeaveSort>
                    <SortTag>근태구분</SortTag>
                    <SortContent>
                        <ButtonA onClick={() => onSet(1)} sortNum={sortNum}>
                            지각
                        </ButtonA>
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
                                    setEndDate(date);
                                }}
                                maxDate={today}
                            />
                        </TermSelect>
                    </TermContent>
                </LeaveTerm>
                {/* ------------------------- */}
                <AttendanceInfo acceptShow={acceptShow}>
                    <InfoCon>
                        <Text1> <BsArrowReturnRight/> 상태 : </Text1>
                        <ConditionInfo statusColor={statusColor}>{status}</ConditionInfo>
                        <Text1> 본인 확인 : </Text1>
                        <AcceptButton statusColor={statusColor} onClick={() => acceptAttendance()}>확 인</AcceptButton>
                    </InfoCon>
                </AttendanceInfo>
                {/* ------------------------- */}
                <LeaveName>
                    <NameTag>대상자</NameTag>
                    <NameContent>{empName}</NameContent>
                </LeaveName>
                {/* ------------------------- */}
                <LeaveReason>
                    <ReasonTag>사 유</ReasonTag>
                    <ReasonContent name="comment" onChange={handleChangeComment}/>
                </LeaveReason>
                {/* ------------------------- */}
                <ButtonBox>
                    <Button2_1 statusColor={statusColor} onClick={() => f1()}>신 청</Button2_1>
                    <Button2_2 onClick={() => navigate("/main")}>취 소</Button2_2>
                </ButtonBox>
            </Container>
        </MainStyle>
    );
};

const {
    Container,
    Title,
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
} = style;

const {Modal, ModalWindow, ModalTitle, YesButton, NoButton} = modalStyle;

export default AttendanceReq;
