import styled from 'styled-components';

const Title = styled.p`
    font-size: 1.6rem;
    width: 30%;
    border-bottom: 5px solid #bcbcbc;
    display: block;  
    margin-left: auto; 
    margin-right: auto;
    text-align: center;  
`;

const TableBox = styled.div` 
    position: relative;
    width: 100%;
    margin-left: 22%; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
`;

const TableBox2 = styled.div` 
    position: relative;
    width: 100%;
    margin-left: 22%; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin-top: 12%;
`;

const Table = styled.table`    
    font-weight: bold;  
    text-align: center;  
    td {  
        width: 70%;
        height: 5vh;
        letter-spacing: 0.7vw;
    } 
    align-items: center;
`;

const Form = styled.form`  
    border: 3px solid #bcbcbc;
    width: 78%; 
    font-weight: bold;
    display: block;   
    margin-left: auto;
    margin-right: auto;
    padding: 1%;
`;

const Input = styled.input` 
    position: relative;
    // margin-top: 7%;
    width: 80%;
    // height: 5vh;
    font-size: 1.1em;
    font-weight: bold;
    border: none;
    background: lightgray;
    border-radius: 4px;
    padding-left: 20px;
    &::placeholder {
        color: white;
    }
`;

const QR = styled.button` 
    width: 20%;
    height: 3.5vh; 
    background-color: #00AAFF;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    font-size: 1.1rem;
    float: right;
    bottom: 50vh;
    max-width: 120px;
    min-width: 120px;  
    
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    &:hover { cursor: pointer; } 
`;

const Button = styled.button`   
    height: 3.5vh; 
    background-color: #00AAFF;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    font-size: 1.1rem;
    float: right;
    bottom: 50vh; 
    max-width: 200px;
    min-width: 200px;   
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    &:hover { cursor: pointer; } 
`;

const ProfileImg = styled.img`
    width: 100%;
    max-width: 300px;
    height: 100%; 
    max-height: 50vh; 
    border-radius: 20px;
`;

const Line = styled.div`
    margin-left: 10%;    
    margin-bottom: 0.5%; 
`;

const TopContainer = styled.div` 
    width: 100%;
    height: 50%;
    max-height: 50vh;
    min-height: 50vh;  
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
`;

const InfoBox = styled.div` 
    position: relative; 
    width: 100%;
    min-width: 300px;
    height: 100%;
    min-height: 50px;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid #00AAFF;
    letter-spacing: 0.2vw; 
    
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center;  
    align-items: center;
`;

const PwdBox = styled.input` 
    position: relative; 
    width: 100%;
    min-width: 220px;
    // margin-top: 15%;
    height: 100%;
    min-height: 50px;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid #00AAFF;
    letter-spacing: 0.2vw; 
    
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center; 
`;

const LeftContainer = styled.div`  
    width: 30%;
    height: 100%;
    float: left; 
    min-height: 70vh; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center;  
    align-items: center; 
`;

const RightContainer = styled.div`  
    width: 70%;
    height: 100%;
    float: left;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    .MuiButtonBase-root {
        padding: 0px !important;
    }
`;

const IconBox = styled.div` 
    position: relative;
    width: 40px;
    border: 2px solid none;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    float: left;
    margin-left: 23.5%;
    bottom: 17vh;
    background: white;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    padding: 10px;
    &:hover { cursor: pointer; } 
`;

const QrBox = styled.div` 
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    float: right;
    bottom: 8vh;
    background: white;
    &:hover { cursor: pointer; }
`;

const BtnBox = styled.div` 
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center; 
    margin-top: 8%;
    float: right;
    background: white;
    left: 22%;
    &:hover { cursor: pointer; }
`;


export { TableBox2, BtnBox, QrBox, IconBox, LeftContainer, RightContainer, InfoBox, PwdBox, TopContainer, QR, Title, Table, Input, Button, Form, ProfileImg, Line, TableBox};
