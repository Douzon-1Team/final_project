import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DELETE_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { DELETE_EMP_INFO } from "../store/modules/Reducer/EmpAuth";
import {LogoutFail, LogoutSuccess} from "../components/common/alert/alert";
import {logoutUser} from "../apis/ApiServices";
import {useEffect} from "react";

function Logout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logout(){
        const response = await logoutUser();

        if(response){
            dispatch(DELETE_TOKEN());
            dispatch(DELETE_EMP_INFO());
            localStorage.removeItem("LoginChk");
            LogoutSuccess();
            return navigate("/");
        } else {
            LogoutFail();
            return false;
        }
    }
    useEffect(() => {
        logout()
    }, []);

    return <Link to="/" />
}

export default Logout;
