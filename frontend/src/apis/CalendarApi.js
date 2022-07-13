import axios from 'axios';
import {MainCalendarError} from "../components/common/alert/alert";


export const getMain = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            'https://allinone.kro.kr/main',
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        console.log(error);
    }
};
