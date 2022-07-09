import React from 'react';

const BASE_URL = "http://localhost:8080";
const URL_PROFILE = `${BASE_URL}/profile/`;
const URL_SETTING = `${BASE_URL}/setting/`;
const URL_DEPT_VACATION = `${BASE_URL}/dvacation-status/`;

export const getProfile = function GetProfile(empno) {
  return fetch(URL_PROFILE+`${empno}`)
        .then( response => {
               return response.json(); })
        .then( emp => { return emp; })
        .catch( error => console.log("error : " + error));
}

export const getSetting = function GetDeptNo(empno) {
  return fetch(URL_SETTING+`${empno}`)
        .then( response => {
                return response.json(); })
        .then( emp => { return emp; })
        .catch( error => console.log("error : " + error));
}

export const getDvacation = function GetDeptNo(empno) {
  return fetch(URL_DEPT_VACATION+`${empno}`)
    .then( response => {
      return response.json(); })
    .then( emp => { return emp; })
    .catch( error => console.log("error : " + error));
}