--clubs
insert into clubs (name,address) values ('RC CELTA', '4666 bristol road feasterville pa'); 
insert into clubs (name,address) values ('Kensington Soccer Club', '4666 bristol road feasterville pa'); 

--users
insert into users (username,password) values ('l','l'); --luke player
insert into users (username,password) values ('lo','lo'); --louise manager
insert into users (username,password) values ('joe','joe'); --joe admin of whole site
insert into users (username,password) values ('s','s'); --stelian technical director 

--teams
insert into teams (name,club_id) values ('u15boys',1);
insert into teams (name,club_id) values ('u15girls',1);

--clubs_users
insert into clubs_users (user_id,club_id) values (1,1); --luke
insert into clubs_users (user_id,club_id) values (2,1); --loise
insert into clubs_users (user_id,club_id) values (3,1); --joe
insert into clubs_users (user_id,club_id) values (4,1); --stelian


--teams_users
insert into teams_users (user_id,team_id) values (1,1);
insert into teams_users (user_id,team_id) values (2,1); --louise manager 
							--joe and stelian need not be associated with a team

--affair_types
insert into affair_types (name) values ('Practice');
insert into affair_types (name) values ('Game');
insert into affair_types (name) values ('Meeting');

--affairs
insert into affairs (affair_date,start_time,address,team_id,affair_types_id) values ('11/08/2018','20:00:00','4666 bristol road, feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/09/2018','20:05:00','19:55:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/12/2018','20:10:00','20:00:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/14/2018','20:20:00','20:10:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/15/2018','20:30:00','20:20:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/24/2018','20:45:00','20:35:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/25/2018','20:55:00','20:45:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/26/2018','20:45:00','20:35:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/27/2018','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/28/2018','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/29/2018','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('11/30/2018','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);

