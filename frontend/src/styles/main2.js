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
const TitleContainer = styled.div`
    font-size: 20px;
    margin-top: 4%;
    text-align: center;
`


export {BorderLinearProgress, PbContainer, TextContainer, CardContainer, progressValue, TitleContainer};