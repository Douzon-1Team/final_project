import styled from "styled-components";

const DayWorkChartStyle = styled.div`
    display : inline-flex;
    margin-top : 30px;
    
    .dw{
        z-index: 10;
        position: relative;
        left: 900px;
        top: 20px
    }
    
    .ap{
        z-index: 10;
        position: relative;
        left: 900px;
        top: -35px;
    }
    
    .vg{
        z-index: 10;
        position: relative;
        left: 900px;
        top: 30px;
    }
    
    .hour{
        z-index: 10;
        position: relative;
        left: 700px;
    }
`

export {DayWorkChartStyle};
