import styled from 'styled-components';
import { styled as styled_m } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const BorderLinearProgress = styled_m(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 15,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 600],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 15,
        backgroundColor: theme.palette.mode === 'light' ? '#00AAFF' : '#00AAFF',
    },
}));

const PbContainer = styled.div`
    margin-bottom: 3%;
`
const TextContainer = styled.div`
    margin-left: 5%;
    margin-bottom: 3%;
    margin-top: 3%;
    font-size: 18px;
`

const TextContainer2 = styled.div`
    margin-left: 13%;
    margin-bottom: 7%;
    margin-top: 3%;
    font-size: 18px;
`
const CardContainer = styled.div`
    padding-top: 4%;
    padding-bottom: 4%;
    padding-right: 6%;
    padding-left: 6%;
`
const progressValue = styled.div`
    minWidth: 35;
    float: right;
    position: relative;
    margin-top: 3%;
`
const TitleContainer2 = styled.div`
    float: left;
    font-size: 30px;
    margin-top: 4%;
    text-align: center;
    font-weight: bold;
`

const TitleContainer1 = styled.div`
    font-size: 30px;
    margin-top: 4%;
    text-align: center;
    font-weight: bold;
`

const MainStyles = styled.div`
    display: inline-block;
    width: 400px;
`

const MainchatStyle = styled.div`
    float: right;
    .echarts-for-react {
    width: 1000px !important;
    height: 700px !important;
    }
`

export {BorderLinearProgress, PbContainer, TextContainer, TextContainer2, CardContainer, progressValue, TitleContainer1,TitleContainer2, MainchatStyle, MainStyles};
