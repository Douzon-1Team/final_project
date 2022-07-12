import styled from "styled-components";

const ListStyle = styled.div`
    h2{
        margin-top: 110px;
        padding-left: 25px;
        margin: auto;
    }
    
    .MuiTable-root[aria-label="collapsible table"], .MuiTable-root[aria-label="simple table"]{
      margin: auto;
      table-layout: fixed;
      padding: 0 8px;
      border-collapse: separate;
      border-spacing: 0 8px;
      
      .line{
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
      }
    }
    
    .MuiTable-root[aria-label="detail-history"]{
        td{
          :first-of-type{ width:115px; border-left: white solid;}
          :last-of-type{border-right: white solid;}
        }
        th{
            border-bottom: black 0.5px solid;
            background: white;
            color: black;
            font-weight: light;
          }
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
   
`

const ListHeader = styled.tr`
    background: #00AAFF;
    color: white;
    font-weight: bold;
    
    :not(:first-child){
        min-width: 8rem;
    }
`;

const ListHead = styled.td`
    height: 3rem;
`;

export {ListStyle, ListHeader, ListHead};