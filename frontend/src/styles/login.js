import styled from 'styled-components';
import LogoImg from '../assets/img/logo.png';
import backgroundImg from "../assets/img/login_bg.jpeg";

const Form = styled.form`
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    background: white;
    opacity: 0.9 !important;
    box-shadow: 10px 10px 30px #000;
    position: relative;
    text-align: center;
    width: 21%;
    max-width: 450px;
    height: auto;
    right: 0;
    left: 0;
    top: 30vh;
    box-sizing: border-box;
    padding: 0.3%;
`;

const Container = styled.div`
    background-image: url(${backgroundImg});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    z-index:1;
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
    margin-top: 7%;
    margin-bottom: 7%;
    width: 86%;
    height: 5vh;
    background-color: #00AAFF;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    font-size: 1.1em;
    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

const Logo = styled.img.attrs({
    src:  LogoImg,
})` 
    padding: 5% 0 0 5%;
    width: 28%;
    max-width: 200px;
`;

export {Form, Container, Input, Button, Logo};
