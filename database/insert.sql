--roles
insert into roles (name) values ('Player'); 
insert into roles (name) values ('Parent'); --also grandparents aunts friends etc
insert into roles (name) values ('Coach'); 
insert into roles (name) values ('Manager'); 
insert into roles (name) values ('Director'); 

--users
insert into users (username,password) values ('l','l'); --luke player
insert into users (username,password) values ('cjr','cjr'); --carlos jr player
insert into users (username,password) values ('lo','lo'); --louise manager
insert into users (username,password) values ('joe','joe'); --joe admin of whole site
insert into users (username,password) values ('s','s'); --stelian technical director 

insert into users (username,password) values ('csr','csr'); -- carlos sr 

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


--this is used so that you dont lose a coach when you take him off a team, same for players and managers this is who you consider in what roles but they may not be instantiated in that role currently
--users_clubs_roles
insert into users_clubs_roles (users_id,club_id,roles_id,default_timestamp) values (1,1,1,current_timestamp); --luke kenso  player
insert into users_clubs_roles (users_id,club_id,roles_id,default_timestamp) values (1,2,3,current_timestamp); --luke kenso  coach
insert into users_clubs_roles (users_id,club_id,roles_id,default_timestamp) values (1,1,1,current_timestamp); --luke celta  player

insert into users_clubs_roles (users_id,club_id,roles_id,default_timestamp) values (3,1,2,current_timestamp); --loise parent celta
insert into users_clubs_roles (users_id,club_id,roles_id,default_timestamp) values (3,1,4,current_timestamp); --loise manager celta

insert into users_clubs_roles (users_id,club_id,roles_id,default_timestamp) values (5,1,5,current_timestamp); --stelian director celta

--these are instantiated roles, should it be linked to users_clubs_roles????
--if so fields would be (id,team_id,users_clubs_roles_id,default_timestamp)
--users_teams_roles

insert into users_clubs_roles_teams (users_clubs_roles_id,team_id,default_timestamp) values (1,5,current_timestamp); --luke kenso u14 player
insert into users_clubs_roles_teams (users_clubs_roles_id,team_id,default_timestamp) values (3,3,current_timestamp); --luke celta u15 player
insert into users_clubs_roles_teams (users_clubs_roles_id,team_id,default_timestamp) values (5,3,current_timestamp); --louise celta u15 manager


--clubs_users
insert into clubs_users (user_id,club_id) values (1,1); --luke
insert into clubs_users (user_id,club_id) values (2,1); --carlos jr
insert into clubs_users (user_id,club_id) values (3,1); --loise
insert into clubs_users (user_id,club_id) values (4,1); --joe
insert into clubs_users (user_id,club_id) values (5,1); --stelian

insert into clubs_users (user_id,club_id) values (1,2); --luke kenso
insert into clubs_users (user_id,club_id) values (2,2); --carlos jr kenso
insert into clubs_users (user_id,club_id) values (6,2); --carlos sr kenso

--affair_types
insert into affair_types (name) values ('Practice');
insert into affair_types (name) values ('Game');
insert into affair_types (name) values ('Meeting');

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

--affairs
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('12/14/2018','20:20:00','20:10:00','4666 bristol road feasterville pa',3,1);
insert into affairs (affair_date,arrival_time,start_time,end_time,address,coordinates,pitch_id,field_name,team_id,affair_types_id) values ('01/03/2019','17:45:00','18:00:00','19:45:00','3201 Richmond St, Philadelphia, PA 19134','https://www.google.com/maps/place/Monkiewicz+Playground/@39.9830128,-75.1029957,17z/data=!3m1!4b1!4m5!3m4!1s0x89c6c9d18e52815b:0x3c2c6de3ece805ca!8m2!3d39.9830128!4d-75.100807',1,'',1,1);
insert into affairs (affair_date,start_time,address,team_id,affair_types_id) values ('11/08/2018','20:00:00','4666 bristol road, feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/09/2019','20:05:00','19:55:00','4666 bristol road feasterville pa',3,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/12/2019','20:10:00','20:00:00','4666 bristol road feasterville pa',3,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/15/2019','20:30:00','20:20:00','4666 bristol road feasterville pa',3,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/24/2019','20:45:00','20:35:00','4666 bristol road feasterville pa',3,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/25/2019','20:55:00','20:45:00','4666 bristol road feasterville pa',3,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/26/2019','20:45:00','20:35:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/27/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/28/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/29/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);
insert into affairs (affair_date,start_time,arrival_time,address,team_id,affair_types_id) values ('01/30/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);

