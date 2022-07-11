import React, {useEffect, useState} from 'react';
import {getDvacation} from "../../../apis/ApiServices";
import ECharts from 'echarts-for-react';
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {DayWorkChartStyle} from "../../../styles/DayWorkChartStyle";
import CollapseList from "../List/CollapseList";

function VacationGraph() {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
  const [name, setName] = useState([]);
  const [totremainday, setTotRemainDay] = useState([]);
  const [remainday, setRemainDay] = useState([]);
  const [totremainhour, setTotReamainHour] = useState([]);
  const [remainhour, setRemainHour] = useState([]);

  const [status, setStatus] = useState(true);
  const [response, setResponse] = useState([]);

  const totalDay = 15;
  const totalHour = 120;

  useEffect(() => {
    console.log(empNo);
    getDvacation(empNo).then(response => {
      let totday = [];
      let tothour = [];
      let name = [];
      let day = [];
      let hour = [];
      // deptNo: "01"
      // empName: "강우혁"
      // empno: "210108"
      // remainDay: "15"
      // remainHour: "120"
      setResponse(response.data);
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].remainHour);
        console.log(totalDay-response[i].remainDay);
        console.log(totalDay-response[i].remainDay);
        totday.push(totalDay-response[i].remainDay);
        tothour.push(totalHour-response[i].remainHour);
        name.push(response[i].empName);
        day.push(response[i].remainDay);
        hour.push(response[i].remainHour);
      }
      setName([...name]);
      setTotRemainDay([...totday]);
      setRemainDay([...day]);
      setTotReamainHour([...tothour]);
      setRemainHour([...hour]);
    })
  }, []);
  console.log(totremainday);
  console.log(remainday);
  console.log(totremainhour);
  console.log(remainhour);

  const [options, setOptionss] = useState( {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {},
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [
      {
        name: '사용 연차(Day)',
        type: 'bar',
        color: '#64CD3C',
        stack: 'total-day',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: '잔여 연차(Day)',
        type: 'bar',
        color: '#FF9100',
        stack: 'total-day',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: '사용 시간(Hour)',
        type: 'bar',
        color: '#00AAFF',
        stack: 'total-hour',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: '잔여 시간(Hour)',
        type: 'bar',
        color: '#FFC81E',
        stack: 'total-hour',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: []
      }
    ]
  })
  options.yAxis.data = [...name];
  console.log(options.series);
  options.series[0].data = [...totremainday];
  options.series[1].data = [...remainday];
  options.series[2].data = [...totremainhour];
  options.series[3].data = [...remainhour];

  return (
    <DayWorkChartStyle style={{marginLeft:'15%'}}>
      <h3>부서원 연차 사용 현황</h3>
      <Button className="vg" variant = "outlined"
              onClick={() => setStatus((prev) => !prev)}>
        {status ? "목록형" : "차트형"}
      </Button>
    {remainhour.length !== 0 && status ?
            <ECharts
              option={options}
              style={{width: '700px', height: '500px'}}
            />
      : <CollapseList state={response}/> }
    </DayWorkChartStyle>
  );
}

export default VacationGraph;
