import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import {useSelector} from "react-redux";
import axios from "axios";
import {style} from "./ListStyle";
import {modalStyle} from "../common/Modal/ModalStyle"
import dayjs from "dayjs";
import {MainStyle} from "../../styles/Globalstyle"
import {EtcButton, Row} from '../admin/EmpTableStyle';
import {ListStyle, ListHeader, ListHead} from '../../styles/ListStyle';
import {DeleteAttendanceList} from "../common/alert/alert";

let grossHours = 0;

const LeaveList = () => {
    const {DeleteButton, Title} = style;
    const {Modal, ModalWindow, ModalTitle, YesButton, NoButton} = modalStyle;
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [checkedReqId, setCheckedReqId] = useState([]);
    const today = dayjs(new Date());
    let todayFormat = today.format("YYYY-MM-DD hh:mm:00");
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);

    function onClickChecked(reqid, start, end, accept, req) {
        let hours = 0;
        if ((start >= todayFormat) && (accept === 1)) {
            if ((req === '오전반차') || (req === '오후반차')) {
                hours = 4;
            } else if (req === '휴가') {
                hours = 8*Math.ceil((Date.parse(end) - Date.parse(start))/(1000*60*60*24));
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
        } else {
            data[i].check = <input type="checkbox" disabled="true" />
        }
    }

    const columns = React.useMemo(
        () => [
            {
                Header: '',
                accessor: 'check',
            },
            {
                Header: '이름',
                accessor: 'name',
            },
            {
                Header: '근태',
                accessor: 'req',
            },
            {
                Header: '시작 기간',
                accessor: 'vacationstart',
            },
            {
                Header: '종료 기간',
                accessor: 'vacationend',
            },
            {
                Header: '시간',
                accessor: 'hours',
            },
            {
                Header: '일수',
                accessor: 'days',
            },
            {
                Header: '신청사유',
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
    const empNo = useSelector((state) => state.EMP_INFO.empInfo[0]);

    for (let i = 0; i < data.length; i++) {
        if (data[i].reject === 1) data[i].condition = "반려됨";
        else if (data[i].accept === 1) data[i].condition = "승인";
        else data[i].condition = "대기중";
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].req === "휴가") {
            data[i].days = (Date.parse(data[i].vacationend) - Date.parse(data[i].vacationstart)) / (1000 * 60 * 60 * 24) + 1;
            data[i].days = Math.ceil(data[i].days);
            data[i].days = data[i].days + ' D';
            data[i].hours = "ㅡ";
        } else {
            data[i].hours = (Date.parse(data[i].vacationend) - Date.parse(data[i].vacationstart)) / (1000 * 60 * 60);
            data[i].hours = data[i].hours + ' H';
            data[i].days = "ㅡ";
        }
    }
    useEffect(() => {
        async function getData() {
            await axios
                .get("http://localhost:8080/vacation/list", {params: {'empno': empNo},
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

    function DeleteEx() {
        for (let i = 0; i < checkedReqId.length; i++) {
            axios
                .post("/vacation/delete", {
                    reqId: checkedReqId[i],
                    empNo: empNo,
                    grossHours: grossHours,
                },{
                    headers:{'Authorization': accessToken}
                })
                .then((res) => {
                })
        }
        window.location.reload();
        DeleteAttendanceList();
    }

    return (
        <MainStyle>
            <ListStyle>
                <Title> 휴가 신청 목록 </Title>
                <table className="MuiTable-root" aria-label="simple table"
                       {...getTableProps()}
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
export default LeaveList;
