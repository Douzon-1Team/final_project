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
    width: 79%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    height: 100%;
    float: right; 
    min-height: 50vh;    
    border-radius: 20px; 
`;

const TableBox2 = styled.div` 
    position: relative;
    width: 100%;
    margin-left: 20%; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin-top: 12%;
`;

const Table = styled.table`    
    padding: 0; 
    width: 80%;
    height: 50%; 
    td {  
        font-weight: bold;   
        width: 50%;
        height: 5vh;
        letter-spacing: 0.5vw;   
    }  
    text-align: center;
    align-items: center;
    min-height: 250px;
    // margin-top: 5%;
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
    width: 80%; 
    font-size: 1.1em;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    padding-left: 20px;
    &::placeholder {
        color: white;
    }
    background: lightgray;
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
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);  
    &:hover { cursor: pointer; } 
`;

const Button = styled.button`   
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    height: 3.5vh; 
    background-color: #00AAFF;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    font-size: 1.1rem;
    float: right;
    bottom: 50vh; 
    width: 20%;
    // max-width: 150px;
    min-width: 107px;   
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    &:hover { cursor: pointer; } 
`;

const ProfileImg = styled.img`
    width: 100%;
    max-width: 300px;
    height: 100%; 
    max-height: 50vh; 
    border-radius: 20px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);   
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

const TabBox = styled.div` 
    display: flex;
    width: 21%;
    height: 100%;
    float: left; 
    min-height: 50vh; 
    box-sizing: border-box;
    border-right: 1px solid #E5E5E5;
    flex-direction: column;
`;

const InfoBox = styled.div`  
    margin-top: 5%;
    text-align: center;   
    font-size: 1.1rem;
    font-weight: bold; 
    border-bottom: 2px solid #00AAFF;
    letter-spacing: 0.3vw;  
`;

const PwdBox = styled.input` 
    border: none;
    margin-top: 11%;
    text-align: center;   
    font-size: 1.1rem;
    font-weight: bold; 
    border-bottom: 2px solid #00AAFF;
    letter-spacing: 0.1vw;   
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
    width: 68%;
    height: 100%;
    float: left;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
`;

const ContentBox = styled.div`  
    width: 100%;
    height: 100%;
    float: left; 
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);  
    border-radius: 20px;
`;

const ProfileBox = styled.div`
    position: static;
    width: 100%;  
    height: 100%; 
    max-height: 50vh; 
    border-radius: 20px;
    float: left;
    // box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
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
    padding: 10px;
    &:hover { cursor: pointer; } 
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);  
`;

const QrBox = styled.div` 
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    float: right;
    margin-right: 2%;
    bottom: 8vh;
    background: white;
    &:hover { cursor: pointer; }
`;

const BtnBox = styled.div` 
    position: relative;
    box-sizing: border-box;
    display: flex;
    float: right;
    background: white;
    right: 0px;
    &:hover { cursor: pointer; }
`;

const TabTitle = styled.p`
    width: 100%;
    border: none;
    background: none;
    font-size: 1rem;
    font-weight: bold;
    min-height: 40px;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: left;
    &:hover { cursor: pointer; } 
`;


export {TabTitle, ContentBox, TabBox, ProfileBox, TableBox2, BtnBox, QrBox, IconBox, LeftContainer, RightContainer, InfoBox, PwdBox, TopContainer, QR, Title, Table, Input, Button, Form, ProfileImg, Line, TableBox};