import axios from 'axios';
import {MainCalendarError} from "../components/common/alert/alert";


export const getMain = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
<<<<<<< HEAD
            'http://localhost:8080/main',
=======
            `http://localhost:8080/main`,
>>>>>>> dd875fdfee5c48bf38ae636e76938e6bc024b4bf
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        console.log(error);
    }
};
