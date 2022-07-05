import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../apis/Users';
import { SET_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { SET_EMP_INFO } from "../store/modules/Reducer/EmpAuth";
import { Form, Container, Input, Button, Logo } from '../styles/login';
import Fade from 'react-reveal';
import {LoginFail, LoginSuccess} from "../components/common/alert/alert";
import { MainStyle } from "../styles/Globalstyle";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, setValue, formState: { errors }, handleSubmit, } = useForm();

    const onValid = async ({ empno, password }) => {
        const response = await loginUser({ empno, password });

        if (response.status) {
            // alert(document.cookie !== null); // true
            dispatch(SET_TOKEN(response.json.accessToken))
            dispatch(SET_EMP_INFO(response.json));
            localStorage.setItem("LoginChk", "true");
            LoginSuccess();
            return navigate('/main');
        } else {
            LoginFail();
        }
        setValue('password', '');
    };

    return (
        <MainStyle>
            <Container>
                <Fade bottom>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <Logo />
                        <Input {...register('empno')} type="text" placeholder="사 번" />
                        <Input {...register('password')} type="password" placeholder="비밀번호" />
                        <Button className="btn-login" type="submit">LOGIN</Button>
                    </Form>
                </Fade>
            </Container>
        </MainStyle>
    );
}

export default Login;
