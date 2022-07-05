import React from 'react';

const BASE_URL = "http://localhost:8080";
const URL_PROFILE = `${BASE_URL}/profile/`;
const URL_SETTING = `${BASE_URL}/setting/`;

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