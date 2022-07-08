import React, {useEffect, useState} from "react";
import {useTable} from "react-table";
import {useSelector} from "react-redux";
import axios from "axios";
import {style} from "./AcceptReqStyle"

const AcceptReq = () => {
    const reqdata = [];
    const [loadingData, setLoadingData] = useState(true);
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);
    const [data, setData] = useState([]);
    const [reason, setReason] = useState("");
    const handleChangeReason = (e) => {
        setReason(e.target.value);
    }
    const [minusHours, setMinusHours] = useState(0);
    const [modal, setModal] = useState(false);
    const [targetReqId, setTargetReqId] = useState('');

    useEffect(() => {
        async function getEmpNo() {
            await axios
                .get("http://localhost:8080/deptno", {params: {'empno': empNo}})
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        axios
                            .get("http://localhost:8080/reqlist", {params: {'empno': res.data[i].coEmpNo}})
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
        console.log(reqdata);
    }, [])

    for (let i = 0; i < data.length; i++) {
        if(data[i].startFormat1==null) data[i].startFormat1='';
        if(data[i].startFormat2==null) data[i].startFormat2='';
        if(data[i].endFormat1==null) data[i].endFormat1='';
        if(data[i].endFormat2==null) data[i].endFormat2='';
        data[i].startFormat=data[i].startFormat1+data[i].startFormat2;
        data[i].endFormat=data[i].endFormat1+data[i].endFormat2;
        data[i].accept = <input type='button' value='승인'
                                style={{background: '#00aaff', color: 'white', border: '0px', cursor: 'pointer'}}
                                onClick={() => acceptReq(data[i].reqid, data[i].startFormat, data[i].endFormat, data[i].req)}/>
        data[i].reject = <input type='button' value='반려'
                                style={{background: 'red', color: 'white', border: '0px', cursor: 'pointer'}}
                                onClick={() => {
                                    setModal(!modal);
                                    setTargetReqId(data[i].reqid)
                                }}/>
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

    function modifySet(start, end, req) {
        if ((req === '오전반차') || (req === '오후반차')) {
            setMinusHours(4);
        } else if (req === '휴가') {
            setMinusHours(8 * ((Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60 * 24) + 1));
        } else { // 시간연차
            setMinusHours((Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60));
        }
    }

    async function acceptReq(reqid, start, end, req) {
        if((req=='오전반차')||(req=='오후반차')||(req=='휴가')||(req=='시간연차')){
            await axios
                .post("http://localhost:8080/acceptreq", {
                    'reqid': reqid,
                    'empNo': empNo,
                    'minusHours': req == '오전반차' ? 4 : req == '오후반차' ? 4 : req == '휴가' ? 8 * ((Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60 * 24) + 1) : req == '시간연차' ? (Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60) : null
                })
                .then((response) => {
                    console.log("*신청서 승인됨");
                })
        }else{

        }
        window.location.reload();
    }

    async function rejectReq() {
        await axios
            .post("http://localhost:8080/rejectreq", {
                'reqid': targetReqId,
                'reason': reason,
            })
            .then((response) => {
                console.log("*신청서 반려됨");
            })
        window.location.reload();
        setModal(!modal)
    }

    // -----------------------------------
    return (
        <>
            {modal && (
                <Modal>
                    <ModalWindow>
                        <Title>반려 사유</Title>
                        <Reason name="reason" onChange={handleChangeReason}/>
                        <Button1 onClick={() => setModal(!modal)}>취소</Button1>
                        <Button2 onClick={() => rejectReq()}>확인</Button2>
                    </ModalWindow>
                </Modal>
            )}
            <table {...getTableProps()}
                   style={{
                       textAlign: 'center',
                   }}
            >
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    padding: '5px 20px 5px 20px',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '5px 20px 5px 20px',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}
const {Modal, ModalWindow, Title, Reason, Button1, Button2} = style;
export default AcceptReq;
