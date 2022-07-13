import axios from 'axios';
import {MainCalendarError} from "../components/common/alert/alert";

export const getNotificationTardyList = async ( {empno, accessToken} ) => {
    try {
        return await axios.get(
            "https://allinone.kro.kr/main/notification",
            {
                params: {empno},
                headers: {'Authorization': accessToken}
            }
        );
    } catch (error) {
    }
};
