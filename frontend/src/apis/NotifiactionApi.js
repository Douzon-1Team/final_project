import axios from 'axios';
import {MainCalendarError} from "../components/common/alert/alert";

export const getNotificationTardyList = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "http://localhost:8080/main/notification",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
    }
};
