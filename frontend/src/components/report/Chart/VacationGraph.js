import React, {useEffect, useState} from 'react';
import {getDvacation} from "../../../apis/ApiServices";
import ECharts from 'echarts-for-react';
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {DayWorkChartStyle} from "../../../styles/DayWorkChartStyle";
import CollapseList from "../List/CollapseList";

function VacationGraph() {
  const empno = useSelector( (state) => state.EMP_INFO.empInfo[0] );
  const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
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
    getDvacation({empno, accessToken}).then(response => {
      let totday = [];
      let tothour = [];
      let name = [];
      let day = [];
      let hour = [];
      setResponse(response.data);
      for (let i = 0; i < response.data.length; i++) {
        totday.push(totalDay-response.data[i].remainDay);
        tothour.push(totalHour-response.data[i].remainHour);
        name.push(response.data[i].empName);
        day.push(response.data[i].remainDay);
        hour.push(response.data[i].remainHour);
      }
      setName([...name]);
      setTotRemainDay([...totday]);
      setRemainDay([...day]);
      setTotReamainHour([...tothour]);
      setRemainHour([...hour]);
    })
  }, []);

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
  options.series[0].data = [...totremainday];
  options.series[1].data = [...remainday];
  options.series[2].data = [...totremainhour];
  options.series[3].data = [...remainhour];

  return (
    <DayWorkChartStyle style={{marginLeft:'5%'}}>
      <h3>부서원 연차 사용 현황</h3>
      <Button className="vg" variant = "outlined"
              onClick={() => setStatus((prev) => !prev)}>
        {status ? "목록형" : "차트형"}
      </Button>
    {remainhour.length !== 0 && status ?
            <ECharts
              option={options}
              style={{width: '1200px', height: '650px'}}
            />
      : <CollapseList state={response}/> }
    </DayWorkChartStyle>
  );
}

export default VacationGraph;
