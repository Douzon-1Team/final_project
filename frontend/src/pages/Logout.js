import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DELETE_TOKEN } from '../store/modules/Reducer/TokenAuth';
import { DELETE_EMP_INFO } from "../store/modules/Reducer/EmpAuth";
import {LogoutFail} from "../components/common/alert/alert";
import {useEffect} from "react";
import {logoutUser} from "../apis/ApiServices";

function Logout(){
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logout(){
        const response = await logoutUser({ accessToken });

        if(response){
            dispatch(DELETE_TOKEN());
            dispatch(DELETE_EMP_INFO());
            localStorage.removeItem("LoginChk");
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
