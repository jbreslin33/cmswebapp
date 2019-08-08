--clubs
insert into administrators (person_id) values (1);

insert into clubs (name,address) values ('RC CELTA USA', '2913 Street Rd, Bensalem, PA 19020'); 

insert into club_persons (club_id,person_id) values (1,1);
insert into club_administrators (club_person_id,administrator_id) values (1,1);

insert into club_emails (club_id,email_id) values (1,1);

--teams
insert into teams (club_id,name) values (1,'u16 Caos');
insert into team_club_persons (team_id,club_person_id) values (1,1);

insert into managers (person_id) values (1);
insert into club_managers (club_person_id,manager_id) values (1,1);
insert into team_club_managers (team_club_person_id,club_manager_id) values (1,1);

--emails 

--akmal Tokhirov
insert into emails (email) values ('tokabduaziz@gmail.com');

--alex rodriguez
--Liz Rodriquez
insert into emails (email) values ('lizrsouza13@gmail.com');

--Alex Joao Rodriguez
insert into emails (email) values ('alexjoaorodriguez@Gmail.com');

--Arber Canole
--Arber Canole
insert into emails (email) values ('arberc11@gmail.com');

--Ergita Canole
insert into emails (email) values ('canolegita@hotmail.com');

--Ben Barnieu
--Loic Barnieu
insert into emails (email) values ('lbarnieu@gmail.com');
insert into emails (email) values ('Loic@sterlingpig.com');

--Joanne Barnieu
insert into emails (email) values ('jbarnieu@yahoo.com');

--Yancarlos Corredor
insert into emails (email) values ('mystical943@gmail.com');

--Daniel McCallister
--Bradley McCallister
insert into emails (email) values ('Meek.McCallister@gmail.com');

--Mom
insert into emails (email) values ('miss.b.7712@gmail.com');


--insert into clubs (name,address) values ('Kensington Soccer Club', '307 Dauphin St, Philadelphia, PA 19133'); 

--teams
--insert into teams (name,club_id) values ('u11boys',1);

--insert into persons (first_name, middle_name, last_name, email, phone, address) values ('James', 'Anthony', 'Breslin', 'jbreslin33@gmail.com', '215-828-4924', '804 East Girard Avenue, Philadelphia PA 19125'); 

--insert into persons (first_name, middle_name, last_name, email, phone, address) values ('Luke', 'James', 'Breslin', 'lbreslin6@gmail.com', '215-839-2598', '804 East Girard Avenue, Philadelphia PA 19125'); 

--users
--insert into users (username,password) values ('l','l'); --luke

--eventos
--insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/30/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);

