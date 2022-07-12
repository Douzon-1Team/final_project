import axios from 'axios';

export const getAttendance = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "http://localhost:8080/report",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        // DeptVacationError();
    }
};
