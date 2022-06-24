import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

// useTable에다가 작성한 columns와 data를 전달한 후 아래 4개의 props를 받아온다
const LeaveList = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableSheet {...getTableProps()}>
      <TableHead>
        {headerGroups.map((header) => (
          // getHeaderGroupProps를 통해 header 배열을 호출한다
          <Header {...header.getHeaderGroupProps()}>
            {header.headers.map((col) => (
              // getHeaderProps는 각 셀 순서에 맞게 header를 호출한다
              <Th {...col.getHeaderProps()}>{col.render("Header")}</Th>
            ))}
          </Header>
        ))}
      </TableHead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            // getRowProps는 각 row data를 호출해낸다
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                // getCellProps는 각 cell data를 호출해낸다
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </TableSheet>
  );
};
