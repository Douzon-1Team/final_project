import React from 'react';
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {loginUser} from "../apis/Users";
import {SET_TOKEN} from "../store/modules/Reducer/TokenAuth";
import {SET_EMP_INFO} from "../store/modules/Reducer/EmpAuth";
import {LoginFail, LoginSuccess} from "../components/common/alert/alert";
import {LeftContainer, RightContainer, Header, Footer, Content, LoginHeader, LoginFooter, LoginContent, Logo, Input, Button, Text} from '../styles/LoginStyle';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, setValue, formState: { errors }, handleSubmit, } = useForm();

  const onValid = async ({ empno, password }) => {
    if (empno.valueOf() === '' || password.valueOf() === '') {
      LoginFail();
      return false;
    }

    const response = await loginUser({ empno, password });
    if (response.status) {
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
    <>
      <LeftContainer>
        <Header>
          <Logo />
        </Header>
        <Content>
          <LoginHeader />
          <form onSubmit={handleSubmit(onValid)}>
            <Text>사 번</Text>
          <LoginContent>
            <Input {...register('empno')} type="text" placeholder="사번을 입력해주세요." />
          </LoginContent>
            <Text>비 밀 번 호</Text>
          <LoginContent>
            <Input {...register('password')} type="password" placeholder="비밀번호를 입력해주세요." />
          </LoginContent>
          <LoginFooter>
            <Button type="submit">LOGIN</Button>
          </LoginFooter>
          </form>
        </Content>
      <Footer/>
      </LeftContainer>
      <RightContainer />
    </>
  );
}

export default Login;