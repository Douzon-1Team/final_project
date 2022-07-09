import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin-top: 90px;
  
  h3 {
    display : inline;
    padding-left: 30px
  }
  
  span{
    margin-left: 10px;
    color: darkgray;
    fontWeight: bold;
  }
  
  .select-row{
    margin-top: 6px;
    margin-right: 50px;
    float: right
  }
`;

const Table = styled.table`
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
  
  :first-of-type {
    width: 12%;
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
  border-bottom: 0.5px solid #adb1b9;
  border-top: 0.5px solid #adb1b9;
  
  :first-of-type {
    border-left: 0.5px solid #adb1b9;
    border-radius: 15px 0 0 15px;
  }
  :last-of-type {
    padding-right: 15px;
    overflow: initial;
    border-right: 0.5px solid #adb1b9;
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

const EtcButton = styled.button`
        border-radius: 10px;
        border: 0;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    
    &.지각{background: #ffa500;}
    &.결근{
        background: #ff0000;
        color: white;
    }
    &.휴가{background: #86d3fb;}
    &.오전반차{background: #Fbe086;}
    &.오후반차{background: #Fbc386;}
    &.시간연차{background: #Abea9b;}
`;

export {Container, Table, Header, Button, Row, Cell, Order, Pagination, EtcButton};