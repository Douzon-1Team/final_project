
-- 진행중인 휴가
select a.req_id, a.empno, req, context, reject, accept, reason, vacation_start, vacation_end, b.att_stat_id, dept_no, attendance, tardy, agree, etc, unregistered, date, (TIMESTAMPDIFF(day,vacation_start ,vacation_end)+1) as '기간'
from attendance_req a left outer join attendance_status b on a.empno = b.empno
where date_format(date,'%y%m%d') between date_format(a.vacation_start,'%y%m%d') and date_format(a.vacation_end,'%y%m%d');

-- 특정 인원 1일 근무시간
select a.att_time_id, a.empno, a.dept_no, a.date as onwork, offwork, a.on_off_work, TIMESTAMPDIFF(hour, date,offwork)-1 근무시간 from attendance_time a
join (select empno, date as offwork from attendance_time where on_off_work = 0) b on a.empno = b.empno
where a.empno = 220101 and on_off_work = 1 and date_format(a.date,'%y%m%d') = date_format(b.offwork,'%y%m%d');

-- 1일 근무 정보
select a.empno, b.dept_no, on_work, off_work, day_worktime, day_worktime-8 overwork, attendance, tardy, agree, unregistered, etc
from ((select a.att_time_id, a.empno, a.dept_no, a.date as on_work, off_work, a.on_off_work, TIMESTAMPDIFF(hour, date,off_work)-1 day_worktime from attendance_time a
join (select empno, date as off_work from attendance_time where on_off_work = 0) b on a.empno = b.empno
where on_off_work = 1 and a.empno =220101 and DATE_FORMAT(a.date,'%Y%M%D') = DATE_FORMAT(off_work,'%Y%M%D'))) a
INNER JOIN attendance_status b on DATE_FORMAT(on_work,'%Y%M%D') = DATE_FORMAT(b.date,'%Y%M%D') and a.empno = b.empno;

-- 달력용?(실패)
select * from attendance_req a
INNER JOIN attendance_status b ON a.empno = b.empno
INNER JOIN (select a.att_time_id, a.empno, a.dept_no, a.date as onwork, offwork, a.time, a.on_off_work from attendance_time a
join (select empno, date as offwork from attendance_time where on_off_work = 0) b on a.empno = b.empno
where a.empno = 220101 and on_off_work = 1 and day(a.date) = day(b.offwork)) c ON a.empno = c.empno AND DAY(b.date) = DAY(c.onwork)
WHERE a.empno = 220101 and ((day(b.date) between day(a.vacation_start) and day(a.vacation_end)) or day(now())<day(vacation_start));

-- 1주간 근무시간 합
(select a.empno, b.dept_no, on_work, off_work, day_worktime, day_worktime-8 overwork, attendance, tardy, agree, unregistered, etc, week_worktime
from ((select a.att_time_id, a.empno, a.dept_no, a.date as on_work, off_work, a.on_off_work, TIMESTAMPDIFF(hour, date,off_work)-1 day_worktime from attendance_time a
join (select empno, date as off_work from attendance_time where on_off_work = 0) b on a.empno = b.empno
where on_off_work = 1 and day(a.date) = day(b.off_work))) a
INNER JOIN attendance_status b
INNER JOIN (SELECT empno, sum(time) week_worktime
            FROM attendance_time
            where empno = 220101 and on_off_work=1
            GROUP BY DATE_FORMAT(date, '%Y%U')) c
on day(on_work) = day(b.date) and a.empno = b.empno)
;

select dayofweek(date)
from attendance_time
where empno = 220101;

SELECT a.empno, date FROM attendance_time a
where a.empno = 220101
GROUP BY DATE_FORMAT(date, '%Y%U');

-- 주간 근무시간 합
select sum(TIMESTAMPDIFF(hour, date,off_work)-1) week_worktime from attendance_time a
join (select empno, date as off_work from attendance_time where empno='220101' and on_off_work = 0) b on a.empno = b.empno
where on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = date_format(b.off_work,'%Y%M%D') and DATE_FORMAT(date, '%Y%U') = DATE_FORMAT(now(), '%Y%U')
GROUP BY DATE_FORMAT(date, '%Y%U');


-- 초과 근무시간
select sum(if(dayofweek(date)=7 or dayofweek(date)=1,TIMESTAMPDIFF(hour, date,off_work),GREATEST(TIMESTAMPDIFF(hour, date,off_work)-9,0))) week_worktime from attendance_time a
join (select empno, date as off_work from attendance_time where empno='220101' and on_off_work = 0) b on a.empno = b.empno
where on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = date_format(b.off_work,'%Y%M%D') and DATE_FORMAT(date, '%Y%U') = DATE_FORMAT(now(), '%Y%U')
GROUP BY DATE_FORMAT(date, '%Y%U');

select TIMESTAMPDIFF(hour,date,now())
from attendance_time
where empno='220101' and date_format(date,'%y%m%d') = date_format(now(),'%y%m%d') and on_off_work=1;


select sum(TIMESTAMPDIFF(hour, date,off_work)-1) attendanceWeek from attendance_time a
join (select empno, date as off_work from attendance_time where empno= '220101' and on_off_work = 0) b on a.empno = b.empno
where on_off_work = 1 and day(a.date) = day(b.off_work) and DATE_FORMAT(date, '%Y%U') = DATE_FORMAT(now(), '%Y%U')
GROUP BY DATE_FORMAT(date, '%Y%U');


-- 연차 사용시간
select
    case
        when req = '휴가'
        then (TIMESTAMPDIFF(day,vacation_start,vacation_end)+1)*8
        when req = '오전반차' || '오후반차'
        then 4
        when req = '시간연차'
        then TIMESTAMPDIFF(HOUR ,vacation_start,vacation_end)
    end 연차사용시간
from attendance_req
where empno= 220101 and accept=1;

-- 총 연차 일수 계산
select 15 + if(year(created_at) = year(now()),0,floor(((TIMESTAMPDIFF(YEAR , created_at, now()))-1)/2)) 연차일수
from employee
where empno = 220101;

-- 잔여 연차 일수
select FLOOR( remaining_annual_leave/8 )
from emp_info_comp
where empno = 220101;

-- 잔여 연차 시간
select remaining_annual_leave%8
from emp_info_comp
where empno = 220101;


-- 오늘 근무 시간(지금까지)
select TIMESTAMPDIFF(hour,date,now())
from attendance_time
where empno = 220101 and on_off_work = 1 and date_format(date,'%y%m%d') = date_format(now(),'%y%m%d');



    select (TIMESTAMPDIFF(hour, date,off_work)-1) attendanceWeek, date from attendance_time a
    join (select empno, date as off_work from attendance_time where empno= 220102 and on_off_work = 0) b on a.empno = b.empno
    where on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = date_format(b.off_work,'%Y%M%D') and DATE_FORMAT(date, '%Y%U') = DATE_FORMAT(now(), '%Y%U');


select *
from attendance_time
where empno = 220102 and date_format(date, '%y%U') = date_format(now(),'%y%U');

select a.dept_no dept_no, get_off_work_time_set,get_to_work_time_set,get_off_work_time_set_f,get_to_work_time_set_f from manager_setting a join (select dept_no from emp_info_comp where empno = 220101) b on a.dept_no = b.dept_no;

SELECT a.empno empno, a.dept_no dept_no, attendance, tardy, agree, etc, unregistered,flexible FROM attendance_status a
join emp_info_comp b
on a.empno = b.empno
WHERE a.empno=220101 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d');

SELECT a.empno empno, a.dept_no dept_no, attendance, tardy, agree, etc, unregistered, flexible, get_to_work_time_set, get_off_work_time_set, get_to_work_time_set_f, get_off_work_time_set_f FROM attendance_status a
join emp_info_comp b
join manager_setting c
on a.empno = b.empno and a.dept_no = b.dept_no = c.dept_no
WHERE a.empno=220101 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d');


select * from attendance_status where empno = 220101;

insert into attendance_status (empno, dept_no, etc) values ();

select empno from employee where empno not like '%admin%';


select empno,dept_no,date,time,on_off_work from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and empno = 220101 and on_off_work = 1;

insert into attendance_time (empno, dept_no, on_off_work) values ();

-- update attendance_status set #{columns} = #{values} where empno = #{empno} and date_format(date,'%y%m%d') = date_format(now(),'%y%m%d');

select *
from attendance_status_test
where unregistered = 0;

select *
from attendance_time where date like '2022-06-29%' and on_off_work = 0;

select date_format(date,'%Y-%m-%d')
from attendance_time
where empno = 220101 and date like '2022-06-28%';

select * from attendance_status where empno = 220101 and date like '2022-06-29%';

select *
from attendance_req;

select *
from attendance_status
where etc = '휴가';

select * from attendance_req where DATEDIFF(vacation_end,now())>0 and DATEDIFF(vacation_start,now()) <= 0 and req REGEXP '휴가|오전반차|오후반차' and  accept=1;

select req,vacation_start,vacation_end, DATEDIFF(now(), vacation_end), DATEDIFF(now(), vacation_start), accept
from attendance_req
where timestampdiff(day ,now(), vacation_end)>=0 and timestampdiff(day ,now(), vacation_start) <= 1;

select DATEDIFF(vacation_start, vacation_end)
from attendance_req
where timestampdiff(day ,now(), vacation_end)>=0 and timestampdiff(day ,now(), vacation_start) <= 1;

select *
from attendance_time
where date like '2022-07-01%' and empno = 220102;

select * from attendance_req
join attendance_status
where DATEDIFF(vacation_end,now()) >= 0 and DATEDIFF(vacation_start,now()) <= 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 ;

select *
from attendance_req
where empno = 220102;

select * from attendance_req where req='시간연차' and DATE_FORMAT(vacation_start,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and accept=1 and empno = 220109;

select a.empno, emp_name, month(date), count(case when b.empno=220102 then 1 end and case when etc REGEXP '출근미등록|퇴근미등록|지각|결근' then 1 end)
from employee a
inner join attendance_status b
where a.empno = 220102
group by month(date);

select a.dept_no, dept_name, month(date), count(case when b.dept_no = '01' then 1 end and case when etc REGEXP '출근미등록|퇴근미등록|지각|결근' then 1 end)
from dept a
inner join attendance_status b
where a.dept_no = '01'
group by month(date);

select *
from attendance_status
where empno = 220102;

SELECT a.empno empno, a.dept_no dept_no, attendance, tardy, etc, unregistered, flexible, get_to_work_time_set, get_off_work_time_set, get_to_work_time_set_f, get_off_work_time_set_f,date,
(select req from attendance_req where DATEDIFF(vacation_end,'2022-06-29T10:59:59') >= 0 and DATEDIFF(vacation_start,'2022-06-29T10:59:59') <= 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = 220109) req
FROM attendance_status a join emp_info_comp b join manager_setting c
on a.empno = b.empno and a.dept_no = b.dept_no = c.dept_no
WHERE a.empno = 220109 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT('2022-06-29T10:59:59','%y%m%d');


select *
from attendance_time
where empno= 220109 and date like '2022-07-05%';

select req from attendance_req where DATEDIFF(vacation_end,now()) >= 0 and DATEDIFF(vacation_start,now()) <= 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = 220109;


select *
from employee;

select *
from emp_info_comp
where dept_no = 01;

select *
from attendance_req
where empno = 220109;

select *
from attendance_status
where empno = 220109;

select dept_no from emp_info_comp where empno = 220101;

select *
from attendance_status
where empno = 220102 and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m');

select empno, count(case when attendance = 1 then 1 end) attendance, count(case when tardy = 1 then 1 end) tardy, count(case when etc = '결근' then 1 end) absenteeism, count(case when etc = '휴가' then 1 end) vacation
from attendance_status
where empno = 220102 and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m');


select count(case when attendance = 1 then 1 end) from attendance_status where empno = 220102 and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m');
select count(case when tardy = 1 then 1 end) from attendance_status where empno = 220102 and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m');
select count(case when etc = '결근' then 1 end) from attendance_status where empno = 220102 and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m');
select count(case when etc = '휴가' then 1 end) from attendance_status where empno = 220102 and DATE_FORMAT(date,'%y%m') = DATE_FORMAT(now(),'%y%m');

select *
from attendance_time
where on_off_work = 1;

select *
from attendance_status a join attendance_time b
on a.empno = b.empno
where tardy=1 and DATE_FORMAT(a.date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d');

select emp_name, emp_profile
from employee;


-- 한시간마다 지각 체크
select a.empno, flexible, get_to_work_time_set,get_to_work_time_set_f,
(select req from attendance_req where DATEDIFF(vacation_end,now()) >= 0 and DATEDIFF(vacation_start,now()) <= 0 and req REGEXP '휴가|오전반차|오후반차|시간연차' and  accept=1 and empno = 220109) req
from attendance_status_test a join manager_setting b join emp_info_comp c
on a.dept_no = b.dept_no and a.empno = c.empno
where attendance=0 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and a.empno = 220109;

select * from attendance_status_test where attendance=0 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d');

select *
from attendance_time;

select *
from attendance_status_test a
left outer join attendance_time b
on a.empno = b.empno and DATE_FORMAT(a.date,'%y%m%d') =DATE_FORMAT(b.date,'%y%m%d')
where a.attendance = 0 and DATE_FORMAT(a.date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d');


select * from attendance_status where tardy=1 and DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d');

select emp_profile from employee where empno;

select date from attendance_time where DATE_FORMAT(date,'%y%m%d') = DATE_FORMAT(now(),'%y%m%d') and on_off_work = 1 and empno = 220101;
