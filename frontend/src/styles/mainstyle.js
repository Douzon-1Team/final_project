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
    @media screen and (max-width: 2000px) {
        font-size: 15px;
    }
`

const TextContainer2 = styled.div`
    margin-left: 13%;
    margin-bottom: 7%;
    margin-top: 3%;
    font-size: 18px;
    @media screen and (max-width: 2000px) {
        font-size: 15px;
        width: 160px;
    }
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
    @media screen and (max-width: 2000px) {
        font-size: 23px;
    }
`

const TitleContainer1 = styled.div`
    font-size: 30px;
    margin-top: 4%;
    text-align: center;
    font-weight: bold;
    @media screen and (max-width: 2000px) {
        font-size: 23px;
    }
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
    @media screen and (max-width: 2000px) {
            width: 900px;
    }
`

const AttendanceCardTitle = styled.div`
    font-size: 30px;
    margin-top: 4%;
    text-align: center;
    @media screen and (max-width: 2000px) {
        font-size: 20px;
    }
`
const AttendanceCardText = styled.div`
    font-size: 60px;
    margin-top: 4%;
    text-align: center;
`
const CardContent = styled.div`
    width: 250px;
    height: 250px;
`
const TopLine = styled.div`
    height: 15px;
    background-color: ${(props) => props.color || "#0057b7"};

`

const MainCards = styled.div`
    .title {
        text-align: center;
        font-size: 25px;
        font-weight: bold;
    }
    @media screen and (max-width: 2000px) {
        margin-top: 40px;
        max-width: 400px;
        .card1 {
            height: 180px;
            div {
            width: 200px;
            }
        }
        .card2 {
            height: 180px;
            div {
            width: 200px;
            }
        }
        .card3 {
            height: 180px;
            div {
            width: 200px;
            }
        }
        .card4 {
            height: 180px;
            div {
            width: 200px;
            }
        }
    }
`

const MainVaciton = styled.div`
    .echarts-for-react {
      @media screen and (max-width: 2000px) {
        height: 150px !important;
        }  
    } 
`

export {BorderLinearProgress, PbContainer, TextContainer, TextContainer2, CardContainer, progressValue, TitleContainer1,TitleContainer2, MainchatStyle, MainStyles, AttendanceCardTitle, AttendanceCardText, CardContent, TopLine, MainCards, MainVaciton};
