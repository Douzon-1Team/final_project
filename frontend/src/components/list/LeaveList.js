import React, {useCallback, useEffect, useState} from 'react';
import {useTable} from 'react-table';
import {useSelector} from "react-redux";
import axios from "axios";
import Layout from "../common/Layout";
import {style} from "./ListStyle";
import {modalStyle} from "../common/Modal/ModalStyle"
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {MainStyle} from "../../styles/Globalstyle"

let grossHours = 0;

const LeaveList = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [checkedReqId, setCheckedReqId] = useState([]);
    const today = dayjs(new Date());
    let todayFormat = today.format("YYYY-MM-DD hh:mm:00");

    function onClickChecked(reqid, start, end, accept, req) {
        let hours = 0;
        if ((start >= todayFormat) && (accept == 1)) {
            if ((req === '오전반차') || (req === '오후반차')) {
                hours = 4;
            } else if (req === '휴가') {
                hours = 8 * ((Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60 * 24) + 1);
            } else {
                hours = (Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60);
            }
        }
        if (checkedReqId.includes(reqid)) {
            checkedReqId.splice(checkedReqId.indexOf(reqid), 1);
            grossHours -= hours;
        } else {
            checkedReqId.push(reqid);
            grossHours += hours;
        }
        setCheckedReqId(checkedReqId);
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].vacationstart >= todayFormat) {
            data[i].check = <input id={i} type="checkbox" name="checkbox"
                                   onClick={() => onClickChecked(data[i].reqid, data[i].vacationstart, data[i].vacationend, data[i].accept, data[i].req)}/>
        }
    }
    const columns = React.useMemo(
        () => [
            {
                Header: '',
                accessor: 'check',
            },
            {
                Header: 'No',
                Cell: ({row}) => {
                    return row.index + 1
                }
            },
            {
                Header: '부서',
                accessor: 'deptName',
            },
            {
                Header: '이름',
                accessor: 'name',
            },
            {
                Header: '근태구분',
                accessor: 'req',
            },
            {
                Header: '신청기간 (시작)',
                accessor: 'vacationstart',
            },
            {
                Header: '신청기간 (종료)',
                accessor: 'vacationend',
            },
            {
                Header: '신청시간',
                accessor: 'hours',
            },
            {
                Header: '신청일수',
                accessor: 'days',
            },
            {
                Header: '신청사유',
                accessor: 'context',
            },
            {
                Header: '진행현황',
                accessor: 'condition',
            },
            {
                Header: '반려사유',
                accessor: 'reason',
            },
        ],
        []
    )
    const empName = useSelector((state) => state.EMP_INFO.empInfo[1]);
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);

    for (let i = 0; i < data.length; i++) {
        if (data[i].reject === 1) data[i].condition = "반려됨";
        else if (data[i].accept === 1) data[i].condition = "승인";
        else data[i].condition = "결제 대기중";
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].req === "휴가") {
            data[i].days = (Date.parse(data[i].vacationend) - Date.parse(data[i].vacationstart)) / (1000 * 60 * 60 * 24) + 1;
            data[i].days = Math.ceil(data[i].days);
            data[i].days = data[i].days + ' D';
        } else {
            data[i].hours = (Date.parse(data[i].vacationend) - Date.parse(data[i].vacationstart)) / (1000 * 60 * 60);
            data[i].hours = data[i].hours + ' H';
        }
    }
    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:8080/vacationlist", {params: {'empno': empNo}})
                .then((res) => {
                    setData(res.data);
                    setLoadingData(false);
                })
        }

        if (loadingData) {
            getData();
        }
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})
    let navigate = useNavigate();
    const [modalSwitch, setModalSwitch] = useState(false);

    function DeleteCheck() {
        setModalSwitch(!modalSwitch);
    }

    function DeleteEx(checkedReqId) {
        setModalSwitch(false);
        for (let i = 0; i < checkedReqId.length; i++) {
            axios
                .post("/delvacationreq", {
                    reqId: checkedReqId[i],
                    empNo: empNo,
                    grossHours: grossHours,
                })
                .then((res) => {
                })
        }
        window.location.reload();
    }

    return (
        <MainStyle>
            {modalSwitch && (
                <Modal>
                    <ModalWindow>
                        <ModalTitle> 선택된 신청서를 정말 삭제하시겠습니까?</ModalTitle>
                        <YesButton modalSwitch={modalSwitch} onClick={() => DeleteEx(checkedReqId)}> 확인 </YesButton>
                        <NoButton onClick={() => DeleteCheck()}> 취소 </NoButton>
                    </ModalWindow>
                </Modal>
            )}
            <Container>
                <Title> 휴가 신청 목록 </Title>
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
                <DeleteButton onClick={() => DeleteCheck()}>삭 제</DeleteButton>
            </Container>
        </MainStyle>
    );
};
const {DeleteButton, Title, Container} = style;
const {Modal, ModalWindow, ModalTitle, YesButton, NoButton} = modalStyle;
export default LeaveList;
