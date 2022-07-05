import React, {useState, useEffect} from 'react';
import axios from 'axios';
import EmpTable from "./EmpTable";
import Layout from "../common/Layout";

function EmpList() {
    const [loading,setLoading] =useState(true);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://localhost:8080/list").then((res) => {return res});
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
