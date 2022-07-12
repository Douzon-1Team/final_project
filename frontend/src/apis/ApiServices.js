import axios from 'axios';

// 회원 로그인
export const loginUser = async ( {empno, password} ) => {
  return await axios.post(
      `http://localhost:8080/login`,
    { empno: empno, password: password }
  ).then ((response) => {
    return response;
  }).catch(errors => { console.log(errors); });
};

// 회원 로그아웃
export const logoutUser = async () => {
  return await axios.post(
      `http://localhost:8080/logout`,
  ).then ((response) => {
    return response;
  }).catch(errors => { console.log(errors); });
};

// 사원의 정보 조회
export const getProfile = async ( {empNo, accessToken} ) => {
  return await axios.get(
      `http://localhost:8080/profile/`+`${empNo}`,
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
      `http://localhost:8080/setting/`+`${empNo}`,
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
      `http://localhost:8080/report/dvacation-status`,
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
      `http://localhost:8080/profile/updatePwd`,
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
      `http://localhost:8080/setting`,
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
      `http://localhost:8080/setting/time`,
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
      `http://localhost:8080/setting/graph`,
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
