import axios from 'axios';

export const AttendanceDept = async ( {empno} ) => {
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
