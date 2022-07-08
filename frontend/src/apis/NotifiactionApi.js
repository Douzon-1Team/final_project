import axios from 'axios';
import {MainCalendarError} from "../components/common/alert/alert";

export const getNotificationTardyList = async ( {empno} ) => {
    try {
        return await axios.get(
            "http://localhost:8080/notification",
            {
                params: {empno}
            }
        );
    } catch (error) {
        MainCalendarError();
    }
};
