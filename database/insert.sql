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

--insert into persons (first_name, middle_name, last_name, email, phone, address) values ('James', 'Anthony', 'Breslin', 'jbreslin33@gmail.com', '215-828-4924', '804 East Girard Avenue, Philadelphia PA 19125'); 
--emails 

---------------------------Akmal Tokhirov
insert into emails (email) values ('tokabduaziz@gmail.com');
insert into persons (first_name, middle_name, last_name, phone, address) values ('Akmal', null, 'Tokhirov', null, null); 

-------------------------------Alex Rodriguez
--Liz Rodriquez
insert into emails (email) values ('lizrsouza13@gmail.com');

--Alex Joao Rodriguez
insert into emails (email) values ('alexjoaorodriguez@Gmail.com');

-----------------------------------Arber Canole
--Arber Canole
insert into emails (email) values ('arberc11@gmail.com');

--Ergita Canole
insert into emails (email) values ('canolegita@hotmail.com');

---------------------------------Ben Barnieu
--Loic Barnieu
insert into emails (email) values ('lbarnieu@gmail.com');
insert into emails (email) values ('Loic@sterlingpig.com');

--Joanne Barnieu
insert into emails (email) values ('jbarnieu@yahoo.com');

--------------------------------Yancarlos Corredor
insert into emails (email) values ('mystical943@gmail.com');

----------------------------------Daniel McCallister
--Bradley McCallister
insert into emails (email) values ('Meek.McCallister@gmail.com');

--Mom
insert into emails (email) values ('miss.b.7712@gmail.com');

---------------------------------------Dominic Evangelista
--Amanda Evangelista
insert into emails (email) values ('all210@comcast.net');

--Paul Evangelista
insert into emails (email) values ('paul.evangelista@comcast.net');

--Dominic Evangelista
insert into emails (email) values ('dominice1@comcast.net');

---------------------------------Eric Girsh
--Leonard Girsh
insert into emails (email) values ('lguirch@aol.com');


------------------------------------Fabrizio Franceschelli
--Claudio Franceschelli
insert into emails (email) values ('claudio11@msn.com');

--Fabrizio Franceschelli
insert into emails (email) values ('fabriziofrances@gmail.com');

--Marilia Franceschelli
insert into emails (email) values ('marilia_twins@hotmail.com');


---------------------------------------Joshua Vidro
--Katja Pigur
insert into emails (email) values ('katjapigur@yahoo.com');

--Joshua Vidro
insert into emails (email) values ('josh_redninjago@yahoo.com');


-----------------------------------Luke Breslin
--Luke Breslin
insert into emails (email) values ('jbreslin33@gmail.com');

--------------------------------Marcelo Franceschelli
--Marcelo Franceschelli
insert into emails (email) values ('marcelofrance3@gmail.com');


--------------------------------------Nacho Obando
--Nacho Obando
insert into emails (email) values ('Maxwell.obando27@gmail.com');

--Michelle Obando
insert into emails (email) values ('Missyobando50@gmail.com');


----------------------------------Tedi Shaho
--Tedi Shaho
insert into emails (email) values ('stiljanshaho@gmail.com');


-----------------------------------Tristan Burns
--Kevin Burns
insert into emails (email) values ('kdburns31@yahoo.com');

--Jen Burns
insert into emails (email) values ('Jlynn_mo@yahoo.com');

--Tristan Burns
insert into emails (email) values ('Zenbuddhaburns@gmail.com');


----------------------------------Victor Baidal
--Alex Baidal
insert into emails (email) values ('alejo1016@hotmail.com');

--Victor Baidal
insert into emails (email) values ('vebaidal@gmail.com');





--insert into clubs (name,address) values ('Kensington Soccer Club', '307 Dauphin St, Philadelphia, PA 19133'); 

--teams
--insert into teams (name,club_id) values ('u11boys',1);

--insert into persons (first_name, middle_name, last_name, email, phone, address) values ('James', 'Anthony', 'Breslin', 'jbreslin33@gmail.com', '215-828-4924', '804 East Girard Avenue, Philadelphia PA 19125'); 

--insert into persons (first_name, middle_name, last_name, email, phone, address) values ('Luke', 'James', 'Breslin', 'lbreslin6@gmail.com', '215-839-2598', '804 East Girard Avenue, Philadelphia PA 19125'); 

--users
--insert into users (username,password) values ('l','l'); --luke

--eventos
--insert into eventos (evento_date,start_time,arrival_time,address,team_id,evento_types_id) values ('03/30/2019','20:00:00','19:50:00','4666 bristol road feasterville pa',1,1);

