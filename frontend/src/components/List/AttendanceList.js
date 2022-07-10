import React, {useCallback, useEffect, useState} from 'react';
import {useTable} from 'react-table';
import {useSelector} from "react-redux";
import axios from "axios";
import Layout from "../common/Layout";
import {style} from "./ListStyle"
import {Modal, ModalTitle, ModalWindow, NoButton, YesButton} from "../common/Modal/ModalStyle";
import {MainStyle} from "../../styles/Globalstyle"

const LeaveList = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [checkedReqId, setCheckedReqId] = useState([]);

    function onClickChecked(target) {
        checkedReqId.includes(target) ? checkedReqId.splice(checkedReqId.indexOf(target), 1) : checkedReqId.push(target);
        setCheckedReqId(checkedReqId);
    }

    for (let i = 0; i < data.length; i++) {
        data[i].check = <input id={i} type="checkbox" name="checkbox" onClick={() => onClickChecked(data[i].reqid)}/>
    }
    const columns = React.useMemo(
        () => [
            {
                Header: '',
                accessor: 'check',
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
                Header: '사유',
                accessor: 'context',
            },
            {
                Header: '상태',
                accessor: 'condition',
            },
            {
                Header: '반려사유',
                accessor: 'reason',
            },
        ],
        []
    )
    for (let i = 0; i < data.length; i++) {
        if (data[i].reject === 1) data[i].condition = "반려됨";
        else if (data[i].accept === 1) data[i].condition = "승인";
        else data[i].condition = "결제 대기중";
    }
    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:8080/attendance/attendancelist", {params: {'empno': empNo}})
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
    const empName = useSelector((state) => state.EMP_INFO.empInfo[1]);
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);
    const [modalSwitch, setModalSwitch] = useState(false);

    function DeleteCheck() {
        setModalSwitch(!modalSwitch);
    }

    function DeleteEx() {
        setModalSwitch(false);
        for (let i = 0; i < checkedReqId.length; i++) {
            axios
                .post("/attendance/delattendancereq", {
                    reqId: checkedReqId[i],
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
                        <YesButton modalSwitch={modalSwitch} onClick={() => DeleteEx()}> 확인 </YesButton>
                        <NoButton onClick={() => DeleteCheck()}> 취소 </NoButton>
                    </ModalWindow>
                </Modal>
            )}
            <Container>
                <Title> 근태조정 신청 목록 </Title>
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

const {DeleteButton, Title, Container,} = style;
export default LeaveList;
