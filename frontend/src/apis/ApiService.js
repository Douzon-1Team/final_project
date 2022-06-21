import React from 'react';

const BASE_URL = "http://localhost:8080";
const USER_URL = `${BASE_URL}/profile/`;

function GetProfile(empno) {
    return fetch(USER_URL+`${empno}`)
        .then( response => { return response.json(); })
        .then( emp => { return emp; })
        .catch( error => console.log("error : " + error));
}
export default GetProfile;