import axios from 'axios';

export const getDeptMember = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "https://allinone.kro.kr/manager/deptmember",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        // DeptVacationError();
    }
};
