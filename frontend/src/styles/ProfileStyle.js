import styled from 'styled-components';

const Title = styled.p`
    font-size: 1.3rem;   
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

const Table = styled.table`    
    padding: 0; 
    width: 80%;
    height: 50%; 
    text-align: center;
    align-items: center;
    min-height: 250px; 
    td {  
        font-size: 1.3rem;   
        font-weight: bold;   
        width: 50%;
        height: 5vh;
        letter-spacing: 0.5vw;   
    }  
`;

const Input = styled.input` 
    position: relative; 
    width: 80%; 
    font-size: 1.3rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    padding-left: 20px;
    &::placeholder {
        color: white;
    } 
`;

const QR = styled.button` 
    height: 4vh; 
    background-color: #00AAFF;
    border: none;
    min-height: 35px; 
    border-radius: 8px;
    font-weight: bold;
    color: white;
    font-size: 1.3rem;
    float: right; 
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    min-width: 7.6vw;
    &:hover { 
      cursor: pointer; 
    }  
`;

const Button = styled.button`   
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center; 
    min-height: 35px; 
    background-color: #00AAFF;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    font-size: 1.3rem;
    float: right;
    bottom: 100vh;
    width: 15%;
    margin: 20px;
    margin-left: 50px;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    &:hover { 
      cursor: pointer; 
    }   
`;

const BtnImg = styled.button`    
    height: 4vh; 
    background-color: #00AAFF;
    border: none;
    min-height: 35px; 
    border-radius: 8px;
    font-weight: bold;
    color: white;
    font-size: 1.3rem;
    float: right; 
    box-sizing: border-box;
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    min-width: 7.6vw;
    &:hover { 
      cursor: pointer; 
    }   
    margin-top: -270%;
`;

const ProfileImg = styled.img`
    width: 80%;
    height: 50vh; 
    border-radius: 20px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);   
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
    font-size: 1.3rem; 
    margin-top: 5%;
    text-align: center;   
    font-weight: bold; 
    border-bottom: 2px solid #00AAFF;
    letter-spacing: 0.3vw;  
`;

const InfoBox2 = styled.input`  
    margin-top: 5%;
    text-align: center;   
    font-size: 1.3rem;
    font-weight: bold; 
    border-bottom: 2px solid #00AAFF;
    letter-spacing: 0.1vw;  
`;

const PwdBox = styled.input` 
    font-size: 1.3rem;  
    border: none;
    margin-top: 11%;
    text-align: center;    
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
    width: 66%;
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
    margin-left: 22%;
    margin-bottom: 41px;
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
    top: 53vh;
    right: 61%;  
    &:hover { 
      cursor: pointer; 
    }
`;

const BtnBox2 = styled.div` 
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    top: 53vh;
    right: 61%;  
    &:hover { 
      cursor: pointer; 
    }
`;

const BtnBox = styled.div` 
    font-size: 1.3rem; 
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center; 
    align-items: left;
    right: 0px;
    &:hover { cursor: pointer; }
    width: 100%;
    justify-content: flex-end;
    margin-top: 5%;
    left : -15%;
`;

const TabTitle = styled.p`
    font-size: 1.3rem; 
    width: 100%;
    border: none;
    background: none; 
    font-weight: bold;
    min-height: 40px;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: left;
    &:hover { 
      cursor: pointer; 
    } 
`;

const RedBtn = styled.button`
    cursor: pointer;
    background: #ff7777;
    font-weight: bold;
    border-radius: 10px;
    width: 80%;
    border: 0px;
    margin: 0px 0px 15px 0px;
    padding-top: 5px;
    padding-bottom: 5px; 
    &.button{
        text-align: center;
    }
`;


export {InfoBox2, BtnBox2, BtnImg, RedBtn, TabTitle, ContentBox, TabBox, ProfileBox, BtnBox, QrBox, IconBox, LeftContainer, RightContainer, InfoBox, PwdBox, TopContainer, QR, Title, Table, Input, Button, ProfileImg, TableBox};
