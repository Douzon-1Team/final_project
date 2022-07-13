import React, {useState, useEffect} from 'react';
import axios from 'axios';
import EmpTable from "./EmpTable";
import {useSelector} from "react-redux";

function EmpList() {
    const [loading,setLoading] =useState(true);
    const [rowData, setRowData] = useState([]);
    const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("https://allinone.kro.kr/admin/list",
                {headers: {Authorization: accessToken}}).then((res) => {return res});
            setRowData(res.data);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            { loading ? <>Loading...</> : <EmpTable data={rowData} ></EmpTable>}
        </>
    );
}

export default EmpList;
