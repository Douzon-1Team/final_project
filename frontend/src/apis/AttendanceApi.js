import axios from 'axios';

export const getAttendance = async ( {empno} ) => {
    console.log(empno);
    try {
        return await axios.get(
            "http://localhost:8080/report",
            {
                params: {empno}
            }
        );
    } catch (error) {
        // TODO : alert 에러처리
        // DeptVacationError();
    }
};
