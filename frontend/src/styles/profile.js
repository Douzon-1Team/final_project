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

const Table = styled.table`
    border: 3px solid #bcbcbc;
    width: 80%;
    font-weight: bold;
    display: block; 
    margin-top: 8vh;
    margin-left: auto; 
    margin-right: auto; 
    text-align: center;
    margin-bottom: 0.5%; 
`;

// const PwdTable = styled.table`
//     // border: 3px solid #bcbcbc;
//     width: 80%;
//     font-weight: bold;
//     display: block;
//     margin-left: auto;
//     margin-right: auto;
// `;

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
    margin-top: 7%;
    width: 80%;
    height: 5vh;
    font-size: 1.1em;
    font-weight: bold;
    border: none;
    background: lightgray;
    border-radius: 4px;
    padding-left: 20px;
    &::placeholder{
        color: white;
    }
`;

const Button = styled.button`
    position: relative; 
    width: 15%;
    height: 3.5vh;
    margin-left: 1%; 
    background-color: gray;
    border: none;
    border-radius: 3px;
    font-weight: bold;
    color: white;
    font-size: 1.1em;
    &:hover { cursor: pointer; }
    margin-top: 5vh;
    float: right; 
`;

const QR = styled.button` 
    width: 12%;
    height: 3.5vh; 
    background-color: gray;
    border: none;
    border-radius: 3px;
    font-weight: bold;
    color: white;
    font-size: 1.1em;
    &:hover { cursor: pointer; }
    float: right;
    margin-right: 10vw;
`;

const Img = styled.img`
    width: 45vw;
    max-width: 300px;
    min-width: 300px;
    height: 47vh; 
    max-height: 300px;
    min-height: 300px;
`;

const Line = styled.div`
    margin-left: 10%;    
    margin-bottom: 0.5%; 
`;

export {Title, Table, Input, Button, Form, Img, QR, Line};