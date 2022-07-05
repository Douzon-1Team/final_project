import styled from "styled-components";

const DeptMemberList = styled.div`
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
    width: 20px;
    max-width: 20px;
    min-width: 20px;
    height: 20px; 
    max-height: 20px;
    min-height: 20px;
`;

export {MemberImg, DeptMemberList};
