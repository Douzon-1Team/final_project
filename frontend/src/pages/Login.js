import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../apis/Users';
import { setRefreshToken } from '../auth/Cookie';
import { SET_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { SET_EMP_INFO } from "../store/modules/Reducer/EmpAuth";
import Fade from 'react-reveal';
import { Form, Container, Input, Button, Logo } from '../styles/login';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, setValue, formState: { errors }, handleSubmit, } = useForm();

  const onValid = async ({ empno, password }) => {
    const response = await loginUser({ empno, password });

    if (response.status) {
      setRefreshToken(response.json.refresh_token)
      dispatch(SET_TOKEN(response.json.accessToken))
      dispatch(SET_EMP_INFO(response.json));
      alert('로그인 성공');
      return navigate('/main');
    } else {
      alert('사번과 비밀번호를 다시 한번 확인하세요.');
    }
    setValue('password', '');
  };

  return (
      <>
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
      </>
  );
}

export default Login;
