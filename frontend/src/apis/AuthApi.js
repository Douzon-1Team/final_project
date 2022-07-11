// import axios from 'axios';
// import {PwdError, PwdSuccess} from "../components/common/alert/alert";
//
// const BASE_URL = "http://localhost:8080";
// const URL_LOGIN = `${BASE_URL}/login`;
//
// // promise 요청 타임아웃 시간 선언
// const TIME_OUT = 300 * 1000;
//
// // const statusError = {
// //   status: false,
// //   text: {
// //     error: ["status error 발생"]
// //   }
// // };
//
// const requestPromise = (url, option) => {
//   return fetch(url, option);
// };
//
// // const timeoutPromise = () => {
// //   return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), TIME_OUT));
// // };
//
// // const getPromise = async (url, option) => {
// //   return await Promise.race([
// //     requestPromise(url, option),
// //     timeoutPromise()
// //   ]);
// // };
//
// // 회원 로그인
// export const loginUser = async ( {empno, password} ) => {
//   return await axios.post(
//     URL_LOGIN,
//     {
//       empno: empno,
//       password: password,
//     },
//     {
//       headers: {
//         // 'Content-Type': 'application/json',
//         // 'Authorization': accessToken,
//       }
//     }).then ((response) => {
//       console.log(response)
//       return response;
//     }).catch(errors => {
//       console.log(errors);
//       // LoginError();
//     });
// };
//
