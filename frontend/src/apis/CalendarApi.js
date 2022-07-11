import axios from 'axios';
import {MainCalendarError} from "../components/common/alert/alert";


export const getMain = async ( {empno, accessToken} ) => {
    try {
        console.log(empno);
        return await axios.get(
            `${process.env.REACT_APP_LOCAL_MAIN_HOST}`,
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        console.log(error);
    }
};
