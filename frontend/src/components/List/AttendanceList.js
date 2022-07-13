import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import {useSelector} from "react-redux";
import axios from "axios";
import {style} from "./ListStyle"
import {MainStyle} from "../../styles/Globalstyle";
import {EtcButton, Row} from '../admin/EmpTableStyle';
import {ListStyle, ListHeader, ListHead} from "../../styles/ListStyle";
import {DeleteAttendanceList} from "../common/alert/alert";


const LeaveList = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [checkedReqId, setCheckedReqId] = useState([]);
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);

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
                .get("http://localhost:8080/attendance/attendancelist", {params: {'empno': empNo},
                    headers:{'Authorization':accessToken}})
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
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);

    function DeleteEx() {
        DeleteAttendanceList();
        for (let i = 0; i < checkedReqId.length; i++) {
            axios
                .post("/attendance/delattendancereq", {
                    reqId: checkedReqId[i],
                },{
                    headers:{'Authorization':accessToken}
                })
                .then((res) => {
                })
        }
        window.location.reload();
    }

    return (
        <MainStyle>
            <ListStyle>
                <Title> 근태조정 신청 목록 </Title>
                <table {...getTableProps()}
                       className="MuiTable-root" aria-label="simple table"
                       style={{"marginTop":'10px'}}
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
                                        <td className="line "
                                            style={{
                                                padding: '5px 20px 5px 20px',
                                            }}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.column.id === "condition" ?
                                                <EtcButton className={cell.value}>{cell.render('Cell')}</EtcButton> :
                                                <>{cell.render('Cell')}</>
                                            }
                                        </td>
                                    )
                                })}
                            </Row>
                        )
                    })}
                    </tbody>
                </table>
                <DeleteButton onClick={() => DeleteEx()}>삭 제</DeleteButton>
            </ListStyle>
        </MainStyle>
    );
};

const {DeleteButton, Title} = style;
export default LeaveList;
