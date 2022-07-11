import axios from 'axios';

const BASE_URL = "http://localhost:8080";
const URL_LOGIN = `${BASE_URL}/login`;
const URL_LOGOUT = `${BASE_URL}/logout`;
const URL_PROFILE = `${BASE_URL}/profile/`;
const URL_SETTING = `${BASE_URL}/setting/`;
const URL_UPDATE_PWD = `${BASE_URL}/profile/updatePwd`;
const URL_UPDATE_WORKTIME_CHOICE = `${BASE_URL}/setting`;
const URL_UPDATE_WORKTIME_SETTING = `${BASE_URL}/setting/time`;
const URL_UPDATE_GRAPH_SETTING = `${BASE_URL}/setting/graph`;
const URL_DEPT_VACATION = `${BASE_URL}/report/dvacation-status`;

// 회원 로그인
export const loginUser = async ( {empno, password} ) => {
  return await axios.post(
    URL_LOGIN,
    { empno: empno, password: password }
  ).then ((response) => {
    return response;
  }).catch(errors => { console.log(errors); });
};

// 회원 로그아웃
export const logoutUser = async ( { accessToken } ) => {
  return await axios.post(
    URL_LOGOUT,
    // { },
    { accessToken: accessToken },
    {
      headers: {
        'Access-Control-Allow-Origin': `${URL_LOGOUT}`
      }
    }
  ).then ((response) => {
    return response;
  }).catch(errors => { console.log(errors); });
};

// 사원의 정보 조회
export const getProfile = async ( {empNo, accessToken} ) => {
  return await axios.get(
      URL_PROFILE+`${empNo}`,
    {
      headers: {
        'Authorization': accessToken
      }}
  ).then ((response) => {
      return response;
  }).catch(error => console.log(error))
};

// 부서 환경설정 세팅
export const getSetting = async ({empNo, accessToken} ) => {
  return await axios.get(
    URL_SETTING+`${empNo}`,
    {
      headers: {
        'Authorization': accessToken
      }}
  ).then ((response) => {
    return response;
  }).catch(error => console.log(error))
};

// 부서원 연차 현황
export const getDvacation = async ( {empno, accessToken} ) => {
  return await axios.get(
    URL_DEPT_VACATION,
    {
        params: {empno},
      headers: {
        'Authorization': accessToken
      }}
  ).then ((response) => {
    return response;
  }).catch(error => console.log(error))
};

// 비밀번호 변경
export const updatePwd = async ( {empno, pwd, newPwd, chkPwd, accessToken} ) => {
  return await axios.post(
    URL_UPDATE_PWD,
    { empno: empno, pwd: pwd, newPwd: newPwd, chkPwd: chkPwd },
    {
      headers: {
        'Authorization': accessToken
      }
    }).then ((response) => {
    return response;
  }).catch(errors => console.log(errors));
};

// 근무시간 선택
export const settingTimeChoice = async ( { empno, deptNo, flexible, accessToken } ) => {
  return await axios.post(
    URL_UPDATE_WORKTIME_CHOICE,
    { empno: empno, deptNo: deptNo, flexible: flexible, },
    {
      headers: {
        'Authorization': accessToken,
      }
    }).then ((response) => {
    return response;
  }).catch(errors => {
    console.log(errors);
  });
};

// 근무시간 설정
export const settingTime = async ( {empno, deptNo, getToWorkTimeSet, getOffWorkTimeSet, getToWorkTimeSetF, getOffWorkTimeSetF, accessToken} ) => {
  return await axios.post(
    URL_UPDATE_WORKTIME_SETTING,
    { empno: empno, deptNo: deptNo,
            getToWorkTimeSet: getToWorkTimeSet, getOffWorkTimeSet: getOffWorkTimeSet,
            getToWorkTimeSetF: getToWorkTimeSetF, getOffWorkTimeSetF: getOffWorkTimeSetF },
    {
      headers: {
        'Authorization': accessToken,
      }
    }).then ((response) => {
    return response;
  }).catch(errors => {
    console.log(errors);
  });
};

// 페이지보기 형식 설정
export const settingGraph = async ( {empno, deptNo, graph, accessToken} ) => {
  return await axios.post(
    URL_UPDATE_GRAPH_SETTING,
    { empno: empno, deptNo: deptNo, graph: graph },
    {
      headers: {
        'Authorization': accessToken,
      }
    }).then ((response) => {
    return response;
  }).catch(errors => {
    console.log(errors);
  });
};