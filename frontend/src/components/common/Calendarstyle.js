import styled from "styled-components";

const CalendarStyle = styled.div`
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
    width: 700px;
}
.tui-calendar-react-root {
    border: 1px solid black;
}

.calendar_header {
    width: 100%;
    text-align: center;
}

.today {
    margin-top: 10px;
    float: left;
    background: #00AAFF;
}
.date {
    padding: 15px;
    font-size: 40px;
}

.prev {
    color: #00AAFF;
    font-size: 30px;
    cursor: pointer;
}
.prev:hover {
    color: #1976d2;
}

.next {
    font-size: 30px;
    color: #00AAFF;
    cursor: pointer;
}

.next:hover {
    color: #1976d2;
}

.dept_vacation {
    float: right;
    margin-top: 10px;
    background: #00AAFF;
}

.MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root {
    width: 30px;
}

`

export default CalendarStyle;
