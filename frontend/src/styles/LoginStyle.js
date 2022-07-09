import React from 'react';
import styled from "styled-components";
import backgroundImg from "../assets/img/login_bg.jpeg";
import LogoImg from "../assets/img/logo.png";

const Header = styled.div` 
    width: 40vw;
    height: 15vh;
    float: left;
    box-sizing: border-box; 
`;

const Logo = styled.img.attrs({
  src:  LogoImg,
})` 
    padding: 5% 0 0 5%;
    width: 10%;
    max-width: 200px;
`;

const Input = styled.input` 
    position: relative; 
    width: 70%;
    height: 6vh;
    font-size: 1.1em;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid gray;
    letter-spacing: 0.2vw;
    padding-left: 20px; 
    margin-bottom: 5vh;
    &:focus {
      border-bottom: 2px solid #00AAFF;
      outline: none;
    } 
`;



const Button = styled.button`
    position: relative;
    width: 70%;
    height: 6vh;
    background-color: #00AAFF;
    border: none;
    border-radius: 25px;
    font-weight: bold;
    color: white;
    font-size: 1.7em;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

const Content = styled.div` 
    width: 40vw;
    height: 70vh;
    float: left;
    box-sizing: border-box;
    background: none;
`;

const LoginHeader = styled.div` 
    width: 40vw;
    height: 12vh;
    float: left;
    box-sizing: border-box;
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center;    
`;

const LoginContent = styled.div` 
    width: 40vw;
    // height: 40vh;
    float: left;
    box-sizing: border-box;
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center;
`;

const LoginFooter = styled.div` 
    width: 40vw;
    height: 10vh;
    float: left;
    box-sizing: border-box;
    display: flex;
    flex-direction:column; 
    justify-content: center;
    align-items: center;
`;

const Footer = styled.div` 
    width: 40vw;
    height: 15vh;
    float: left;
    box-sizing: border-box;
`;

const LeftContainer = styled.div` 
    width: 40vw;
    height: 100vh;
    float: left;
    box-sizing: border-box;
    background: none;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`;

const RightContainer = styled.div`
    width: 60vw;
    height: 100vh;
    float: right;
    box-sizing: border-box;
    background: #EBF4FF;
    background-image: url(${backgroundImg});
    background-repeat: no-repeat;
    background-size: cover;  
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 1.7em; 
  margin-left: 6vw;
`;

export {Header, Content, Footer, RightContainer, LeftContainer, LoginHeader, LoginFooter, LoginContent, Logo, Input, Button, Text};