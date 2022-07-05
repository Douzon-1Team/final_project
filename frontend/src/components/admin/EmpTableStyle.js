import styled from 'styled-components';

const Table = styled.table`
  width: 80%;
  table-layout: fixed;
  padding: 0 8px;
  border-spacing: 0 8px;
`;

const Header = styled.tr`
  height: 24px;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
  color: darkgray;
  text-align: center;
  
  td:first-child {
    width: 8%;
  }
`;

const Button = styled.button`
    font-size: 15px;
    color: white;
    background: #00AAFF;
    border-radius: 3px;
    transition: .2s ease-in-out;
    border: 0;
    padding-left: 10px;
    padding-right: 10px;
    margin:auto;
    
    &:hover {
        border-radius: 30px;
    }
 `;

const Row = styled.tr`
  height: 56px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  background-color: white;
  border-radius: 15px;
  
  &:hover{
    background-color: #F9FAFC;
  }
`;

const Cell = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 0.5px solid #edf1f9;
  border-top: 0.5px solid #edf1f9;
  :first-of-type {
    border-left: 0.5px solid #edf1f9;
    border-radius: 15px 0 0 15px;
  }
  :last-of-type {
    overflow: initial;
    border-right: 0.5px solid #edf1f9;
    border-radius: 0 15px 15px 0;
    :hover {
      cursor: pointer;
    }
  }
`;

const Order = styled.td`
   text-align : center;
   .sort{
       visibility : hidden;
       vertical-align : middle;
   }
   &:hover {
        .sort{
            visibility : visible;
       }
   }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  ArrowBackIosIcon, ArrowForwardIosIcon{
      color: darkgray;
  }
`;

export {Table, Header, Button, Row, Cell, Order, Pagination};