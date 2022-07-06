import styled from "styled-components";

const DeptMemberList = styled.div`
    .MuiTableHead-root {
        background: #00AAFF;
    }
    .MuiTableCell-head {
        color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
    }
    display: inline-block !important;
    max-width: 100%;
    width: 1500px;
    .MuiTableRow-root {
        cursor: pointer;
        &:hover {
            background-color: #eeeeee;
        }
    }
`

const MemberImg = styled.img`
    width: 45px;
    height: 45px; 
    border-radius: 23px;
`;

export {MemberImg, DeptMemberList};
