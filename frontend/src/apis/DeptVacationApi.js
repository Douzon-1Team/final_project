import axios from 'axios';
import {DeptVacationError} from "../components/common/alert/alert";


export const getMain = async ( {empno} ) => {
    try {
        console.log(empno);
        return await axios.get(
            "http://localhost:8080/main/dvacation",
            {
                params: {empno}
            }
        );
    } catch (error) {
        DeptVacationError();
    }
};
