import styled from "styled-components";

const ListStyle = styled.div`

    width: 80%;
    margin: auto;

    .MuiTable-root[aria-label="collapsible table"], .MuiTable-root[aria-label="simple table"]{
        margin-top: 90px;
    }    
    
    td{
        text-align: center;
    }
    
    th{
        text-align: center;
        font-weight: 500;
    }
    
    .MuiTypography-root{
        text-align: initial;
    }
    
    button{
        border-radius: 10px;
        border: 0;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    
    .지각{background: #ffa500;}
    .결근{
        background: #ff0000;
        color: white;
    }
    .휴가{background: #86d3fb;}
    .오전반차{background: #Fbe086;}
    .오후반차{background: #Fbc386;}
    .시간연차{background: #Abea9b;}
`

export default ListStyle;