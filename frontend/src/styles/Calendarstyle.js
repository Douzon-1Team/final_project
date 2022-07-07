import styled from "styled-components";

const CalendarStyle = styled.div`
    display: inline-block;
    button {
        background-color: #00AAFF;
        margin-right: 5px;
    }
    margin-right: 20px;
    width: 1000px;
    .tui-full-calendar-holiday-sat{
     color : #0000FF !important;
     }
     .tui-full-calendar-holiday-sat{
     span{color : #0000FF;}
     }
    float: right;
    .tui-full-calendar-month-week-item
    .tui-full-calendar-today
    .tui-full-calendar-weekday-grid-date-decorator {
    background-color: #00AAFF;
}
.tui-full-calendar-section-button {
    display: none;
}
.tui-calendar-react-root {
    width: 100%;
    border-radius: 3px;
}
.calendar_header {
    width: 100%;
    text-align: center;
}
.today {
    margin-top: 10px;
    float: left;
    background-color: #00AAFF;
}
.date {
    padding: 15px;
    font-size: 40px;
}
.prev {
    color: #00AAFF;
    font-size: 30px;
    cursor: pointer;
    
    &:hover {
    color: #1976d2;
    }
}
.next {
    font-size: 30px;
    color: #00AAFF;
    cursor: pointer;
    
    &:hover {
    color: #1976d2;
    }
}
.dept_vacation {
    float: right;
    margin-top: 10px;
    background: #00AAFF;
}
.MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root {
    width: 30px;
}
.common.saturday.color {
    color: red;
}
.calbutton {
    float: left;
    margin-top: 10px;
}
.headerdot {
    margin: 10px;
}
.dot1 {
    color: #03bd9e;
    background: #03bd9e;
    border-radius: 8px;
    width: 12px;
    height: 12px;
    margin: 1px;
}
.dot2 {
    color: #FFA500;
    background: #FFA500;
    border-radius: 8px;
    width: 12px;
    height: 12px;
    margin: 1px;
}
.dot3 {
    color: #FF0000;
    background: #FF0000;
    border-radius: 8px;
    width: 12px;
    height: 12px;
    margin: 1px;
}
.dot4 {
    color: #00AAFF;
    background: #00AAFF;
    border-radius: 8px;
    width: 12px;
    height: 12px;
    margin: 1px;
}
`

const DeptCalendarStyle = styled.div`
    display: inline-block;
    button {
        background-color: #00AAFF;
        margin-right: 5px;
    }
    margin-right: 20px;
    width: 1500px;
    .tui-full-calendar-holiday-sat{
     color : #0000FF !important;
     }
     .tui-full-calendar-holiday-sat{
     span{color : #0000FF;}
     }
    float: right;
    .tui-full-calendar-month-week-item
    .tui-full-calendar-today
    .tui-full-calendar-weekday-grid-date-decorator {
    background-color: #00AAFF;
}
.tui-full-calendar-section-button {
    display: none;
}
.tui-calendar-react-root {
    width: 100%;
    border-radius: 3px;
}
.calendar_header {
    width: 100%;
    text-align: center;
}
.today {
    margin-top: 10px;
    float: left;
    background-color: #00AAFF;
}
.date {
    padding: 15px;
    font-size: 40px;
}
.prev {
    color: #00AAFF;
    font-size: 30px;
    cursor: pointer;
    
    &:hover {
    color: #1976d2;
    }
}
.next {
    font-size: 30px;
    color: #00AAFF;
    cursor: pointer;
    
    &:hover {
    color: #1976d2;
    }
}
.dept_vacation {
    float: right;
    margin-top: 10px;
    background: #00AAFF;
}
.MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root {
    width: 30px;
}
.common.saturday.color {
    color: red;
}
.calbutton {
    float: left;
    margin-top: 10px;
}
`
export { CalendarStyle, DeptCalendarStyle};
