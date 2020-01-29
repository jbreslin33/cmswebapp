
--------------------------------------------------------------INSERTS
--INSERT CAOS
--
CREATE OR REPLACE PROCEDURE p_insert_caos(int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_team_id teams.id%TYPE;

        returning_person_id_player_a persons.id%TYPE;
        returning_person_id_player_b persons.id%TYPE;
        returning_person_id_father persons.id%TYPE;
        returning_person_id_mother persons.id%TYPE;
        returning_person_id_other persons.id%TYPE;

        returning_email_id_player_a emails.id%TYPE;
        returning_email_id_player_b emails.id%TYPE;
        returning_email_id_father_a emails.id%TYPE;
        returning_email_id_father_b emails.id%TYPE;
        returning_email_id_mother emails.id%TYPE;
        returning_email_id_other emails.id%TYPE;
        
	returning_dob_id dobs.id%TYPE;

	returning_club_person_id_player_a club_persons.id%TYPE;
	returning_club_person_id_player_b club_persons.id%TYPE;
	returning_club_person_id_father club_persons.id%TYPE;
	returning_club_person_id_mother club_persons.id%TYPE;

	returning_player_id players.id%TYPE;
	returning_club_player_id club_players.id%TYPE;
	returning_team_club_person_id team_club_persons.id%TYPE;


BEGIN
	--TEAM
	insert into teams (club_id,name) values (1,'u16 Caos') returning id into returning_team_id;
	insert into team_club_persons (team_id,club_person_id) values (1,1) returning id into returning_team_club_person_id;

	insert into managers (person_id) values (1);
	insert into club_managers (club_person_id,manager_id) values (1,1);

	insert into team_club_persons_club_administrators (team_club_person_id, club_administrator_id) values (returning_team_club_person_id, 1);
	insert into team_club_persons_club_managers (team_club_person_id,club_manager_id) values (1,1);



	--PLAYERS
	---------------------------Akmal Tokhirov

	--EMAILS
	insert into emails (email) values ('tokabduaziz@gmail.com') returning id into returning_email_id_player_a;

	--PERSONS
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Akmal', null, 'Tokhirov', null, null) returning id into returning_person_id_player_a;

	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);

	--CLUB_EMAILS
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);

	--CLUB_PERSONS
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;

	--PLAYERS
	insert into dobs (dob) values ('2004-08-25') returning id into returning_dob_id;
	insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

	--CLUB_PLAYERS
	insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 7) returning id into returning_club_player_id;

	--TEAM_CLUB_PERSONS
	insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;
	
	--TEAM_CLUB_PLAYERS
	insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	-------------------------------Alex Rodriguez
	--EMAILS
	insert into emails (email) values ('alexjoaorodriguez@Gmail.com') returning id into returning_email_id_player_a;
	insert into emails (email) values ('lizrsouza13@gmail.com') returning id into returning_email_id_mother;

	--PERSONS
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Alex', 'Joao', 'Rodriquez', ARRAY ['+1 (267)528-5061'], null) returning id into returning_person_id_player_a;
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Alex', null, 'Rodriquez', ARRAY ['(732)930-3314'], null) returning id into returning_person_id_father;
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Liz', null, 'Rodriquez', ARRAY ['(908)205-4535'], null) returning id into returning_person_id_mother;
	
	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);

	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);
	
	--CLUB_EMAILS
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);

	--CLUB_PERSONS
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

	--PLAYERS
	insert into dobs (dob) values ('2005-08-30') returning id into returning_dob_id;
	insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;
	
	--CLUB_PLAYERS
	insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 2) returning id into returning_club_player_id;

	--TEAM_CLUB_PERSONS
	insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;
	
	--TEAM_CLUB_PLAYERS
	insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	-----------------------------------Arber Canole
	--EMAILS
	insert into emails (email) values ('arberc11@gmail.com') returning id into returning_email_id_player_a;
	insert into emails (email) values ('canolegita@hotmail.com') returning id into returning_email_id_mother;

	--PERSONS
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Arber', null, 'Canole', ARRAY ['2157157565'], null) returning id into returning_person_id_player_a;
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Ergita', null, 'Canole', ARRAY ['215-900-4934'], null) returning id into returning_person_id_mother;

	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);

	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);
	
	--CLUB_PERSONS
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;
	
	--PLAYERS
	insert into dobs (dob) values ('2004-03-10') returning id into returning_dob_id;
	insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;
	
	--CLUB_PLAYERS
	insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 8) returning id into returning_club_player_id;

	--TEAM_CLUB_PERSONS
	insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;
	
	--TEAM_CLUB_PLAYERS
	insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	---------------------------------Ben Barnieu

	--EMAILS
	insert into emails (email) values ('lbarnieu@gmail.com') returning id into returning_email_id_father_a;
	insert into emails (email) values ('Loic@sterlingpig.com') returning id into returning_email_id_father_b;
	insert into emails (email) values ('jbarnieu@yahoo.com') returning id into returning_email_id_mother;
	
	--PERSONS
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Ben', null, 'Barnieu', null, null) returning id into returning_person_id_player_a;
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Loic', null, 'Barnieu', null, null) returning id into returning_person_id_father;
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Joanne', null, 'Barnieu', null, null) returning id into returning_person_id_mother;

	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_mother);
	
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_b, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_b, returning_person_id_father);
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_b, returning_person_id_mother);

	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_b);
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);

	--CLUB_PERSONS
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

	--PLAYERS
	insert into dobs (dob) values ('2005-01-01') returning id into returning_dob_id;
	insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;
	
	--CLUB_PLAYERS
	insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 9) returning id into returning_club_player_id;

	--TEAM_CLUB_PERSONS
	insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;
	
	--TEAM_CLUB_PLAYERS
	insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	--------------------------------Yancarlos Corredor
	--EMAILS
	insert into emails (email) values ('mystical943@gmail.com') returning id into returning_email_id_player_a;

	--PERSONS
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Yancarlo', null, 'Corredor', null, null) returning id into returning_person_id_player_a;
	
	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
	
	--CLUB_EMAILS
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
	
	--CLUB_PERSONS
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
	
	--PLAYERS
	insert into dobs (dob) values ('2004-01-01') returning id into returning_dob_id;
	insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;
	
	--CLUB_PLAYERS
	insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 1) returning id into returning_club_player_id;

	--TEAM_CLUB_PERSONS
	insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;
	
	--TEAM_CLUB_PLAYERS
	insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);
	

	----------------------------------Daniel McCallister
        --EMAILS
        insert into emails (email) values ('Meek.McCallister@gmail.com') returning id into returning_email_id_father_a;
        insert into emails (email) values ('miss.b.7712@gmail.com') returning id into returning_email_id_mother;

        --PERSONS
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Daniel', null, 'McCallister', null, '355 Elm Ave, Glenside, PA, 19038') returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Bradley', null, 'McCallister', ARRAY ['3044124514'], '355 Elm Ave, Glenside, PA, 19038') returning id into returning_person_id_father;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Mrs.', null, 'McCallister', ARRAY ['(215) 450-6211'], '355 Elm Ave, Glenside, PA, 19038') returning id into returning_person_id_mother;

        --EMAILS_PERSONS
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_mother);

        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

        --CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);

        --CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

        --PLAYERS
        insert into dobs (dob) values ('2005-01-01') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 19) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	---------------------------------------Dominic Evangelista
        
	--EMAILS
        insert into emails (email) values ('dominice1@comcast.net') returning id into returning_email_id_player_a;
        insert into emails (email) values ('paul.evangelista@comcast.net') returning id into returning_email_id_father_a;
        insert into emails (email) values ('all210@comcast.net') returning id into returning_email_id_mother;

        --PERSONS
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Dominic', null, 'Evangelista', ARRAY ['2156808879'], null) returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Paul', null, 'Evangelista', ARRAY ['2673725358'], null) returning id into returning_person_id_father;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Amanda', null, 'Evangelista', ARRAY ['215-421-9909'], null) returning id into returning_person_id_mother;

        --EMAILS_PERSONS
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);
        
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_mother);
	
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

        --CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);

        --CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

        --PLAYERS
        insert into dobs (dob) values ('2004-05-19') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 5) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	---------------------------------Eric Girsh
	--Leonard Girsh
	insert into emails (email) values ('lguirch@aol.com') returning id into returning_email_id_father_a;

        --PERSONS
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Eric', null, 'Girsh', null, 'Southampton, PA, 18966') returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Leonard', null, 'Girsh', ARRAY ['(215) 275-7124', '(215) 275-9133' ] , 'Southampton, PA, 18966') returning id into returning_person_id_father;

        --EMAILS_PERSONS
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
        
	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
        
	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        
        --PLAYERS
        insert into dobs (dob) values ('2005-05-10') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 11) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	------------------------------------Fabrizio Franceschelli
	--EMAILS
	--Fabrizio Franceschelli
	insert into emails (email) values ('fabriziofrances@gmail.com') returning id into returning_email_id_player_a;
	
	--Marcelo Franceschelli
	insert into emails (email) values ('marcelofrance3@gmail.com') returning id into returning_email_id_player_b;
	
	--Claudio Franceschelli
	insert into emails (email) values ('claudio11@msn.com') returning id into returning_email_id_father_a;

	--Marilia Franceschelli
	insert into emails (email) values ('marilia_twins@hotmail.com') returning id into returning_email_id_mother;

        --PERSONS
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Fabrizio', null, 'Franceschelli', null, null) returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Marcelo', null, 'Franceschelli', null, null) returning id into returning_person_id_player_b;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Claudio', null, 'Franceschelli', null, null) returning id into returning_person_id_father;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Marilia', null, 'Franceschelli', null, null) returning id into returning_person_id_mother;

        --EMAILS_PERSONS
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_b);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);

        insert into emails_persons (email_id, person_id) values (returning_email_id_player_b, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_b, returning_person_id_player_b);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_b, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_b, returning_person_id_mother);

        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_b);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_mother);
        
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_b);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_b);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);
	
	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_b) returning id into returning_club_person_id_player_b;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;
        
	--PLAYERS Marcelo
        insert into dobs (dob) values ('2004-01-01') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 14) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);
	
	--PLAYERS Fabrizio
        insert into dobs (dob) values ('2004-01-01') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_b) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_b, returning_player_id, 15) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_b, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	---------------------------------------Joshua Vidro
	--Joshua Vidro
	insert into emails (email) values ('josh_redninjago@yahoo.com') returning id into returning_email_id_player_a;

	--Katja Pigur
	insert into emails (email) values ('katjapigur@yahoo.com') returning id into returning_email_id_mother;

        --PERSONS
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Joshua', null, 'Vidro', null, null) returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Freddy', null, 'Vidro', null, null) returning id into returning_person_id_father;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Katja', null, 'Pigur', ARRAY ['(267) 970-3132'], null) returning id into returning_person_id_mother;

        --EMAILS_PERSONS
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);
        
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);
	
	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

	--PLAYER
        insert into dobs (dob) values ('2004-01-01') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 90) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	-----------------------------------Luke Breslin

	--EMAILS
	--Luke Breslin
	insert into emails (email) values ('lbreslin6@gmail.com') returning id into returning_email_id_player_a;
	--Jim Breslin
	insert into emails (email) values ('jbreslin33@gmail.com') returning id into returning_email_id_father_a;
	--Colleen Lederer
	insert into emails (email) values ('colllederer@yahoo.com') returning id into returning_email_id_mother;
       
       	--PERSONS	
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Luke', null, 'Breslin', ARRAY ['215-828-4924'], '804 East Girard Avenue, Philadelphia PA 19125') returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Jim', null, 'Breslin', ARRAY ['215-828-4924'], '804 East Girard Avenue, Philadelphia PA 19125') returning id into returning_person_id_father;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Colleen', null, 'Breslin', ARRAY ['(215) 589-8867'], '804 East Girard Avenue, Philadelphia PA 19125') returning id into returning_person_id_mother;

        --EMAILS_PERSONS
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);
	
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_mother);
        
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);
	
	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

	--PLAYER
        insert into dobs (dob) values ('2005-08-17') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 26) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	--------------------------------------Nacho Obando
	--EMAILS
	--Nacho Obando
	insert into emails (email) values ('Maxwell.obando27@gmail.com') returning id into returning_email_id_player_a;

	--Michelle Obando
	insert into emails (email) values ('Missyobando50@gmail.com') returning id into returning_email_id_mother;

       	--PERSONS	
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Nacho', null, 'Obando', null, null) returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Louis', null, 'Obando', null, null) returning id into returning_person_id_father;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Michelle', null, 'Obando', null, null) returning id into returning_person_id_mother;

        --EMAILS_PERSONS
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);
	
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);
	
	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;
	
	--PLAYER
        insert into dobs (dob) values ('2004-12-27') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 27) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);


	----------------------------------Tedi Shaho
	--Joan Shaho
	insert into emails (email) values ('stiljanshaho@gmail.com') returning id into returning_email_id_mother;

       	--PERSONS	
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Tedi', null, 'Shaho', null, null) returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Joan', null, 'Shaho', null, null) returning id into returning_person_id_mother;

        --EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);
	
	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;
	
	--PLAYER
        insert into dobs (dob) values ('2004-01-01') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 17) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);



	-----------------------------------Tristan Burns
	--Tristan Burns
	insert into emails (email) values ('Zenbuddhaburns@gmail.com') returning id into returning_email_id_player_a;

	--Kevin Burns
	insert into emails (email) values ('kdburns31@yahoo.com') returning id into returning_email_id_father_a;

	--Jen Burns
	insert into emails (email) values ('Jlynn_mo@yahoo.com') returning id into returning_email_id_mother;

       	--PERSONS	
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Tristan', null, 'Burns', null, null) returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Kevin', null, 'Burns', null, null) returning id into returning_person_id_father;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Jen', null, 'Burns', null, null) returning id into returning_person_id_mother;

        --EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);

	insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_mother);

	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
        insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);

	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);

	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

	--PLAYER
        insert into dobs (dob) values ('2005-01-01') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 5) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	----------------------------------Victor Baidal
	--Victor Baidal
	insert into emails (email) values ('vebaidal@gmail.com') returning id into returning_email_id_player_a;

	--Alex Baidal
	insert into emails (email) values ('alejo1016@hotmail.com') returning id into returning_email_id_father_a;

       	--PERSONS	
	insert into persons (first_name, middle_name, last_name, phones, address) values ('Victor', null, 'Baidal', null, null) returning id into returning_person_id_player_a;
        insert into persons (first_name, middle_name, last_name, phones, address) values ('Alex', null, 'Baidal', null, null) returning id into returning_person_id_father;
        
	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
	
	insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_player_a);
        insert into emails_persons (email_id, person_id) values (returning_email_id_father_a, returning_person_id_father);
	
	--CLUB_EMAILS
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
        insert into club_emails (club_id, email_id) values ($1,returning_email_id_father_a);
	
	--CLUB_PERSONS
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
        insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
	
	--PLAYER
        insert into dobs (dob) values ('2004-09-09') returning id into returning_dob_id;
        insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

        --CLUB_PLAYERS
        insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 12) returning id into returning_club_player_id;

        --TEAM_CLUB_PERSONS
        insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;

        --TEAM_CLUB_PLAYERS
        insert into team_club_persons_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	------------------------------------------------------------------------------------------------------
END;
$$;
--END INSERT PERSON


--BEGIN INSERT CAOS
CREATE OR REPLACE FUNCTION f_insert_celta()
RETURNS text AS $$
DECLARE
        result_set text;
	returning_person_id persons.id%TYPE;
	returning_email_id emails.id%TYPE;
	returning_club_id clubs.id%TYPE;

	--JIM as manager
	returning_manager_id managers.id%TYPE;
	returning_club_manager_id club_managers.id%TYPE;
	returning_team_club_person_id team_club_persons.id%TYPE;

BEGIN
	--JOE
	insert into persons (first_name, last_name, phones, address) values ('Joe', 'Hurst', ARRAY [ '215-555-1212' ], '2913 Street Road, Bensalem PA 19020') returning id into returning_person_id;
	insert into emails (email) values ('jbreslin33@yahoo.com') returning id into returning_email_id;
	insert into emails_persons (email_id, person_id) values (returning_email_id, returning_person_id);
	insert into native_logins (email_id, password) values (returning_email_id,'$1$X4BpfXnz$G2rqMRjrK0DiTi9P7XdJL.');



	--clubs
	insert into administrators (person_id) values (1);

	insert into clubs (name,address) values ('RC CELTA USA', '2913 Street Rd, Bensalem, PA 19020') returning id into returning_club_id;

	insert into club_persons (club_id,person_id) values (1,1);
	insert into club_administrators (club_person_id,administrator_id) values (1,1);

	insert into club_emails (club_id,email_id) values (1,1);

	--pitches
	insert into pitches (name, club_id) values ('Field 1', returning_club_id);
	insert into pitches (name, club_id) values ('Sofive', returning_club_id);

	--teams
	CALL p_insert_caos(returning_club_id);

	--add Jim Breslin as team manager
	insert into managers (person_id) values (28) returning id into returning_manager_id;
	insert into club_managers (club_person_id, manager_id) values (28,returning_manager_id) returning id into returning_club_manager_id;
	insert into team_club_persons (club_person_id, team_id) values (28,1)  returning id into returning_team_club_person_id;
	insert into team_club_persons_club_managers (club_manager_id, team_club_person_id) values (returning_club_manager_id,returning_team_club_person_id);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--RUN STORED PROCEDURES
SELECT f_insert_celta();