
--clubs
insert into clubs (name,address) values ('RC CELTA', '3331 Street Rd., Bensalem, PA 19020 Suite 240'); 
insert into clubs (name,address) values ('Kensington Soccer Club', '307 Dauphin St, Philadelphia, PA 19133'); 

--teams
insert into teams (name,club_id) values ('u11boys',1);
insert into teams (name,club_id) values ('u13boys',1);
insert into teams (name,club_id) values ('u15boys',1);
insert into teams (name,club_id) values ('u15girls',1);
insert into teams (name,club_id) values ('u14boys',2);
insert into teams (name,club_id) values ('u15boys',2);

--users
insert into users (username,password) values ('l','l'); --luke
insert into users (username,password) values ('j','j'); --jim breslin
insert into users (username,password) values ('lo','lo'); --louise 

--site_members
insert into site_members (first_name, middle_name, last_name, email, phone, address, user_id) values ('Luke', 'James', 'Breslin', 'lbreslin6@gmail.com', '215-839-2598', '804 East Girard Avenue, Philadelphia PA 19125', 1); 
insert into site_members (first_name, middle_name, last_name, email, phone, address, user_id) values ('James', 'Anthony', 'Breslin', 'jbreslin33@gmail.com', '215-828-4924', '804 East Girard Avenue, Philadelphia PA 19125', 2); 

--club_members
insert into club_members (club_id, site_member_id) values (1,1); --luke to celta
insert into club_members (club_id, site_member_id) values (2,1); --luke to kenso
insert into club_members (club_id, site_member_id) values (1,1); --jim to celta

--site_players
insert into site_players (dob,site_member_id) values ('2005-08-17',1);
--site_parents
insert into site_parents (site_member_id) values (2);

--club_players
insert into club_players (uniform_number,club_member_id) values (26,1); --luke number for celta
insert into club_players (uniform_number,club_member_id) values (4,2); --luke number for kenso
--club_parents
insert into club_parents (club_member_id) values (3); --jim parent at celta

--team_players
insert into team_players (club_players_id,team_id) values (1,3); --luke on u15 celta
insert into team_players (club_players_id,team_id) values (1,5); --luke on u14 kenso
--team_parents
insert into team_parents (club_parents_id,team_id) values (1,5); --luke on u14 kenso


--site_parents_site_players
insert into site_parents_site_players (site_parent_id,site_player_id) values (1,1);


--evento_types
insert into evento_types (name) values ('Practice');
insert into evento_types (name) values ('Game');
insert into evento_types (name) values ('Meeting');

--availability
insert into availability (name) values('Yes');
insert into availability (name) values('Maybe');
insert into availability (name) values('No');

--pitches
insert into pitches (name,club_id) values ('Bensalem Field 1',1);
insert into pitches (name,club_id) values ('Bensalem Field 2',1);
insert into pitches (name,club_id) values ('Bensalem Field 3',1);
insert into pitches (name,club_id) values ('Bensalem Field 4',1);
insert into pitches (name,club_id) values ('Monkiewicsz Field 1',1);
insert into pitches (name,club_id) values ('Monkiewicsz Field 2',1);
insert into pitches (name,club_id) values ('Monkiewicsz Field 3',1);
insert into pitches (name,club_id) values ('Monkiewicsz Field 4',1);
insert into pitches (name,club_id) values ('Casiano Field 1',2);
insert into pitches (name,club_id) values ('Casiano Field 2',2);
insert into pitches (name,club_id) values ('Towey Playground',2);

--eventos
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/14/2019','20:20:00','20:10:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,arrival_time,start_time,end_time,address,coordinates,pitch_id,field_name,team_id,evento_types_id) values ('01/03/2019','17:45:00','18:00:00','19:45:00','3201 Richmond St, Philadelphia, PA 19134','https://www.google.com/maps/place/Monkiewicz+Playground/@39.9830128,-75.1029957,17z/data=!3m1!4b1!4m5!3m4!1s0x89c6c9d18e52815b:0x3c2c6de3ece805ca!8m2!3d39.9830128!4d-75.100807',1,'',1,1);
insert into eventos (evento_date,start_time,address,team_id,evento_types_id) values ('11/08/2018','20:00:00','4666 bristol road, feasterville pa',1,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/09/2019','20:05:00','19:55:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/10/2019','20:05:00','19:55:00','Towey Playground',5,2);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/12/2019','20:10:00','20:00:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/12/2019','17:30:00','18:30:00','Towey Playground',5,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/15/2019','20:30:00','20:20:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/24/2019','20:45:00','20:35:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/25/2019','20:55:00','20:45:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/30/2019','20:55:00','20:45:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/03/2019','20:55:00','20:45:00','4666 bristol road feasterville pa',3,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/26/2019','20:45:00','20:35:00','4666 bristol road feasterville pa',1,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/27/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/28/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/29/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/30/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);

