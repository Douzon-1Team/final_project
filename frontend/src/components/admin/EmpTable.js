import React, {useState, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTable, useSortBy, usePagination, useFilters} from "react-table";
import {SearchFilter, SelectFilter, RangeFilter, dateBetweenFilter} from './Filter'
import {Table, Header, Button, Row, Cell, Order, Pagination} from "./EmpTableStyle";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function EmpTable(props) {
    const data = props.data;
    const {num, setNum} = useState(data.length);
    const navigate = useNavigate();

    const toUpdateEmp = (e, empno) => {
        e.preventDefault();
        navigate(`/profile/${empno}`);
    }

    const columns = useMemo(
        () => [
            {Header: 'NO', Cell: ({row}) => {return row.index+1}},
            {Header: '사번', accessor: 'empno', Filter: SearchFilter},
            {Header: '권한', accessor: 'roleName', Filter: SelectFilter},
            {Header: '부서', accessor: 'deptName', Filter: SelectFilter },
            {Header: '이름', accessor: 'empName', Filter: SearchFilter},
            {Header: '직급', accessor: 'rankName', Filter: SelectFilter},
            {Header: '내선번호', accessor: 'extensionNum', Filter: SearchFilter},
            {Header: '입사일', accessor: 'hireDate', Filter: RangeFilter, filter: dateBetweenFilter,
                Cell: ({value}) => {return value.slice(0,10)}
            },
            {Header: '정보관리', Cell: ({row}) => {return <Button onClick={(e) => toUpdateEmp(e, row.original.empno)}>수정</Button> }}

        ],[]);

    const defaultColumn = React.useMemo(
        () => ({
            Filter: SearchFilter, SelectFilter, RangeFilter
        }),
        []
    )

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, state,
        page, nextPage, previousPage, canPreviousPage, canNextPage, gotoPage, setPageSize}
        = useTable({ columns, data, defaultColumn, initialState:{pageSize: 5} }, useFilters, useSortBy, usePagination);

    const {pageIndex, pageSize} = state;

    return (
        <>
            <h3 style={{display : "inline"}}>사원 정보 테이블</h3>
            <span style={{marginLeft: "10px", color: "darkgray", fontWeight: "bold"}}>{num}</span>
            <select style={{marginTop:"10px", marginRight:"50px", float:"right"}}
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}>
                {[5, 10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show  {pageSize}
                    </option>
                ))}
            </select>
            <hr/>

            <Table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <Header {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Order {...column.getHeaderProps()}>
                                <span {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                {column.isSorted ? (column.isSortedDesc ?
                                        <ArrowDownwardIcon fontSize="small"/>: <ArrowUpwardIcon fontSize="small"/>
                                ) : "  "}
                                </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </Order>
                        ))}
                    </Header>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row)
                    return (
                        <Row {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
                            })}
                        </Row>
                    )
                })}
                </tbody>
            </Table>

            <Pagination>
                <ArrowBackIosIcon fontSize="medium"
                                  onClick={() => previousPage()}
                                  disabled={!canPreviousPage}/>

                <button onClick={() => gotoPage(pageIndex)}>
                    {pageIndex + 1}
                </button>
                <ArrowForwardIosIcon fontSize="medium"
                                     onClick={() => nextPage()}
                                     disabled={!canNextPage}/>
            </Pagination>
        </>
    )
}

export default EmpTable;