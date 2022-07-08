import React from 'react';
import styled from "styled-components";

const Input = styled.input` 
    position: relative; 
    width: 90%;
    height: 6%;
    font-size: 1.1em;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid gray;
    letter-spacing: 0.2vw;
    padding-left: 20px;  
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
    font-size: 1.5em;
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
  font-size: 1.7em;  
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 1em;  
`;

const Contents = styled.div`
    position: relative;
    width: 100%;
    height: 70%;
    float: left;
    box-sizing: border-box;  
    box-sizing: border-box;
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center; 
`;

const LeftContainer = styled.div`
    position: relative; 
    width: 50%;
    height: 100%; 
    float: left;
    box-sizing: border-box; 
    padding: 3% 
     
`;

const RightContainer = styled.div`
    position: relative; 
    width: 50%;
    height: 100%; 
    float: right;
    box-sizing: border-box; 
    padding: 3%
`;

const GraphBox = styled.div`
    position: relative;
    border-radius: 10px;
    border-style: 1px solid black;
    display: flex;
    flex-direction: row; 
    justify-content: center;
    align-items: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`;

const TimeBox = styled.div`  
    position: relative; 
    border-radius: 10px;
    border-style: 1px solid black;
    width: 100%;
    display: flex;
    // flex-direction: column; 
    flex-direction: row
    justify-content: center;
    align-items: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2); 
    margin-bottom: 3%  
`;

const TimeChoiceBox = styled.div`
    position: relative; 
    border-radius: 10px;
    border-style: 1px solid black;
    width: 100%;
    min-height: 30vh; 
    display: flex;
    flex-direction: column;  
    justify-content: center;
    align-items: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2); 
    margin-bottom: 3% 
`;


export {Input, Button, Title, Text, Contents, LeftContainer, RightContainer, GraphBox, TimeBox, TimeChoiceBox, };