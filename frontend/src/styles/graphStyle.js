import styled from 'styled-components';

const ToggleText = styled.div`
    writing-mode: tb-rl;  
`
const ComponentContainer = styled.div`
    width: 400px;
    display : flex;
    
    button{
        margin-left: 10%;
        margin-top: 50px;
    }
`
const ChartContainer = styled.div`
    .echarts-for-react {
        width: 500px;
    }
`

export {ToggleText, ComponentContainer, ChartContainer}
