import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../apis/Users';
import { SET_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { SET_EMP_INFO } from "../store/modules/Reducer/EmpAuth";
import { Form, Container, Input, Button, Logo } from '../styles/login';
import Fade from 'react-reveal';

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
      alert('로그인 성공했습니다.');
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