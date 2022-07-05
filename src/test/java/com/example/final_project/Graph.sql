select *
from attendance_status;

select *
from attendance_status
where vacation like '퇴근미등록' or vacation = '무단결근';

select *
from attendance_status
where (attendance = 0 or unregistered = 0 or tardy = 1 or agree = 1) and vacation != '휴가' ;

select *
from attendance_status
where vacation like '휴가';