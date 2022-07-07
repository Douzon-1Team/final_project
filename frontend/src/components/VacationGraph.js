import React, {useEffect, useState} from 'react';
import {getDvacation} from "../apis/ApiService";
import ECharts from 'echarts-for-react';
import {useSelector} from "react-redux";

function VacationGraph() {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
  const [deptStatus, setDeptStatus] = useState(false);
  const totalDay = 15;
  const totalHour = 120;

  useEffect(() => {
    getDvacation(empNo).then(response => {
      setDeptStatus(response)
    })
  }, []);

  console.log(deptStatus)

  return (
    <>
    { deptStatus === false ? null :
        deptStatus.map((status, i) => {
          return <>
            <ECharts
              option={
                {
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
                    data: [deptStatus[i].empName]
                  },
                  series: [
                    {
                      name: '사용 연차(Day)',
                      type: 'bar',
                      color: '#5470C6',
                      stack: 'total-day',
                      label: {
                        show: true
                      },
                      emphasis: {
                        focus: 'series'
                      },
                      data: [totalDay-deptStatus[i].remainDay]
                    },
                    {
                      name: '잔여 연차(Day)',
                      type: 'bar',
                      color: 'skyblue',
                      stack: 'total-day',
                      label: {
                        show: true
                      },
                      emphasis: {
                        focus: 'series'
                      },
                      data: [deptStatus[i].remainDay]
                    },
                    {
                      name: '사용 시간(Hour)',
                      type: 'bar',
                      color: '#5470C6',
                      stack: 'total-hour',
                      label: {
                        show: true
                      },
                      emphasis: {
                        focus: 'series'
                      },
                      data: [totalHour-deptStatus[i].remainHour]
                    },
                    {
                      name: '잔여 시간(Hour)',
                      type: 'bar',
                      color: 'skyblue',
                      stack: 'total-hour',
                      label: {
                        show: true
                      },
                      emphasis: {
                        focus: 'series'
                      },
                      data: [deptStatus[i].remainHour]
                    }
                  ]
                }
              }
            />
          </>
        })
      }
    </>
  );
}

export default VacationGraph;