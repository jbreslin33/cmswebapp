--clubs
insert into clubs (name,address) values ('RC CELTA', '4666 bristol road feasterville pa'); 

--users
insert into users (username,password) values ('jbreslin33@gmail.com','mibesfat');

--teams
insert into teams (name,club_id) values ('u15boys',1);

--teams_users
insert into teams_users (user_id,team_id) values (1,1);

--practices
insert into practices (event_date,start_time,address,team_id) values ('11/08/2018','20:00:00','4666 bristol road feasterville pa',1);
insert into practices (event_date,start_time,address,team_id) values ('11/09/2018','20:00:00','4666 bristol road feasterville pa',1);
insert into practices (event_date,start_time,address,team_id) values ('11/12/2018','20:00:00','4666 bristol road feasterville pa',1);
insert into practices (event_date,start_time,address,team_id) values ('11/14/2018','20:00:00','4666 bristol road feasterville pa',1);
insert into practices (event_date,start_time,address,team_id) values ('11/15/2018','20:00:00','4666 bristol road feasterville pa',1);

