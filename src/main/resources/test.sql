-- 일별 출퇴근기록(qr 미등록 제외)
select a.empno empno,b.dept_no deptno,on_work onwork,off_work offwork,on_off_work OnOffWork,attendance,tardy,unregistered,b.etc,DATE_FORMAT(date, '%Y-%m-%d') date
from ((select a.att_time_id, a.empno, a.dept_no, a.date as on_work, off_work, a.on_off_work, TIMESTAMPDIFF(hour, date,off_work)-1 day_worktime from attendance_time a
    join (select empno, date as off_work from attendance_time where on_off_work = 0) b on a.empno = b.empno
    where b.empno = 220102 and on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = DATE_FORMAT(off_work,'%Y%M%D'))) a
    JOIN attendance_status b on DATE_FORMAT(on_work,'%Y%M%D') = DATE_FORMAT(b.date,'%Y%M%D') and a.empno = b.empno;

-- req 휴가/근태이상 신청 들어온 것(이상근태 신청 안한데이터는 없음)
select req title, reject, agree, context, accept, reason, vacation_start VacationStart, DATE_FORMAT(vacation_start, '%Y-%m-%d') datestart, vacation_end VacationEnd, DATE_FORMAT(vacation_end, '%Y-%m-%d') dateend
from attendance_req WHERE empno = 220102 ORDER BY vacation_start;

-- qr 미등록 이상근태 데이터(신청 전)
-- status : 이상근태 발생하면 무조건 생김
select dept_no, attendance, tardy, etc, unregistered, DATE_FORMAT(date, '%Y-%m-%d') date from attendance_status where empno = 220102 and etc REGEXP '무단결근|퇴근미등록|출근미등록';

select *  from attendance_time where empno = 220102;

-- onwork, offwork, deptno, date
-- status : attendance, tardy, leave_early, vacation, unregistered, date

ALTER TABLE attendance_req ADD agree tinyint AFTER accept;


-- 1. 2022 정상 출석 일수
SELECT DATE_FORMAT(date,'%2022-%m') m, COUNT(*) count FROM attendance_status where empno = 220102 and etc is null GROUP BY m;

-- SELECT DATE_FORMAT(date,'%2022-%m') m, COUNT(*) FROM attendance_status where empno = 220102 and etc is not null GROUP BY m;
-- 2. req data & 결제완료만
-- 날짜 데이터 빼기
-- 휴가는 1일 빼고, 오전/오후 반차는 0.5일 빼자!
SELECT DATE_FORMAT(vacation_start,'%Y-%m-%d') m, COUNT(*) count, DATEDIFF(vacation_end, vacation_start) datediff FROM attendance_req where empno = 220102 and req REGEXP '휴가|오전반차|오후반차' GROUP BY m;

SELECT TIMEDIFF(vacation_end, vacation_start), vacation_start, vacation_end FROM attendance_req where empno = 220102;
-- 3. status & 결근
SELECT DISTINCT DATE_FORMAT(s.date,'%Y-%m') m, COUNT(*) count
FROM attendance_status s left join attendance_req r
                                   on DATE_FORMAT(s.date,'%Y-%m-%d') = DATE_FORMAT(r.vacation_start,'%Y-%m-%d')
where s.empno = 220102 and etc is not null and s.etc REGEXP '조퇴|지각|무단결근|퇴근미등록|출근미등록' group by m;

select * from attendance_req where empno = 220102;
select * from attendance_status where empno = 220102;
-- 1년치 월
-- 전체 출석 -> 1 row

-- 이상근태(조퇴, 지각)
-- status 결근은 따로..
-- req 결근 존재
-- -> 1 row

-- 휴가(req)
-- -> 1 row

--------------------------------------------------DeptMemberList!!
select a.empno empno, b.dept_no deptno, on_work onwork, off_work offwork, on_off_work OnOffWork, attendance, tardy, unregistered, etc, DATE_FORMAT(date, '%Y-%m-%d') date
from ((select a.att_time_id, a.empno, a.dept_no, a.date as on_work, off_work, a.on_off_work, TIMESTAMPDIFF(hour, date,off_work)-1 day_worktime from attendance_time a
    join (select empno, date as off_work from attendance_time where on_off_work = 0) b on a.empno = b.empno
    where a.empno = 220101 and on_off_work = 1 and DATE_FORMAT(a.date,'%Y%M%D') = DATE_FORMAT(off_work,'%Y%M%D'))) a
    INNER JOIN attendance_status b on DATE_FORMAT(on_work,'%Y%M%D') = DATE_FORMAT(b.date,'%Y%M%D') and a.empno = b.empno;


select req title, reject, context, accept, reason, vacation_start VacationStart, DATE_FORMAT(vacation_start, '%Y-%m-%d') datestart, vacation_end VacationEnd, DATE_FORMAT(vacation_end, '%Y-%m-%d') dateend from attendance_req WHERE empno = 220101 ORDER BY vacation_start;

-- 같은 부서 사람들 가져오기
select ar.vacation_start, ar.vacation_end, c.rank, e.empno, e.emp_name
from emp_info_comp c join employee e on c.empno = e.empno
                     join attendance_req ar on e.empno = ar.empno and ar.reject = 0
where c.dept_no in (select dept_no from emp_info_comp where empno='220101');


SELECT DATE_FORMAT(date,'%Y-%m') m, COUNT(*) count, DATE_FORMAT(date,'%m') month,
       ifnull(etc, '출근') normalwork FROM attendance_status where empno = 220101 and etc is null GROUP BY m;


SELECT DATE_FORMAT(vacation_start,'%Y-%m') m, COUNT(*) count, DATEDIFF(vacation_end, vacation_start) datediff, req vacation, DATE_FORMAT(vacation_start,'%m') month FROM attendance_req where empno = 220102 and req REGEXP '휴가|오전반차|오후반차|시간연차' GROUP BY m;

-- 1. 사원 프로필 사진
-- 2. 사원 이름
-- 3. rank
-- 4. 출/퇴근 여부 -> 이상근태 & 휴가
-- 5. 사내번호
-- 6. 이메일

-- dept_01 = 19명

select emp_profile, e.empno, e.emp_name name, c.rank, DATE_FORMAT(date,'%Y-%m-%d'), extension_num, email, c.dept_no, attendance, tardy, agree, etc, unregistered
from emp_info_comp c join employee e on c.empno = e.empno join attendance_status `as` on e.empno = `as`.empno and DATE_FORMAT(date,'%Y-%m-%d') = DATE_FORMAT('2022-06-29 14:00:00', '%Y-%m-%d')
where c.dept_no in (select dept_no from emp_info_comp where empno=220101);

-- and DATE_FORMAT(date,'%Y-%m-%d')=2022-06-17
-- join attendance_status at on e.empno = at.empno

show grants for admin;

select emp_profile, e.empno, e.emp_name name, c.rank, extension_num, email, c.dept_no, IFNULL(attendance, 0) attendance, IFNULL(tardy, 0) tardy, IFNULL(etc, '출근') etc, IFNULL(unregistered, 0) unregistered
from emp_info_comp c join employee e on c.empno = e.empno left join attendance_status `as` on e.empno = `as`.empno and DATE_FORMAT(date,'%Y-%m-%d') = DATE_FORMAT('2022-06-29 14:00:00', '%Y-%m-%d')
where c.dept_no in (select dept_no from emp_info_comp where empno=220101);


select * from emp_info_comp where dept_no = '01';

-- join attendance_status `as` on e.empno = `as`.empno and DATE_FORMAT(date,'%Y-%m-%d') = DATE_FORMAT('2022-06-29 14:00:00', '%Y-%m-%d')
-- IFNULL(unregistered, IFNULL(etc, '미출근'))
-- status에 값이 존재하지 않는 녀석은 아직 출근 qr을 찍지 않은 녀석이므로 attendance와 tardy, unregisered가 null값이다
-- -> 때문에 null은 우선 0으로 처리
-- etc또한 출근미등록으로 변경


select e.empno, e.emp_name name, c.rank, c.dept_no, etc, DATE_FORMAT(date, '%m') m, count(emp_name) count, DENSE_RANK() OVER (ORDER BY e.emp_name) sort
            from emp_info_comp c join employee e on c.empno = e.empno join attendance_status `as` on e.empno = `as`.empno and etc REGEXP '조퇴|지각|무단결근|퇴근미등록|출근미등록'
            where c.dept_no in (select dept_no from emp_info_comp where empno=220101) group by empno, m;
