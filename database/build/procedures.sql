













--INVITE TO CLUB
CREATE OR REPLACE FUNCTION f_invite_to_club(TEXT, TEXT, int)
RETURNS text AS $$
DECLARE
	DECLARE x int := -1;
        found_email_id emails.id%TYPE;
        found_native_login_id native_logins.id%TYPE;
        returning_insert_native_login_token_id insert_native_login_tokens.id%TYPE;
        message text;
        result_set text;
BEGIN
        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN 
		select id into found_native_login_id from native_logins where email_id = found_email_id;

		IF found_native_login_id > 0 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons(found_email_id),
                                ',',
                                j_select_messages('That email already has a login associated with it. But we added it to your club.'),
                                ',',
                                j_select_codes(-101)
                      	);

		ELSE
			insert into insert_native_login_tokens (email_id, token, expires) values (found_email_id, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN
			       	
				result_set = CONCAT
                        	(
                                	j_select_persons(found_email_id),
                                	',',
                                	j_select_messages('We sent an email to your invitee to finish joining.'),
                                	',',
                                	j_select_codes(-100)
                        	);
			ELSE
                               	result_set = CONCAT
                                (
                                        j_select_persons(found_email_id),
                                        ',',
                                        j_select_messages('Something went wrong with process. Sorry! Please try again.'),
                                        ',',
                                        j_select_codes(-101)
                                );

			END IF;
		END IF;
	ELSE
		CALL p_insert_email($1,x);
		IF x > 0 THEN 
			insert into insert_native_login_tokens (email_id, token, expires) values (x, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN

                               	result_set = CONCAT
                                (
                                        j_select_persons(x),
                                        ',',
                                        j_select_messages('We a link to your invitee to finish joining.'),
                                        ',',
                                        j_select_codes(-100)
                                );

			ELSE

                               	result_set = CONCAT
                                (
                                        j_select_persons(0),
                                        ',',
                                        j_select_messages('Something went wrong with process. Sorry! Please try again.'),
                                        ',',
                                        j_select_codes(-101)
                                );

			END IF;
		ELSE
		END IF;
	END IF;


	--for the clubs
	IF found_email_id > 0 THEN
		insert into club_emails (club_id, email_id) values ($3,found_email_id);
	END IF;
	
	IF x > 0 THEN
		insert into club_emails (club_id, email_id) values ($3,x);
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INVITE TO CLUB


--INSERT CLUB ADMINISTRATOR
CREATE OR REPLACE PROCEDURE p_insert_club_administrator(club_person_id_p int, person_id_p int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_administrator_id administrators.id%TYPE;
        found_administrator_id administrators.id%TYPE;
BEGIN
	select id into found_administrator_id from administrators where person_id = person_id_p; 
	IF found_administrator_id > 0 THEN
        	insert into club_administrators (club_person_id,administrator_id) values (club_person_id_p, found_administrator_id) returning id into x;
	ELSE
        	insert into administrators (person_id) values (person_id_p) returning id into returning_administrator_id;
        	insert into club_administrators (club_person_id,administrator_id) values (club_person_id_p, returning_administrator_id) returning id into x;
	END IF;
END;
$$;
--END INSERT CLUB ADMINISTRATOR

--BEGIN UPDATE CLUB PROFILE
CREATE OR REPLACE FUNCTION f_update_club_profile(int,int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
		--lets check if you are club_admin

                CALL p_update_club_profile($3,$4,$5,x);

                IF x > 0 THEN
                       	result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101)
                        );

                ELSE
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Something went wrong with setting availability. Please try again.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_update_club_profile(int,int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        ids INT[];
	found_person_id persons.id%TYPE;
BEGIN

	--RAISE LOG 'log message in 1 in p %', $1;
	--RAISE LOG 'log message in 2 in p %', $2;
	--RAISE LOG 'log message in 3 in p %', $3;

	IF $3 = 2 THEN

		IF $2 = 1 THEN
			select person_id into found_person_id from players where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into players (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 2 THEN
			select person_id into found_person_id from parents where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into parents (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;

	
		IF $2 = 3 THEN
			--RAISE LOG 'log message in 3 %', $1;
			select person_id into found_person_id from coaches where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into coaches (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 4 THEN
			select person_id into found_person_id from managers where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into managers (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;
	
		IF $2 = 5 THEN
			select person_id into found_person_id from administrators where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into administrators (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;

	ELSE
		IF $2 = 1 THEN
			delete from players where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 2 THEN
			delete from parents where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 3 THEN
			delete from coaches where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 4 THEN
			delete from managers where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 5 THEN
			delete from administrators where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;


	END IF;
	x := 1;

END;
$$;

CREATE OR REPLACE FUNCTION f_club_profile(email_id_p int, person_id_p int, club_id_p int)
RETURNS text AS $$
DECLARE
        result_set text;
	found_club_administrator_id club_administrators.id%TYPE;

BEGIN
	select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.person_id = $2;
	IF found_club_administrator_id > 0 THEN
	        result_set = CONCAT
        	(
                	j_select_persons(email_id_p),
                	',',
                	j_select_messages(null),
                	',',
                	j_select_codes(-102),
                	',',
                	j_select_club_profiles(person_id_p, club_id_p)
        	);
	ELSE
	        result_set = CONCAT
        	(
                	j_select_persons($1),
                	',',
                	j_select_messages('You are not a club administrator.'),
                	',',
                	j_select_codes(-101)
        	);

	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END UPDATE CLUB PROFILE

--BEGIN INSERT PERSON
CREATE OR REPLACE FUNCTION f_insert_person(TEXT, TEXT, TEXT, TEXT, TEXT, email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	json_result text; 
BEGIN
	CALL p_insert_person($1,$2,$3,$4,$5,$6,$7,x);

        IF x > 0 THEN
	        result_set = CONCAT
        	(
                	j_select_persons(email_id),
                	',',
                	j_select_messages(null),
                	',',
                	j_select_codes(-100)
        	);

        ELSE
	        result_set = CONCAT
        	(
                	j_select_persons(email_id),
                	',',
                	j_select_messages('Person not added.'),
                	',',
                	j_select_codes(-101)
        	);

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--I can see maybe if there are no emails_persons associated we need to add one
CREATE OR REPLACE PROCEDURE p_insert_person(first_name TEXT, middle_name TEXT, last_name TEXT, phones TEXT, address TEXT, int, int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_emails_persons_id integer;
	rec RECORD;
BEGIN
        insert into persons (first_name, middle_name, last_name, phones, address) values (first_name, middle_name, last_name, ARRAY [phones], address) returning id into x;
	select id into found_emails_persons_id from emails_persons where person_id = x;

	IF $7 > 0 THEN
		--old one
		FOR rec IN
			select distinct email_id from emails_persons where person_id = $7
		LOOP
			insert into emails_persons (email_id, person_id) values (rec.email_id, x); 
		END LOOP;
	
	ELSE
		--new one for brand new unaffilated persons
		IF found_emails_persons_id > 0 THEN
			--do nothing		
		ELSE
			--insert an emails_persons
			insert into emails_persons (email_id, person_id) values ($6,x);
		END IF;

		FOR rec IN
			select distinct email_id from emails_persons where person_id = $7
		LOOP
			insert into emails_persons (email_id, person_id) values (rec.email_id, x); 
		END LOOP;

	END IF;
END;

$$;
--END INSERT PERSON

--BEGIN DELETE PERSON
CREATE OR REPLACE FUNCTION f_delete_person(int, int, int)
RETURNS text AS $$
DECLARE
        result_set text;
	total_persons int;
	DECLARE x int := -111;
	found_team_club_player_id team_club_persons_club_players.id%TYPE;
BEGIN
	select count(*) into total_persons from emails_persons where email_id = $1;
	IF total_persons > 1 THEN
        
		select team_club_persons_club_players.id into found_team_club_player_id from team_club_persons_club_players
        	join team_club_persons on team_club_persons.id=team_club_persons_club_players.team_club_person_id
        	join club_persons on club_persons.id=team_club_persons.club_person_id
        	where club_persons.person_id = $3;

		IF found_team_club_player_id > 0 THEN
			--we have a player on a team the only way to delete is if the deletor is a team manager
	
		        result_set = CONCAT
        		(
                		j_select_persons($1),
                		',',
                		j_select_messages('You do not have permission to delete Person. They are on a team. Let your team manager know.'),
                		',',
                		j_select_codes(-101)
        		);

			--this is good enough as you should delete players on another screen.

		ELSE
			--no worries this person is not a player on a team go ahead and delete
        		CALL p_delete_person($3,x);

        		IF x > 0 THEN
				result_set = CONCAT
                        	(
                                	j_select_persons($1),
                                	',',
                                	j_select_messages(null),
                                	',',
                                	j_select_codes(-100)
                        	);
        		ELSE
                                result_set = CONCAT
                                (
                                        j_select_persons($1),
                                        ',',
                                        j_select_messages('Something went wrong.'),
                                        ',',
                                        j_select_codes(-101)
                                );

        		END IF;

		END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                       	',',
                        j_select_messages('Total persons less than 2 so we cannot delete.'),
                        ',',
                        j_select_codes(-101)
               	);

		--not enuf persons prob get rid of this
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_person(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	found_team_club_player_id team_club_persons_club_players.id%TYPE;
BEGIN
	delete from emails_persons where person_id = $1;
	delete from club_persons where person_id = $1;
	delete from persons where id = $1 returning id into x;
END;
$$;
--END DELETE PERSON

--INSERT CLUB
CREATE OR REPLACE PROCEDURE p_insert_club(name TEXT, address TEXT, email_id int, person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_club_person_id integer;
        returning_club_id integer;
        returning_club_email_id integer;
        found_club_person_id integer;
BEGIN
        insert into clubs (name,address) values (name,address) returning id into returning_club_id;
	insert into club_emails (club_id, email_id) values (returning_club_id,$3);

	--loop for other persons....
	CALL p_insert_club_persons(returning_club_id,$3);

	--get the club_person that is me
	select club_persons.id into found_club_person_id from club_persons where club_persons.club_id = returning_club_id AND club_persons.person_id = $4; 

	--then if you found one insert into admistrators and club_administrators
	IF found_club_person_id > 0 THEN 
		CALL p_insert_club_administrator(found_club_person_id,$4,x);
	ELSE
	END IF;
END;
$$;

CREATE OR REPLACE FUNCTION f_insert_club(TEXT, TEXT, email_id int, person_id int)
RETURNS text AS $$
DECLARE
        found_club_id clubs.id%TYPE;
	DECLARE x int := -1;
	result_set text;
BEGIN
        SELECT id INTO found_club_id FROM clubs
        WHERE name = $1;

        IF found_club_id > 0 THEN
		result_set = CONCAT
                (
                	j_select_persons(email_id),
                        ',',
                       	j_select_messages('Club name already exists.'),
                        ',',
                       	j_select_codes(-101)
               	);
       	ELSE
		IF person_id > 0 THEN

			CALL p_insert_club($1,$2,email_id,person_id,x);
			IF x > 0 THEN
			        result_set = CONCAT
                		(
                        		j_select_persons(email_id),
                        		',',
                        		j_select_messages(null),
                        		',',
                        		j_select_codes(-100)
                		);
			ELSE
				result_set = CONCAT
                                (
                                        j_select_persons(email_id),
                                        ',',
                                        j_select_messages('Something went wrong with adding club. Sorry!'),
                                        ',',
                                        j_select_codes(-101)
                                );
			END IF;
		ELSE
			result_set = CONCAT
                        (
                        	j_select_persons(email_id),
                                ',',
                                j_select_messages('You must add a person to this account before you add a club.'),
                               	',',
                                j_select_codes(-101)
                        );
		END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--UPDATE PROFILES
CREATE OR REPLACE PROCEDURE p_update_profile(int,int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        ids INT[];
	found_person_id persons.id%TYPE;
BEGIN

	IF $3 = 2 THEN

		IF $2 = 1 THEN
			select person_id into found_person_id from players where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into players (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 2 THEN
			select person_id into found_person_id from parents where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into parents (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;

	
		IF $2 = 3 THEN
			--RAISE LOG 'log message in 3 %', $1;
			select person_id into found_person_id from coaches where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into coaches (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 4 THEN
			select person_id into found_person_id from managers where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into managers (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;
	
		IF $2 = 5 THEN
			select person_id into found_person_id from administrators where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into administrators (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;

	ELSE
		IF $2 = 1 THEN
			delete from players where person_id = $1 returning id into x;  
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 2 THEN
			delete from parents where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 3 THEN
			delete from coaches where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 4 THEN
			delete from managers where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 5 THEN
			delete from administrators where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;
		RAISE LOG 'log message x:%', x;

	END IF;

EXCEPTION
	WHEN others THEN
        x := -100;
	
END;
$$;

CREATE OR REPLACE FUNCTION f_update_profile(int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE

                CALL p_update_profile($2,$3,$4,x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Profile Updated.'),
                                ',',
                                j_select_codes(-101),
                                ',',
				j_select_profiles($2)
                        );

                ELSE
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Something went wrong with updating profile. Please try again.'),
                                ',',
                                j_select_codes(-101),
                                ',',
				j_select_profiles($2)
                        );

                END IF;
        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECT PROFILES
CREATE OR REPLACE FUNCTION f_profile(email_id_p int, person_id_p int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
	(
		j_select_persons($1),
		',',
		j_select_messages(null),
		',',
		j_select_codes(-102),
		',',
		j_select_profiles($2)
	);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--END UPDATE PROFILE
-------------------------------------------------------------------------------



--EMAIL
CREATE OR REPLACE FUNCTION f_get_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
BEGIN
        SELECT id INTO found_email_id FROM emails
        WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;



--BEGIN J_SELECT PITCHES
--params:club_id
CREATE OR REPLACE FUNCTION j_select_pitches(int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select pitches.id, pitches.name from pitches where club_id = $1
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"pitches": []', raw_json);
        ELSE
                result_set = CONCAT('"pitches": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PITCHES

--BEGIN J_SELECT ADMINISTRATED_CLUBS
--params:person_id
CREATE OR REPLACE FUNCTION j_select_administrated_clubs(int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select distinct clubs.id, clubs.name from clubs
                join club_persons on club_persons.club_id=clubs.id
                join club_administrators on club_administrators.club_person_id=club_persons.id
                where club_persons.person_id = $1
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"clubs": []', raw_json);
        ELSE
                result_set = CONCAT('"clubs": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT ADMINISTRATED_CLUBS

--BEGIN J_SELECT CLUBS OF TEAMS MANAGED
--params:person_id
CREATE OR REPLACE FUNCTION j_select_clubs_of_teams_managed(int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
               	select distinct clubs.id, clubs.name from clubs
                join club_persons on club_persons.club_id=clubs.id
                join team_club_persons on team_club_persons.club_person_id=club_persons.id
                join team_club_persons_club_managers on team_club_persons_club_managers.team_club_person_id=team_club_persons.id
                where club_persons.person_id = $1 

        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"clubs": []', raw_json);
        ELSE
                result_set = CONCAT('"clubs": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT CLUBS OF TEAMS MANAGED


--BEGIN J_SELECT MESSAGES
CREATE OR REPLACE FUNCTION j_select_messages(message_p text)
RETURNS text AS $$
DECLARE
result_set text;
BEGIN
		IF message_p is NULL THEN 
                	result_set = CONCAT('"messages": []');
		ELSE
               		result_set = CONCAT('"messages": [ { "message": "', message_p, '" } ]');
		END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT MESSAGES

--BEGIN J_SELECT CODES
CREATE OR REPLACE FUNCTION j_select_codes(code_p int)
RETURNS text AS $$
DECLARE
result_set text;
BEGIN
		IF code_p = 0 THEN 
                	result_set = CONCAT('"codes": []');
		ELSE
               		result_set = CONCAT('"codes": [ { "code": "', code_p, '" } ]');
		END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT CODES


--BEGIN J_SELECT PERSONS
CREATE OR REPLACE FUNCTION j_select_persons(email_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
	from
        (
		select persons.id, first_name, case when middle_name IS NULL THEN '' ELSE middle_name END, last_name from persons join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = $1 
        ) t;
	IF raw_json is NULL THEN
		result_set = CONCAT('"persons": []', raw_json);
	ELSE
		result_set = CONCAT('"persons": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PERSONS

--BEGIN J_SELECT TEAMS
CREATE OR REPLACE FUNCTION j_select_teams(int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select distinct teams.id, teams.name from teams
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id

                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id
                join emails on emails.id=emails_persons.email_id
                where email_id = $1
        ) t;

	IF raw_json is NULL THEN
		result_set = CONCAT('"teams": []', raw_json);
	ELSE
		result_set = CONCAT('"teams": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT TEAMS

--BEGIN J_SELECT PROFILES
CREATE OR REPLACE FUNCTION j_select_profiles(int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select
		persons.id as person_id,
		players.id as player_id,
		parents.id as parent_id,
		coaches.id as coach_id,
		managers.id as manager_id,
		administrators.id as administrator_id
		
		from persons

		left join players on players.person_id=persons.id
		left join parents on parents.person_id=persons.id
		left join coaches on coaches.person_id=persons.id
		left join managers on managers.person_id=persons.id
		left join administrators on administrators.person_id=persons.id
		where persons.id = $1

        ) t;

	IF raw_json is NULL THEN
		result_set = CONCAT('"profiles": []', raw_json);
	ELSE
		result_set = CONCAT('"profiles": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PROFILES

--BEGIN J_SELECT CLUB PROFILES
CREATE OR REPLACE FUNCTION j_select_club_profiles(int,int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select
		persons.last_name as last_name,
		persons.first_name as first_name,
		persons.dob as dob,
		persons.id as person_id,
		players.id as player_id,
		parents.id as parent_id,
		coaches.id as coach_id,
		managers.id as manager_id,
		administrators.id as administrator_id
		
		from persons

		left join players on players.person_id=persons.id
		left join parents on parents.person_id=persons.id
		left join coaches on coaches.person_id=persons.id
		left join managers on managers.person_id=persons.id
		left join administrators on administrators.person_id=persons.id
		order by persons.last_name asc

        ) t;

	IF raw_json is NULL THEN
		result_set = CONCAT('"club_profiles": []', raw_json);
	ELSE
		result_set = CONCAT('"club_profiles": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT CLUB PROFILES

--BEGIN J_SELECT TEAMS MANAGED
CREATE OR REPLACE FUNCTION j_select_teams_managed(int,int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select distinct teams.id, teams.name from teams
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join persons on persons.id=club_persons.person_id

                where club_persons.club_id = $1 AND persons.id = $2
        ) t;

	IF raw_json is NULL THEN
		result_set = CONCAT('"teams": []', raw_json);
	ELSE
		result_set = CONCAT('"teams": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT TEAMS MANAGED

--BEGIN J_SELECT CLUBS
--        result_set = CONCAT($1,',','{',json_result_clubs,',',json_result_teams,',',json_result_persons,'}');

--takes email_id
CREATE OR REPLACE FUNCTION j_select_clubs(int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select distinct clubs.id, clubs.name from clubs
                join club_persons on club_persons.club_id=clubs.id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id
                join emails on emails.id=emails_persons.email_id
                where email_id = $1
        ) t;

	IF raw_json is NULL THEN
		result_set = CONCAT('"clubs": []', raw_json);
	ELSE
		result_set = CONCAT('"clubs": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT CLUBS

--team_club_persons_club_players_id
--BEGIN J_SELECT PRACTICES
CREATE OR REPLACE FUNCTION j_select_practices(email_id int, first_day_of_query date, last_day_of_query date)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates,(select pitches.name from pitches where practices.pitch_id = pitches.id) as pitch_name, practices.field_name, clubs.name as club_name, teams.name as team_name, team_club_persons_club_players.id as team_club_persons_club_players_id, persons.first_name, persons.last_name, (select practices_players_availability.availability_id from practices_players_availability where practices_players_availability.practice_id = practices.id) as availability_id 
                from practices
		join practice on practice.id=practices.practice_id
                join teams on teams.id=practice.team_id
		join team_club_persons on team_club_persons.team_id=teams.id
		join club_persons on club_persons.id=team_club_persons.club_person_id
		join clubs on clubs.id=club_persons.club_id
		join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

		join club_players on club_players.club_person_id=club_persons.id

		join team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id AND team_club_persons_club_players.club_player_id=club_players.id

                where emails_persons.email_id = $1 AND practices.event_date > $2 - interval '1 day' AND practices.event_date < $3
	) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"practices": []', raw_json);
        ELSE
                result_set = CONCAT('"practices": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PRACTICES

--BEGIN J_SELECT GAMES
CREATE OR REPLACE FUNCTION j_select_games(email_id int, first_day_of_query date, last_day_of_query date)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select games.id, games.event_date, games.arrival_time, games.start_time, games.end_time, games.address, games.coordinates,(select pitches.name from pitches where games.pitch_id = pitches.id) as pitch_name, games.field_name, clubs.name as club_name, teams.name as team_name, team_club_persons_club_players.id as team_club_persons_club_players_id, persons.first_name, persons.last_name
                from games
                join teams on teams.id=games.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

                join club_players on club_players.club_person_id=club_persons.id

                join team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id AND team_club_persons_club_players.club_player_id=club_players.id

                where emails_persons.email_id = $1 AND games.event_date > $2 - interval '1 day' AND games.event_date < $3
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"games": []', raw_json);
	ELSE
                result_set = CONCAT('"games": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PRACTICES


--do we send email link for signup????? 
CREATE OR REPLACE PROCEDURE p_insert_email(email_name TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
BEGIN
	insert into emails (email) values (email_name) returning id into x;
END;
$$;

--insert_native_login  INOUT x int
CREATE OR REPLACE PROCEDURE p_insert_native_login(email_id int, password TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
	returning_person_id integer;
BEGIN
	insert into native_logins (email_id, password) values (email_id, CRYPT($2, GEN_SALT('md5'))) returning id into x;
END;
$$;


--get_native_email
CREATE OR REPLACE FUNCTION f_get_native_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
	found_email_id native_logins.email_id%TYPE;
BEGIN
    	SELECT native_logins.email_id INTO found_email_id FROM native_logins 
	join emails on emails.id=native_logins.email_id
	WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;

--select clubs.id, clubs.name from clubs join club_persons on club_persons.club_id=clubs.id join persons on persons.id=club_persons.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1;





	--RAISE INFO 'information message %', now() ;
  	--RAISE LOG 'log message %', now();
  	--RAISE DEBUG 'debug message %', now();
  	--RAISE WARNING 'warning message %', now();
  	--RAISE NOTICE 'notice message %', now();

--INSERT CLUB MEMBERS
CREATE OR REPLACE PROCEDURE p_insert_club_persons(club_id int,email_id int)
LANGUAGE plpgsql
AS $$
DECLARE
        rec RECORD;
BEGIN
        FOR rec IN
                select persons.id from persons join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = $2
        LOOP
                insert into club_persons (club_id, person_id) values (club_id, rec.id);
        END LOOP;
END;
$$;









--BEGIN SELECT PITCHES
CREATE OR REPLACE FUNCTION f_select_pitches_and_teams(email_id_p int,club_id_p int,person_id_p int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_messages(null),
               	',',
                j_select_codes(-102),
               	',',
		j_select_pitches(club_id_p),
               	',',
		j_select_teams_managed(club_id_p, person_id_p)
      	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT PERSON
CREATE OR REPLACE FUNCTION f_select_person(email_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_persons(email_id),
                ',',
                j_select_messages(null),
                ',',
                j_select_codes(-102)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECTED PERSON
CREATE OR REPLACE FUNCTION f_selected_person(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_persons(email_id),
                ',',
                j_select_messages(null),
                ',',
                j_select_codes(-100)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;



--BEGIN DELETE CLUB
CREATE OR REPLACE FUNCTION f_delete_club(int, int, int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	found_club_administrator_id club_administrators.id%TYPE;
BEGIN

	select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.person_id = $2;

	IF found_club_administrator_id > 0 THEN

		CALL p_delete_club($3,x);

               	IF x > 0 THEN
		        result_set = CONCAT
                	(
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(-100)
                	);

                ELSE
                       	result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Something went wrong while trying to delete club. Sorry.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                        ',',
                        j_select_messages('You do not have permission to delete this club. Only a club administrator can delete a club.'),
                        ',',
                        j_select_codes(-101)
            	);

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_club(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        recA RECORD;
        recB RECORD;
        recC RECORD;
        recD RECORD;

BEGIN
	delete from club_emails where club_id = $1;

	--not deleteing below

	--delete from practices_players_availability using team_club_persons, club_persons where club_persons.club_id = $1;
	FOR recA IN
		select id from club_persons where club_id = $1
		
	LOOP
		FOR recB IN
			select id from club_players where club_person_id = recA.id
		LOOP
			FOR recC IN
				select id from team_club_persons_club_players where club_player_id = recB.id
			LOOP
				delete from practices_players_availability where team_club_persons_club_players_id = recC.id;		
			END LOOP;
		END LOOP;			
	END LOOP;	

	--delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from teams where club_id = $1  
        LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where team_id = recA.id	
		LOOP
			delete from team_club_persons_club_players where team_club_person_id = recB.id; 	
		END LOOP;
        END LOOP;

	--delete from club_players using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
        LOOP
			delete from club_players where club_person_id = recA.id; 	
        END LOOP;


	--delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_administrators where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;


	--delete from club_administrators using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
        LOOP
			delete from club_administrators where club_person_id = recA.id; 	
        END LOOP;


	--delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_players  where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;

	--delete from practices using practice, teams  where teams.club_id = $1;
        FOR recA IN
		select id from teams where club_id = $1
	LOOP
		FOR recB IN
			select id from practice where team_id = recA.id
		LOOP
			delete from practices where practice_id = recB.id;	
		END LOOP;
	END LOOP;

	--delete from practice using teams where teams.club_id = $1;
        FOR recA IN
		select id from teams where club_id = $1
	LOOP
		delete from practice where team_id = recA.id;	
	END LOOP;
			
	--delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_administrators where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;


	--delete from team_club_persons_club_managers using club_managers, club_persons  where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_managers where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;

	--delete from team_club_persons using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		delete from team_club_persons where club_person_id = recA.id;
	END LOOP;

	--delete from club_managers using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		delete from club_managers where club_person_id = recA.id;
	END LOOP;

	delete from club_persons where club_id = $1;
	delete from teams where club_id = $1;
	delete from pitches where club_id = $1;
	delete from clubs where id = $1 returning id into x;

END;
$$;
--END DELETE CLUB


--BEGIN SELECT ADMINISTRATED CLUBS
CREATE OR REPLACE FUNCTION f_select_administrated_clubs(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
	
       	result_set = CONCAT
        (
                j_select_messages(null),
               	',',
                j_select_codes(-102),
               	',',
                j_select_administrated_clubs($2)
      	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT CLUBS OF TEAMS MANAGED
CREATE OR REPLACE FUNCTION f_select_clubs_of_teams_managed(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN

	result_set = CONCAT
        (
                j_select_messages(null),
                ',',
                j_select_codes(-101),
                ',',
		j_select_clubs_of_teams_managed($2)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--------

-------



