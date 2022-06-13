import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../auth/Users';
import { setRefreshToken } from '../auth/Cookie';
import { SET_TOKEN } from '../auth/Auth';
import Fade from 'react-reveal';
import { Form, Container, Input, Button, Logo } from '../styles/login';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, setValue, formState: { errors }, handleSubmit } = useForm();

    const onValid = async ({ empno, password }) => {
        const response = await loginUser({ empno, password });

        if (response.status) {
            // Cookie에 Refresh Token, store에 Access Token 저장
            setRefreshToken(response.text.refresh_token);
            dispatch(SET_TOKEN(response.text.access_token));
            console.log(response.status)
            console.log(response)
            console.log(response.text)
            alert('로그인 성공')
            return navigate("/");
        } else {
            alert('사번과 비밀번호를 다시 한번 확인하세요.')
            console.log(response.text);
        }
        setValue("empno", "");
        setValue("password", "");
    };

    return (
        <>
            <Container>
                <Fade bottom>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <Logo />
                        <Input {...register("empno")} type="text" placeholder="사 번" />
                        <Input {...register("password")} type="password" placeholder="비밀번호" />
                        <Button className="btn-login" type="submit">LOGIN</Button>
                    </Form>
                </Fade>
            </Container>
        </>
    );
}

export default Login;