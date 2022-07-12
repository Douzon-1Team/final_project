import React from 'react';
import styled from "styled-components";

const Input = styled.input` 
    position: relative; 
    width: 80%;
    height: 6%;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid gray;
    letter-spacing: 0.2vw; 
    bottom: 2px;
    &:focus {
      border-bottom: 2px solid #00AAFF;
      outline: none;
    }  
`;

const Radio = styled.input` 
    position: relative; 
    width: 80%;
    height: 6%;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid gray;
    letter-spacing: 0.2vw; 
    bottom: 2px;
    margin-left: 17px;
    &:focus {
      border-bottom: 2px solid #00AAFF;
      outline: none;
    }  
`;

const Button = styled.button`
    position: fixed;
    width: 80%;
    left: 10%;
    bottom: 5%;
    height: 6%;
    background-color: #00AAFF;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    color: white;
    font-size: 1.3rem;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
    box-sizing: border-box;
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center; 
`;

const Title = styled.p`
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;  
`;

const Text = styled.p`
    font-weight: bold;
    font-size: 1rem;  
`;

const LeftContainer = styled.div`
    position: relative; 
    margin-top: 5%;
    width: 50%;
    height: 10%;
    float: left;
    box-sizing: border-box; 
    padding: 3%;   
`;

const RightContainer = styled.div`
    position: relative; 
    margin-top: 5%;
    width: 50%;
    max-height: 100px;
    height: 100%; 
    float: right;
    box-sizing: border-box; 
    padding: 3%
`;

const TimeContainer = styled.div`
    position: relative; 
    width: 40%;
    height: 10%;
    float: left;
    box-sizing: border-box; 
    padding: 3%;
    font-weight: bold;
    margin-left: 20px;
`;

const TimeRightContainer = styled.div`
    position: relative; 
    width: 60%;
    max-height: 100px;
    height: 100%; 
    float: right;
    box-sizing: border-box; 
    padding: 3%
`;

const TimeBox = styled.div`  
    position: relative; 
    border-radius: 10px;
    border-style: 1px solid black;
    width: 100%;
    min-height: 150px;
    display: flex; 
    flex-direction: row
    justify-content: center;
    align-items: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2); 
    margin-bottom: 5%;
`;

const TimeChoiceBox = styled.div`
    position: relative; 
    border-radius: 10px;
    border-style: 1px solid black;
    width: 100%; 
    min-height: 200px; 
    display: flex;
    flex-direction: column;  
    justify-content: center;
    align-items: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2); 
    margin-bottom: 3%;
`;


export {Radio, TimeRightContainer, TimeContainer, Input, Button, Title, Text, LeftContainer, RightContainer, TimeBox, TimeChoiceBox, };
