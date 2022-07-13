import axios from 'axios';

export const getDeptMember = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "http://localhost:8080/manager/deptmember",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        // DeptVacationError();
    }
};
