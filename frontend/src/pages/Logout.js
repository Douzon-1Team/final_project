import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DELETE_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { DELETE_EMP_INFO } from "../store/modules/Reducer/EmpAuth";
import {LogoutFail, LogoutSuccess} from "../components/common/alert/alert";

function Logout(){
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(empNo !== null){
        dispatch(DELETE_TOKEN());
        dispatch(DELETE_EMP_INFO());
        // removeCookieToken();
        // TODO : 1. dispatch | 2. /logout 시 서버 통신
        LogoutSuccess();
        localStorage.removeItem("LoginChk");
        return navigate("/login");
    } else {
        LogoutFail();
        return false;
    }
    return <Link to="/login" />
}

export default Logout;
