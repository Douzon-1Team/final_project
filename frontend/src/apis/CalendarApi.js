import axios from 'axios';

export const getMain = async ({ empnos }) => {
    try {
        return await axios.get(
            `${process.env.REACT_APP_LOCAL_MAIN_HOST}`,
            {
                params: { empnos }
            }
        );
    } catch (error) {
        // alert("시스템 에러입니다. 관리자에게 문의 해주세요");
    }
};
