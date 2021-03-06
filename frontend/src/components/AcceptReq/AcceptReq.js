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
        data[i].accept = <Button3 type='button' value='??????'
                                  style={{background: '#00aaff', color: 'white', border: '0px', cursor: 'pointer'}}
                                  onClick={() => acceptReq(data[i].reqid, data[i].startFormat, data[i].endFormat, data[i].req)}/>
        data[i].reject = <Button3 type='button' value='??????'
                                  style={{background: 'red', color: 'white', border: '0px', cursor: 'pointer'}}
                                  onClick={() => {
                                      setModal(!modal);
                                      setTargetReqId(data[i].reqid)
                                  }}/>

        if (data[i].rank === 'STAFF') data[i].rank = '??????';
        else if (data[i].rank === 'SENIOR_STAFF') data[i].rank = '??????';
        else if (data[i].rank === 'ASSISTANT_MANAGER') data[i].rank = '??????';
        else if (data[i].rank === 'GENERAL_MANAGER') data[i].rank = '??????';
        else if (data[i].rank === 'DEPUTY_MANAGER') data[i].rank = '??????';
        else if (data[i].rank === 'SUPERVISOR') data[i].rank = '??????';
        else if (data[i].rank === 'EXECUTIVE') data[i].rank = '??????';
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
                Header: '??????',
                accessor: 'name',
            },
            {
                Header: '??????',
                accessor: 'rank',
            },
            {
                Header: '????????????',
                accessor: 'req',
            },
            {
                Header: '???????????? (??????)',
                accessor: 'startFormat',
            },
            {
                Header: '???????????? (??????)',
                accessor: 'endFormat',
            },
            {
                Header: '??????',
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
        if ((req === '????????????') || (req === '????????????') || (req === '??????') || (req === '????????????')) {
            await axios
                .post("http://localhost:8080/accept/vacation", {
                    'reqid': reqid,
                    'empNo': empNo,
                    'minusHours': req === '????????????' ? 4 : req === '????????????' ? 4 : req === '??????' ? 8 * Math.ceil((Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60 * 24)) : req === '????????????' ? (Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60) : null
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
                        <Title>?????? ??????</Title>
                        <Reason name="reason" onChange={handleChangeReason}/>
                        <Button1 onClick={() => setModal(!modal)}>??? ???</Button1>
                        <Button2 onClick={() => rejectReq()}>??? ???</Button2>
                    </ModalWindow>
                </Modal>
            )}
            <ListStyle>
                <Title> ????????? ?????? ?????? </Title>
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
