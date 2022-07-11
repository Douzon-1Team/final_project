import axios from 'axios';
import {DeptVacationError} from "../components/common/alert/alert";


export const getMain = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "http://localhost:8080/main/dvacation",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        DeptVacationError();
    }
};
