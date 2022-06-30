import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DELETE_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { DELETE_EMP_INFO } from "../store/modules/Reducer/EmpAuth";

function Logout(){
    const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(empNo !== null){
        dispatch(DELETE_TOKEN());
        dispatch(DELETE_EMP_INFO());
        // removeCookieToken();
        // TODO : 1. dispatch | 2. /logout 시 서버 통신
        alert("성공적으로 로그아웃 되었습니다.");
        localStorage.removeItem("LoginChk");
        return navigate("/login");
    } else {
        alert("로그아웃에 실패했습니다.");
        return false;
    }
    return <Link to="/login" />
}

export default Logout;