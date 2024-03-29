import React, {useEffect, useState} from "react";
import {useTable} from "react-table";
import {useSelector} from "react-redux";
import axios from "axios";
import {style} from "./AcceptReqStyle"
import {MainStyle} from "../../styles/Globalstyle"
import {useLocation} from "react-router";
import {Row, Cell} from '../admin/EmpTableStyle'
import {ListHead, ListHeader, ListStyle} from "../../styles/ListStyle";

const AcceptReq = () => {
    const {state} = useLocation();
    const accessToken = useSelector((state) => state.ACCESS_TOKEN.accessToken);
    const merge = (state == null) ? null : state._date;
    const reqdata = [];
    const [loadingData, setLoadingData] = useState(true);
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);
    const [data, setData] = useState([]);
    const [reason, setReason] = useState("");
    const handleChangeReason = (e) => {
        setReason(e.target.value);
    }
    const [modal, setModal] = useState(false);
    const [targetReqId, setTargetReqId] = useState('');

    useEffect(() => {
        async function getEmpNo() {
            await axios
                .get("http://localhost:8080/manager/deptno", {
                    params: {'empno': empNo},
                    headers: {'Authorization': accessToken}
                })
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        axios
                            .get("http://localhost:8080/attendance/reqlist",
                                {
                                    params: {'empno': res.data[i].coEmpNo},
                                    headers: {'Authorization': accessToken}
                                }
                            )
                            .then((res2) => {
                                if (res2.data.length != 0) {
                                    for (let j = 0; j < res2.data.length; j++) {
                                        if ((res2.data[j].accept == 0) && (res2.data[j].reject == 0)) {
                                            reqdata.push(res2.data[j]);
                                            setData(reqdata);
                                        }
                                    }
                                }
                            })
                    }
                    setLoadingData(false);
                })
        }

        if (loadingData) {
            getEmpNo();
        }
    }, [])

    for (let i = 0; i < data.length; i++) {
        if (data[i].startFormat1 == null) data[i].startFormat1 = '';
        if (data[i].startFormat2 == null) data[i].startFormat2 = '';
        if (data[i].endFormat1 == null) data[i].endFormat1 = '';
        if (data[i].endFormat2 == null) data[i].endFormat2 = '';
        data[i].startFormat = data[i].startFormat1 + data[i].startFormat2;
        data[i].endFormat = data[i].endFormat1 + data[i].endFormat2;
        data[i].accept = <Button3 type='button' value='승인'
                                  style={{background: '#00aaff', color: 'white', border: '0px', cursor: 'pointer'}}
                                  onClick={() => acceptReq(data[i].reqid, data[i].startFormat, data[i].endFormat, data[i].req)}/>
        data[i].reject = <Button3 type='button' value='반려'
                                  style={{background: 'red', color: 'white', border: '0px', cursor: 'pointer'}}
                                  onClick={() => {
                                      setModal(!modal);
                                      setTargetReqId(data[i].reqid)
                                  }}/>

        if (data[i].rank === 'STAFF') data[i].rank = '사원';
        else if (data[i].rank === 'SENIOR_STAFF') data[i].rank = '주임';
        else if (data[i].rank === 'ASSISTANT_MANAGER') data[i].rank = '대리';
        else if (data[i].rank === 'GENERAL_MANAGER') data[i].rank = '과장';
        else if (data[i].rank === 'DEPUTY_MANAGER') data[i].rank = '차장';
        else if (data[i].rank === 'SUPERVISOR') data[i].rank = '부임';
        else if (data[i].rank === 'EXECUTIVE') data[i].rank = '임원';
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'No',
                Cell: ({row}) => {
                    return row.index + 1
                }
            },
            {
                Header: '이름',
                accessor: 'name',
            },
            {
                Header: '직급',
                accessor: 'rank',
            },
            {
                Header: '근태구분',
                accessor: 'req',
            },
            {
                Header: '신청기간 (시작)',
                accessor: 'startFormat',
            },
            {
                Header: '신청기간 (종료)',
                accessor: 'endFormat',
            },
            {
                Header: '사유',
                accessor: 'comment',
            },
            {
                Header: '',
                accessor: 'accept',
            },
            {
                Header: '',
                accessor: 'reject',
            },
        ],
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})

    async function acceptReq(reqid, start, end, req) {
        if ((req === '오전반차') || (req === '오후반차') || (req === '휴가') || (req === '시간연차')) {
            await axios
                .post("http://localhost:8080/accept/vacation", {
                    'reqid': reqid,
                    'empNo': empNo,
                    'minusHours': req === '오전반차' ? 4 : req === '오후반차' ? 4 : req === '휴가' ? 8 * Math.ceil((Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60 * 24)) : req === '시간연차' ? (Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60) : null
                }, {
                    headers: {'Authorization': accessToken}
                })
                .then((response) => {
                })
        } else {
            await axios
                .post("http://localhost:8080/accept/attendance", {
                    'reqid': reqid,
                    'empNo': empNo,
                    'start': start,
                    'end': end,
                    'temp': end.substring(0, 10),
                }, {
                    headers: {'Authorization': accessToken}
                })
                .then((response) => {
                })
        }
        window.location.reload();
    }

    async function rejectReq() {
        await axios
            .post("http://localhost:8080/attendance/rejectreq", {
                'reqid': targetReqId,
                'reason': reason,
            }, {
                headers: {'Authorization': accessToken}
            })
            .then((response) => {
            })
        window.location.reload();
    }

    return (
        <MainStyle>
            {modal && (
                <Modal>
                    <ModalWindow>
                        <Title>반려 사유</Title>
                        <Reason name="reason" onChange={handleChangeReason}/>
                        <Button1 onClick={() => setModal(!modal)}>취 소</Button1>
                        <Button2 onClick={() => rejectReq()}>확 인</Button2>
                    </ModalWindow>
                </Modal>
            )}
            <ListStyle>
                <Title> 부서원 근태 관리 </Title>
                <table
                    {...getTableProps()}
                    className="MuiTable-root" aria-label="simple table"
                    style={{"marginTop": '10px'}}
                >
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <ListHeader {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <ListHead {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </ListHead>
                            ))}
                        </ListHeader>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <Row {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <Cell
                                            {...cell.getCellProps()}
                                            className="line "
                                            style={{
                                                padding: '5px 20px 5px 20px',
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </Cell>
                                    )
                                })}
                            </Row>
                        )
                    })}
                    </tbody>
                </table>
            </ListStyle>
        </MainStyle>
    )
}
const {Modal, ModalWindow, Title, Reason, Button1, Button2, Button3} = style;
export default AcceptReq;
