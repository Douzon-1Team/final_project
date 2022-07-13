import axios from 'axios';

export const getAttendance = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "https://allinone.kro.kr/report",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        // DeptVacationError();
    }
};
