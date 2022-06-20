import React from 'react';
import ProgressBar52h from "../components/ProgressBar52h";
import axios from "axios";

function Home() {

    const API = axios.create({
        BASE_URL: '',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    const test = async (code) => {
        try {
            const { data } = await API.post('http://localhost:8080/progressTest',JSON.stringify(code));
            return data;
        } catch {
            // Error Handling
        }
    };

    test(220101);


    return (
        <>
            <h1>🏠All in One🏡</h1>
            <ProgressBar52h attendanceWeek={} overtimeWeek={5} todayWorkTime={3}/>
        </>
    );
}

export default Home;