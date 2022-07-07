-- dept
insert into dept (dept_no, dept_name)
values ('01','개발팀');
insert into dept (dept_no, dept_name)
values ('02','기술지원팀');


-- employee + info
insert into employee (empno, emp_name, emp_pwd, role)
values ('220101','임요환','{bcrypt}$2a$10$jv79lkMbyx8qBvGsdsUe5uaTF9Rlqh9H/a7LbW00UaTNKf5lnr5au','ROLE_MANAGER');

insert into emp_info_comp (empno, dept_no, `rank`, email, extension_num, remaining_annual_leave)
values ('220101','01','과장','220101@dz.com','1234','15');

insert into employee (empno, emp_name, emp_pwd, role)
values ('220202','홍진호','{bcrypt}$2a$10$jv79lkMbyx8qBvGsdsUe5uaTF9Rlqh9H/a7LbW00UaTNKf5lnr5au','ROLE_USER');

insert into emp_info_comp (empno, dept_no, `rank`, email, extension_num, remaining_annual_leave)
values ('220202','02','대리','220202@dz.com','2222','15');

insert into employee (empno, emp_name, emp_pwd, role)
values ('admin','admin','{bcrypt}$2a$10$jv79lkMbyx8qBvGsdsUe5uaTF9Rlqh9H/a7LbW00UaTNKf5lnr5au','ROLE_ADMIN');

-- attendance

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-15 08:46:53','8','1','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-15 08:58:13','8','1','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-15 18:02:37','8','0','02');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-15 18:18:00','8','0','01');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-16 08:56:13','8','1','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-16 08:56:13','8','1','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-16 18:32:25','8','0','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-16 20:02:17','8','0','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-17 08:32:23','8','1','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-17 08:52:43','8','1','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-17 18:19:22','8','0','02');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-17 20:12:27','8','0','01');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-18 08:52:43','8','1','02');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-18 08:52:43','8','1','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-19 20:12:27','8','0','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-19 20:12:27','8','0','01');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-18 08:52:43','8','1','02');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-18 20:12:27','8','1','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-19 08:52:43','8','0','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-19 20:12:27','8','0','01');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-20 08:52:23','8','1', '01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-20 08:54:42','8','1','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-20 18:12:29','8','0','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-20 18:32:33','8','0','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-21 08:48:13','8','1','02');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-21 08:54:43','8','1','01');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-21 18:05:18','8','0','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-21 18:15:31','8','0','02');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-22 08:48:13','8','1','02');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-22 08:54:43','8','1','01');

insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220101','2022-06-22 19:25:18','8','0','01');
insert into attendance_time (empno, date, time, on_off_work, dept_no) values ('220202','2022-06-22 18:15:31','8','0','02');
