import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import {DayWorkChatStyle} from '../styles/DayWorkChatStyle'
import _ from 'lodash';

const DayWorkChat = (props) => {
    // TODO : 출/퇴근 기록은 목록형에서 보여주기
    // TODO : 중복 이름 제거 후 각각 넣어줌
    // TODO : 총 근무시간이 8시간을 넘어간다면 초과근무 데이터로 넣어줌
    const [data, setdata] = useState([]);

    // setdata(workmember);
    // ['홍길동', 43.3, 85.8, 93.7],
    // -> name, 총 근무시간(time, default 8), 8이상일경우 +, 출근&퇴근기록

    const worker = [];
    for (let i = 0; i < props.data.length; i++) {
        if (props.data[i].onOffWork === true) {
            worker.push(props.data[i]);
        }
    }
    console.log(worker);
    let worktime = _.map(worker, 'totaltime'); // 정상 출근
    console.log(worktime);
    let overtimes; // 초과근무 배열
    (overtimes = []).length = worktime.length;
    overtimes.fill(0);
    console.log(overtimes);
    function overtime(n) {
        for (let i = 0; i < overtimes.length; i++) {
            console.log(n);
            if (worktime[i] > 8) {
                overtimes[i] = worktime[i]-8;
            }
        }
        return overtimes;
    }
    const overwork = _.map([8], overtime);
    let workmember = [];
    for (let j = 0; j < worker.length; j++) {
        if (j == 0 ) workmember.push(['product', '총 근무시간', '초과근무시간']);
        workmember.push([worker[j].name, worktime[j], overtimes[j]])
    }

    useEffect(() => {
        setdata([...workmember]);
    }, [])

    // TODO : 출/퇴근 시간표시 -> bar 1개
    // TODO : 총 근무시간 & 초과근무시간 표시 -> bar2개

    const [options, setOptions] = useState({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            type: 'value'
        },
        dataset: {
            // source에 데이터는 append해주는 식으로 추가하면 될듯
            source: [

            ]
        },
        series: [
            {
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
            },
            {
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
            },
        ]
    });
    // console.log(workmember);
    // console.log(workmember);
    options.dataset.source = [...workmember];
    console.log(options.dataset.source);

    return (
        <>
            {options.dataset.source.length !== 0 ?
        <DayWorkChatStyle>
            <ECharts
                option={options}
                style={{width: "1000px", height:"800px"}}
            />
        </DayWorkChatStyle>
            : <></> }
        </>
    );
}

export default DayWorkChat;
