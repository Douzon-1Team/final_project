import axios from 'axios';
import {MainCalendarError} from "../components/common/alert/alert";

export const getGraph52hData = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "http://localhost:8080/main/graph52h",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
        MainCalendarError();
    }
};
