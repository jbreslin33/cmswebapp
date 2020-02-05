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

-- UPDATE FORGOT PASSWORD
CREATE OR REPLACE FUNCTION f_update_forgot_password(update_forgot_password_token TEXT, password TEXT)
RETURNS text AS $$
DECLARE
        found_email_id forgot_passwords.email_id%TYPE;
        found_native_login_id native_logins.id%TYPE;
        result_set text;
        DECLARE x int := -1;
BEGIN
        SELECT email_id INTO found_email_id FROM forgot_passwords WHERE expires > NOW() and forgot_password_token = update_forgot_password_token;
        IF found_email_id > 0 THEN
		--we need to check if you have a native login associated with email if not insert one
		SELECT id INTO found_native_login_id FROM native_logins WHERE email_id = found_email_id;		
        	IF found_native_login_id > 0 THEN
			update native_logins set password = CRYPT($2, GEN_SALT('md5')) where email_id = found_email_id;     
                	result_set = f_format_result_set_jwt(found_email_id,null,-100);
		ELSE
			CALL p_insert_native_login(found_email_id,$2,x);
			IF x > 0 THEN
                		result_set = f_format_result_set_jwt(found_email_id,null,-100);
			ELSE
                		result_set = f_format_result_set_jwt(found_email_id,'Something went wrong can you submit a new request please?',-101);
			END IF;
		END IF;
        ELSE
                result_set = f_format_result_set_jwt(found_email_id,'Something went wrong can you submit a new request please?',-101);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--goto format_result

CREATE OR REPLACE FUNCTION f_format_result_set_jwt(int,TEXT,int) --email_id, person_id, club_id, team_id, message, code
RETURNS text AS $$
DECLARE
        json_result_codes text;
        json_result_messages text;
        json_result_persons text;
        json_result_teams text;
        json_result_clubs text;
        result_set text;
BEGIN
        select into json_result_messages j_select_messages($2);
        select into json_result_codes j_select_codes($3);

        select into json_result_persons j_select_persons($1); --based on email_id
        select into json_result_clubs j_select_clubs($1); --based on email_id
        select into json_result_teams j_select_teams($1); --based on email_id

        result_set = CONCAT($1,',',json_result_clubs,',',json_result_teams,',',json_result_persons,',',json_result_messages,',',json_result_codes,'}');

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_format_result_set(int,TEXT,int) --email_id, message, code
RETURNS text AS $$
DECLARE
        json_result_codes text;
        json_result_messages text;
        json_result_persons text;
        json_result_teams text;
        json_result_clubs text;
	result_set text;
BEGIN
	select into json_result_messages j_select_messages($2);
	select into json_result_codes j_select_codes($3);

	select into json_result_persons j_select_persons($1); --based on email_id
        select into json_result_clubs j_select_clubs($1); --based on email_id
	select into json_result_teams j_select_teams($1); --based on email_id

        result_set = CONCAT(json_result_clubs,',',json_result_teams,',',json_result_persons,',',json_result_messages,',',json_result_codes,'}');

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--email_id,message,code,club_id,person_id
CREATE OR REPLACE FUNCTION f_format_result_set_pitches_and_teams(int,TEXT,int,int,int)
RETURNS text AS $$
DECLARE
        json_result_codes text;
        json_result_messages text;
        json_result_pitches text;
        json_result_teams text;
        result_set text;
BEGIN

        select into json_result_messages j_select_messages($2);
        select into json_result_codes j_select_codes($3);
        select into json_result_pitches j_select_pitches($4);
        select into json_result_teams j_select_teams_managed($4,$5);
        result_set = CONCAT(json_result_pitches,',',json_result_teams,',',json_result_messages,',',json_result_codes,'}');
	
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_format_result_set_administrated_clubs(int,TEXT,int,int)
RETURNS text AS $$
DECLARE
        json_result_codes text;
        json_result_messages text;
        json_result_administrated_clubs text;
        result_set text;
BEGIN

        select into json_result_messages j_select_messages($2);
        select into json_result_codes j_select_codes($3);
        select into json_result_administrated_clubs j_select_administrated_clubs($4);
        result_set = CONCAT(json_result_administrated_clubs,',',json_result_messages,',',json_result_codes,'}');
	
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_format_result_set_clubs_of_teams_managed(int,TEXT,int,int)
RETURNS text AS $$
DECLARE
        json_result_codes text;
        json_result_messages text;
        json_result_clubs_of_teams_managed text;
        result_set text;
BEGIN

        select into json_result_messages j_select_messages($2);
        select into json_result_codes j_select_codes($3);
        select into json_result_clubs_of_teams_managed j_select_clubs_of_teams_managed($4);
        result_set = CONCAT(json_result_clubs_of_teams_managed,',',json_result_messages,',',json_result_codes,'}');

RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION f_format_result_set_events(int,TEXT,int,date,date)
RETURNS text AS $$
DECLARE
        json_result_codes text;
        json_result_messages text;
        json_result_persons text;
        json_result_teams text;
        json_result_clubs text;
        json_result_practices text;
        json_result_games text;
	result_set text;
BEGIN
	select into json_result_messages j_select_messages($2);
	select into json_result_codes j_select_codes($3);

	select into json_result_persons j_select_persons($1);
        select into json_result_clubs j_select_clubs($1);
	select into json_result_teams j_select_teams($1);

	select into json_result_practices j_select_practices($1,$4,$5);
	select into json_result_games j_select_games($1,$4,$5);
	
        result_set = CONCAT(json_result_clubs,',',json_result_teams,',',json_result_persons,',',json_result_practices,',',json_result_games,',',json_result_messages,',',json_result_codes,'}');
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_format_result_set_invite_club_emails(TEXT)
RETURNS text AS $$
DECLARE
        json_result_invite_club_emails text;
        result_set text;
BEGIN
        select into json_result_invite_club_emails j_select_invite_club_emails($1);
        result_set = CONCAT(json_result_invite_club_emails,'}');
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--NATIVE INSERT EMAIL LOGIN

CREATE OR REPLACE FUNCTION f_insert_native_email_login(email_name TEXT)
RETURNS text AS $$
DECLARE
	found_email_id emails.id%TYPE;
	result_set text;
	DECLARE x int := -1; 
BEGIN

    	SELECT id INTO found_email_id FROM emails WHERE email = email_name;
	IF found_email_id > 0 THEN
		result_set = '-101, Email already exists. Do you want to login instead?';
	ELSE
		CALL p_insert_email($1,x);
		IF x > 0 THEN
			result_set = f_format_result_set(x,null,-100);
                ELSE
			result_set = f_format_result_set(x,'Something went wrong with signup. Sorry! Please try again.',-101);
		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--NATIVE INSERT LOGIN
CREATE OR REPLACE FUNCTION f_insert_native_login(token_p TEXT, password TEXT)
RETURNS text AS $$
DECLARE
	found_email_id emails.id%TYPE;
	result_set text;
	DECLARE x int := -1; 
BEGIN

    	SELECT email_id INTO found_email_id FROM insert_native_login_tokens WHERE token = token_p;
	IF found_email_id > 0 THEN
		CALL p_insert_native_login(found_email_id,$2,x);
		IF x > 0 THEN
			result_set = f_format_result_set_jwt(found_email_id,null,-100);
                ELSE
			result_set = f_format_result_set(0,'Something went wrong with signup. Sorry! Please try again.',-101);
		END IF;
	ELSE
		result_set = f_format_result_set(0,'Something went wrong. Please resend email email.',-101);
	END IF;
RETURN result_set;
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
                --select distinct clubs.id, clubs.name from clubs
                --join club_persons on club_persons.club_id=clubs.id
                --join club_administrators on club_administrators.club_person_id=club_persons.id
                --where club_persons.person_id = $1

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
		--select first_name, case when middle_name IS NULL THEN '' ELSE middle_name END,  last_name from persons;
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

--BEGIN J_SELECTS
CREATE OR REPLACE FUNCTION j_selects(person_id int)
RETURNS text AS $$
DECLARE
result_set text;
BEGIN

result_set = '"selects": [ { "person_select_id":' || $1 || ', "club_select_id":' || 0 || ', "team_select_id":' || 0 || ' } ]';

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
		select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates,(select pitches.name from pitches where practices.pitch_id = pitches.id) as pitch_name, practices.field_name, clubs.name as club_name, teams.name as team_name, team_club_persons_club_players.id as team_club_persons_club_players_id, persons.first_name, persons.last_name
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

                --left outer join pitches on pitches.club_id=teams.club_id
		--team_club_persons_club_players

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
--CREATE OR REPLACE FUNCTION j_select_games(email_id int, )
CREATE OR REPLACE FUNCTION j_select_games(email_id int, first_day_of_query date, last_day_of_query date)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select games.id, games.event_date, games.arrival_time, games.start_time, games.end_time, games.address, games.coordinates, pitches.name as pitch_name, games.field_name, clubs.name as club_name, teams.name as team_name
                from games

                join teams on teams.id=games.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

                left outer join pitches on pitches.club_id=teams.club_id

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


CREATE OR REPLACE FUNCTION j_select_invite_club_emails(text)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select invite_club_emails.id, invite_club_emails.email_id, invite_club_emails.club_id, invite_club_emails.club_invite_token from invite_club_emails where club_invite_token = $1
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"invite_club_emails": []', raw_json);
        ELSE
                result_set = CONCAT('"invite_club_emails": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT INVITE_CLUB_MEMBERS

--insert_native_email_login
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

--insert_native_login_club
CREATE OR REPLACE FUNCTION f_insert_native_login_club(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT)
RETURNS text AS $$
DECLARE
	found_email_id emails.id%TYPE;
	found_club_id clubs.id%TYPE;
        result_set text;
        DECLARE x int := -1;
BEGIN
    	SELECT email_id, club_id INTO found_email_id, found_club_id FROM invite_club_emails WHERE club_invite_token = $7;
	IF found_club_id > 0 THEN
		CALL p_insert_native_login_club(found_email_id,found_club_id,$1,$2,$3,$4,$5,$6,$7,x);
                result_set = f_format_result_set(found_email_id,null,-100);
	ELSE --for some reason email does not exist
                result_set = f_format_result_set(found_email_id,'Something went wrong dog!',-101);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_native_login_club(int, int, password TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, phones TEXT, address TEXT, club_invite_token TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
	returning_email_id integer;
	returning_native_login_id integer;
BEGIN
	insert into native_logins (email_id, password) values ($1, CRYPT($3, GEN_SALT('md5')));
	insert into persons (first_name, middle_name, last_name, phones, address) values (first_name, middle_name, last_name, ARRAY[phones], address) returning id into x;
	insert into emails_persons (email_id, person_id) values ($1,x);
	insert into club_persons (club_id,person_id) values ($2,x);
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

--NATIVE LOGIN
-- this is where you realize lukes idea of multiple people
--you will return a result set of persons
--BEGIN SAMPLE JSON
CREATE OR REPLACE FUNCTION f_select_club_administrator_clubs(person_id int)
  RETURNS json AS $$
   SELECT json_agg(t)
        from
        (
                select clubs.id, clubs.name from clubs join club_persons on club_persons.club_id=clubs.id join club_administrators on club_administrators.club_person_id=club_persons.id join persons on persons.id=club_persons.person_id where persons.id = person_id
        ) t;
$$ LANGUAGE sql;

--END SAMPLE JSON


--select clubs.id, clubs.name from clubs join club_persons on club_persons.club_id=clubs.id join persons on persons.id=club_persons.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1;

CREATE OR REPLACE FUNCTION f_native_login(TEXT, TEXT)
RETURNS text AS $$
DECLARE
	found_email_id native_logins.email_id%TYPE;
	found_native_login_id native_logins.id%TYPE;
	result_set text;
BEGIN
	select into found_email_id f_get_native_email_id($1);	

	IF found_email_id > 0 THEN
        	SELECT id INTO found_native_login_id FROM native_logins 
        	WHERE email_id = found_email_id AND password = (CRYPT($2, password));
                
		IF found_native_login_id > 0 THEN
			 result_set = f_format_result_set_jwt(found_email_id,null,-100);
                ELSE
			 result_set = f_format_result_set(found_email_id,'Bad password.',-101);
                END IF;
	ELSE
		result_set = f_format_result_set(found_email_id,'Email does not exist',-101);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--END NATIVE

--BEGIN CHOOSE PERSON
CREATE OR REPLACE FUNCTION f_choose_person(int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
	result_set = f_format_result_set($1,null,-100);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END CHOOSE PERSON


--GOOGLE

CREATE OR REPLACE FUNCTION f_get_google_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
        found_email_id google_logins.email_id%TYPE;
BEGIN
        SELECT google_logins.email_id INTO found_email_id FROM google_logins
        join emails on emails.id=google_logins.email_id
        WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE p_insert_google_login(email_name TEXT, google_id text, id_token TEXT, first_name TEXT, last_name TEXT, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	returning_email_id integer;
        returning_google_login_id integer;
	returning_person_id integer;
BEGIN
	insert into emails (email) values (email_name) returning id into x;
        insert into google_logins (email_id, google_id, id_token) values (x, google_id, id_token) returning id into returning_google_login_id;
        insert into persons (first_name, last_name) values (first_name, last_name) returning id into returning_person_id;
	insert into emails_persons (email_id, person_id) values (x, returning_person_id); 
END;
$$;

CREATE OR REPLACE PROCEDURE p_update_google_login(email_name TEXT, google_id text, id_token TEXT, first_name TEXT, last_name TEXT, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	returning_email_id integer;
        returning_google_login_id integer;
        returning_person_id integer;
BEGIN
	insert into emails (email) values (email_name) returning id into returning_email_id;
        insert into google_logins (email_id, google_id, id_token) values (returning_email_id, google_id, id_token) returning id into returning_google_login_id;
        insert into persons (first_name, last_name) values (first_name, last_name) returning id into returning_person_id;
END;
$$;


CREATE OR REPLACE FUNCTION f_google_login(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT)
RETURNS text AS $$
DECLARE
	
        found_email_id emails.id%TYPE;
        found_google_login_id google_logins.id%TYPE;
        found_email_person_id emails_persons.id%TYPE;
        found_person_id persons.id%TYPE;
        found_club_id clubs.id%TYPE;
        
	found_club_invite_token invite_club_emails.club_invite_token%TYPE;
        
	returning_person_id integer;

        result_set text;
	DECLARE x int := -111;
BEGIN

        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN --do an update and if no person or user do an insert on them
        	SELECT id INTO found_google_login_id FROM google_logins
        	WHERE email_id = found_email_id;
		IF found_google_login_id THEN
			update google_logins set id_token = $3   
			where id = found_google_login_id; 
		ELSE
			insert into google_logins (email_id, google_id, id_token) values (found_email_id, $2, $3);
		END IF;

                SELECT id INTO found_email_person_id FROM emails_persons
                WHERE email_id = found_email_id;
                IF found_email_person_id > 0 THEN
			--do nothing
                ELSE
        		insert into persons (first_name, last_name) values ($4,$5) returning id into found_person_id;
                        insert into emails_persons (email_id,person_id) values (found_email_id,found_person_id);
                END IF;

        ELSE --if there is no email then logically you cannot have the other tables so do a full insert, also we wont have an invite as we would have made an insert into email
		CALL p_insert_google_login($1,$2,$3,$4,$5,x);
		found_email_id = x;
	END IF;


        IF found_email_id > 0 THEN
		result_set = f_format_result_set_jwt(found_email_id,null,-100);
        ELSE
		result_set = f_format_result_set_jwt(found_email_id,'Could not find email.',-101);
        END IF;

	IF $6 is NULL THEN
		--do nothing
	ELSE
		SELECT club_id into found_club_id from invite_club_emails where club_invite_token = $6;
		insert into club_persons (club_id, person_id) values (found_club_id, found_person_id);
	END IF;	

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

	--RAISE INFO 'information message %', now() ;
  	--RAISE LOG 'log message %', now();
  	--RAISE DEBUG 'debug message %', now();
  	--RAISE WARNING 'warning message %', now();
  	--RAISE NOTICE 'notice message %', now();

CREATE OR REPLACE FUNCTION f_insert_accept_club_invite(TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
        found_club_id clubs.id%TYPE;
	result_set text;
	DECLARE x int := -1;
BEGIN
	select email_id into found_email_id from invite_club_emails where club_invite_token = $1; 

	IF found_email_id > 0 THEN
		
		--lets grab the club_id then add all persons to club from email_id
		SELECT club_id INTO found_club_id FROM invite_club_emails WHERE club_invite_token = $1;
		CALL p_insert_club_persons(found_club_id,found_email_id);

                result_set = f_format_result_set_jwt(found_email_id,null,-100);
	ELSE
                result_set = f_format_result_set_invite_club_emails($1);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


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

--INSERT CLUB MEMBERS
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
		result_set = f_format_result_set(email_id,'Club name already exists',-101);
       	ELSE
		IF person_id > 0 THEN

			CALL p_insert_club($1,$2,email_id,person_id,x);
			IF x > 0 THEN
				result_set = f_format_result_set(email_id,null,-100);
			ELSE
				result_set = f_format_result_set(email_id,'Something went wrong with adding club. Sorry!',-101);
			END IF;
		ELSE
			result_set = f_format_result_set(email_id,'You must add a person to this account before you add a club.',-101);
		END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN INSERT PRACTICE --11                                                               --11
CREATE OR REPLACE FUNCTION f_insert_practice(int,int,date,time,time,time,text,text,int,text,int, date,date,boolean,boolean,boolean,boolean,boolean,boolean,boolean)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
	found_team_club_manager_id team_club_persons_club_managers.id%TYPE;
BEGIN
        select team_club_persons_club_managers.id into found_team_club_manager_id 
	from team_club_persons_club_managers
        join team_club_persons on team_club_persons.id=team_club_persons_club_managers.team_club_person_id
        join teams on teams.id=team_club_persons.team_id
        where teams.id = $2;

	IF found_team_club_manager_id > 0 THEN                     --dont need 11 because it is person id
        	CALL p_insert_practice($2,$3,$4,$5,$6,$7,$8,$9,$10,$12,$13,$14,$15,$16,$17,$18,$19,$20,x);
        	IF x > 0 THEN
                	result_set = f_format_result_set($1,null,-100);
        	ELSE
                	result_set = f_format_result_set($1,'Something went wrong with adding practice.',-101);
        	END IF;
	ELSE
                --result_set = f_format_result_set($1,'You must be a manager of this team to create a practice. Contact your administrator.',-101);
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT PRACTICE

--BEGIN INSERT PRACTICE                                                                  --date
CREATE OR REPLACE PROCEDURE p_insert_practice(int,date,time,time,time,text,text,int,text,date,date,boolean,boolean,boolean,boolean,boolean,boolean,boolean,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

next_date DATE := $10;
duration  INTERVAL;
day       INTERVAL;
day_of_week int := -1;

sunday_num    int := -1;
monday_num    int := -1;
tuesday_num   int := -1;
wednesday_num int := -1;
thursday_num  int := -1;
friday_num    int := -1;
saturday_num  int := -1;

BEGIN
	IF $12 THEN
		sunday_num = 7;
	END IF;

	IF $13 THEN
		monday_num = 1;
	END IF;

	IF $14 THEN
		tuesday_num = 2;
	END IF;

	IF $15 THEN
		wednesday_num = 3;
	END IF;

	IF $16 THEN
		thursday_num = 4;
	END IF;

	IF $17 THEN
		friday_num = 5;
	END IF;

	IF $18 THEN
		saturday_num = 6;
	END IF;
	
	--insert practice
	IF $10 is null THEN
		IF $8 > 0 THEN
			insert into practice (team_id, start_date, end_date) values ($1,$2,$2) returning id into x;
			insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name, pitch_id) values (x, $2, $3,$4,$5,$6,$7,$9,$8) returning id into x;
		ELSE
			insert into practice (team_id, start_date, end_date) values ($1,$2,$2) returning id into x;
			insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values (x, $2, $3,$4,$5,$6,$7,$9) returning id into x;
		END IF;
		--insert into practices (practice_id,event_date) values (x,$2);
	ELSE
       		IF $8 > 0 THEN
			insert into practice (team_id, start_date, end_date) values ($1,$10,$11) returning id into x;
                ELSE
			insert into practice (team_id, start_date, end_date) values ($1,$10,$11) returning id into x;
                END IF;
	END IF;

	--insert practices
	duration := '1 day'::interval;

        WHILE next_date <= $11 LOOP

        	--next_date := next_date;
		--next_date := next_date + duration;

		SELECT EXTRACT(ISODOW FROM next_date) INTO day_of_week;
		day_of_week := day_of_week;
	
		IF day_of_week = sunday_num OR day_of_week = monday_num OR day_of_week = tuesday_num OR day_of_week = wednesday_num OR day_of_week = thursday_num OR day_of_week = friday_num OR day_of_week = saturday_num THEN
			--you need to check pitch status here now as well....
       			IF $8 > 0 THEN

				insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name, pitch_id) values (x, next_date, $3,$4,$5,$6,$7,$9,$8);
			ELSE
				insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values (x, next_date, $3,$4,$5,$6,$7,$9);
			END IF;

			--insert into practices (practice_id,event_date) values (x,next_date);
		ELSE
			--do nothing
		END IF;

		--increment date
		next_date := next_date + duration;
        END LOOP;

END;
$$;
--END INSERT PRACTICE

--BEGIN INSERT GAME
CREATE OR REPLACE FUNCTION f_insert_game(int,int,date,time,time,time,text,text,int,text,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
	found_team_club_manager_id team_club_persons_club_managers.id%TYPE;
BEGIN
        select team_club_persons_club_managers.id into found_team_club_manager_id 
	from team_club_persons_club_managers
        join team_club_persons on team_club_persons.id=team_club_persons_club_managers.team_club_person_id
        join teams on teams.id=team_club_persons.team_id
        where teams.id = $2;

	IF found_team_club_manager_id > 0 THEN
        	CALL p_insert_game($2,$3,$4,$5,$6,$7,$8,$9,$10,x);
        	IF x > 0 THEN
                	result_set = f_format_result_set($1,null,-100);
        	ELSE
                	result_set = f_format_result_set($1,'Something went wrong with adding game.',-101);
        	END IF;
	ELSE
                --result_set = f_format_result_set($1,'You must be a manager of this team to create a game. Contact your administrator.',-101);
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT GAME

--BEGIN INSERT GAME
CREATE OR REPLACE PROCEDURE p_insert_game(int,date,time,time,time,text,text,int,text,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
	IF $8 > 0 THEN
		insert into games (team_id, event_date, arrival_time, start_time, end_time, address, coordinates, pitch_id, field_name) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id into x;
	ELSE
		insert into games (team_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values ($1,$2,$3,$4,$5,$6,$7,$9) returning id into x;
	END IF;
END;
$$;
--END INSERT PRACTICE


CREATE OR REPLACE PROCEDURE p_update_availability(text,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	ids INT[];
        DECLARE i int := 0;
		
BEGIN
	ids = string_to_array($1,',');

	FOR i IN 1..array_upper(ids, 1) BY 4
	
	LOOP
		IF ids[i] = 2 THEN
			insert into practices_players_availability (availability_id, practice_id, team_club_persons_club_players_id) values (ids[i + 1], ids[i + 2], ids[i + 3]) 
			ON CONFLICT (practice_id, team_club_persons_club_players_id) 
			DO UPDATE SET availability_id = ids[i + 1], modified = now();   
		ELSE

		END IF;

	END LOOP;
END;
$$;


CREATE OR REPLACE FUNCTION f_update_availability(int,text)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN
        IF $2 is NULL THEN
	ELSE

		CALL p_update_availability($2,x);

                IF x > 0 THEN
                        result_set = f_format_result_set($1,null,-100);
                ELSE
                        result_set = f_format_result_set($1,'Something went wrong with setting availability. Please try again.',-101);
                END IF;
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT PITCHES
CREATE OR REPLACE FUNCTION f_select_pitches_and_teams(email_id_p int,club_id_p int,person_id_p int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = f_format_result_set_pitches_and_teams(email_id_p,null,-102,club_id_p, person_id_p);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECT EVENTS
CREATE OR REPLACE FUNCTION f_select_events(email_id int, first_day_of_query date, last_day_of_query date)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
	result_set = f_format_result_set_events(email_id, null,-100, first_day_of_query, last_day_of_query);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECT PERSON
CREATE OR REPLACE FUNCTION f_select_person(email_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
	result_set = f_format_result_set(email_id,null,-102);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECTED PERSON
CREATE OR REPLACE FUNCTION f_selected_person(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = f_format_result_set(email_id,null,-100);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


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
		result_set = f_format_result_set(email_id,null,-100);
        ELSE
		result_set = f_format_result_set(email_id,'Person not added',-101);
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
	
			result_set = f_format_result_set($1,'You do not have permission to delete Person. They are on a team. Let your team manager know.',-101);
			--this is good enough as you should delete players on another screen.

		ELSE
			--no worries this person is not a player on a team go ahead and delete
        		CALL p_delete_person($3,x);

        		IF x > 0 THEN
				result_set = f_format_result_set($1,null,-100);
        		ELSE
				result_set = f_format_result_set($1,'Something went wrong',-101);
        		END IF;

		END IF;
	ELSE
		result_set = f_format_result_set($1,'Total persons less than 2 so we cannot delete.',-101);
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
                	result_set = f_format_result_set($1,null,-100);
                ELSE
                	result_set = f_format_result_set($1,'Something went wrong while trying to delete club. Sorry.',-101);
                END IF;
	ELSE
		result_set = f_format_result_set($1,'You do not have permission to delete this club. Only a club administrator can delete a club.',-101);
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_club(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
	delete from club_emails where club_id = $1;
	delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = $1;
	delete from club_players using club_persons where club_persons.club_id = $1;
	delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = $1;
	delete from club_administrators using club_persons where club_persons.club_id = $1;
	delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = $1;
	delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = $1;
	delete from team_club_persons_club_managers using club_managers, club_persons  where club_persons.club_id = $1;
	delete from team_club_persons using club_persons where club_persons.club_id = $1;
	delete from club_managers using club_persons where club_persons.club_id = $1;
	delete from club_persons where club_id = $1;
	delete from teams where club_id = $1;
	delete from pitches where club_id = $1;
	delete from clubs where id = $1 returning id into x;
END;
$$;
--END DELETE PERSON

--email_id,club_id,person_id,club_persons_id,name
CREATE OR REPLACE PROCEDURE p_insert_team(int,text,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	returning_team_id teams.id%TYPE;
	found_club_person_id club_persons.id%TYPE;
	found_manager_id managers.id%TYPE;
	found_club_manager_id club_managers.id%TYPE;
	returning_team_club_person_id team_club_persons.id%TYPE;
	returning_club_administrator_id club_administrators.id%TYPE;
BEGIN
       	insert into teams (club_id,name) values ($1,$2) returning id into returning_team_id;
	select id into found_club_person_id from club_persons where club_id = $1 AND person_id = $3;
	insert into team_club_persons (team_id,club_person_id) values (returning_team_id,found_club_person_id) returning id into returning_team_club_person_id;

	--insert into managers (person_id) values ($3) ON CONFLICT ON CONSTRAINT managers_person_id_key select id into returning_manager      DO NOTHING     returning id into returning_manager_id;
	select id into found_manager_id from managers where person_id = $3;

	IF found_manager_id > 0 THEN
		--DO NOTHING
	ELSE
		insert into managers (person_id) values ($3) returning id into found_manager_id;
	END IF;


	select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;

	IF found_club_manager_id > 0 THEN 
		--DO NOTHING
	ELSE
		insert into club_managers (club_person_id,manager_id) values (found_club_person_id,found_manager_id) returning id into found_club_manager_id;
	END IF;

	insert into team_club_persons_club_managers (team_club_person_id,club_manager_id) values (returning_team_club_person_id, found_club_manager_id) returning id into x;

	select id into returning_club_administrator_id from club_administrators where club_person_id = found_club_person_id; 
	
	--insert into team_club_persons_club_administrators (team_club_person_id, club_administrator_id) values (returning_team_club_person_id, 1);
	insert into team_club_persons_club_administrators (team_club_person_id, club_administrator_id) values (returning_team_club_person_id, returning_club_administrator_id);
END;
$$;
--------------------
CREATE OR REPLACE PROCEDURE p_insert_pitch(int,text,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
        insert into pitches (club_id,name) values ($1,$2) returning id into x;
END;
$$;


----------------

--BEGIN SELECT ADMINISTRATED CLUBS
CREATE OR REPLACE FUNCTION f_select_administrated_clubs(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
	result_set = f_format_result_set_administrated_clubs(email_id,null,-102,$2);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT CLUBS OF TEAMS MANAGED
CREATE OR REPLACE FUNCTION f_select_clubs_of_teams_managed(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = f_format_result_set_clubs_of_teams_managed(email_id,null,-102,$2);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--not using person id to check if club admin but need too!!!!!!!!!!!!!
--email_id,club_id,person_id,name
CREATE OR REPLACE FUNCTION f_insert_team(int,int,int,text)
RETURNS text AS $$
DECLARE
	result_set text;
	DECLARE x int := -1;
	found_club_administrator_id club_administrators.id%TYPE;
	found_club_persons_id club_persons.id%TYPE;
	found_team_id teams.id%TYPE;
BEGIN
	select id into found_team_id from teams where name = $4 AND club_id = $2;  	

        IF found_team_id > 0 THEN
                result_set = f_format_result_set_administrated_clubs($1,'Team name already exists',-101,$3);
	ELSE
		--are you a club admin of club $2????
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.club_id = $2 AND club_persons.person_id = $3; 

		IF found_club_administrator_id > 0 THEN

			CALL p_insert_team($2,$4,$3,x);

			IF x > 0 THEN
                     		result_set = f_format_result_set($1,null,-100);
			ELSE
                     		result_set = f_format_result_set($1,'Something went wrong with adding team. Sorry!',-101);
			END IF;
		ELSE
                     	result_set = f_format_result_set($1,'You are not a club administrator. So you cannot add a team to this club.',-101);
		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
-------

CREATE OR REPLACE FUNCTION f_insert_pitch(int,int,int,text)
RETURNS text AS $$
DECLARE
	result_set text;
	DECLARE x int := -1;
	found_club_administrator_id club_administrators.id%TYPE;
	found_club_persons_id club_persons.id%TYPE;
	found_pitch_id pitches.id%TYPE;
BEGIN
		
	select id into found_pitch_id from pitches where name = $4 AND club_id = $2;  	

        IF found_pitch_id > 0 THEN
		result_set = f_format_result_set_administrated_clubs($1,'Pitch name already exists',-101,$3);
	ELSE
		--are you a club admin of club $2????
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.club_id = $2 AND club_persons.person_id = $3; 

		IF found_club_administrator_id > 0 THEN

			CALL p_insert_pitch($2,$4,$3,x);

			IF x > 0 THEN
                     		result_set = f_format_result_set($1,null,-100);
			ELSE
                     		result_set = f_format_result_set($1,'Something went wrong with adding pitch. Sorry!',-101);
			END IF;
		ELSE
                     	result_set = f_format_result_set($1,'You are not a club administrator. So you cannot add a pitch to this club.',-101);
		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
-------


CREATE OR REPLACE FUNCTION f_insert_forgot_password(TEXT, TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
        returning_forgot_passwords_id forgot_passwords.id%TYPE;
        result_set text;
BEGIN
        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN 
		delete from forgot_passwords where email_id = found_email_id; 
		insert into forgot_passwords (email_id, forgot_password_token, expires) values (found_email_id, $2, NOW() + interval '1 hour') returning id into returning_forgot_passwords_id;	
		IF returning_forgot_passwords_id > 0 THEN
			--result_set = '-101, Success. We sent you an email to help you login.';
                     	--result_set = f_format_result_set(found_email_id,0,0,0,null,-100);
                     	result_set = f_format_result_set_jwt(found_email_id,'We sent you an email to change password.',-101);
		ELSE
                     	result_set = f_format_result_set_jwt(found_email_id,'Something went wrong with process. Sorry! Please try again.',-101);
		END IF;
	ELSE
                result_set = f_format_result_set_jwt(found_email_id,'That email does not exist in our system. Please try a valid email address.',-101);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--------

CREATE OR REPLACE FUNCTION f_insert_email(TEXT, TEXT)
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
			result_set = f_format_result_set(found_email_id,'That email already has a login associated with it. Would you like to login?',-102); 
		ELSE
			insert into insert_native_login_tokens (email_id, token, expires) values (found_email_id, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN
				message = 'We sent you a link to your email to finish joining.';
				result_set = f_format_result_set(found_email_id,message,-101); -- we want you to clear screen but stay on screen and display message... 
			ELSE
				result_set = f_format_result_set(found_email_id,'Something went wrong with process. Sorry! Please try again.',-101); -- we want you to clear screen but stay on screen and display message.. 
			END IF;
		END IF;
	ELSE
		CALL p_insert_email($1,x);
		IF x > 0 THEN 

			insert into insert_native_login_tokens (email_id, token, expires) values (x, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN
  				RAISE LOG 'IF A log message %', x;
				result_set = f_format_result_set(x,'We sent you a link to your email to finish joining.',-101);
			ELSE
				RAISE LOG 'ELSE A log message %', x;
				result_set = f_format_result_set(0,'Something went wrong with process. Sorry! Please try again.',-101);
			END IF;
		ELSE
		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
-------

CREATE OR REPLACE FUNCTION f_insert_email_club(TEXT, TEXT, int)
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
			result_set = f_format_result_set(found_email_id,'That email already has a login associated with it. But we added it to your club.',-101); 
		ELSE
			insert into insert_native_login_tokens (email_id, token, expires) values (found_email_id, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN
				message = 'We sent an email to your invitee to finish joining.';
				result_set = f_format_result_set(found_email_id,message,-100); --  
			ELSE
				result_set = f_format_result_set(found_email_id,'Something went wrong with process. Sorry! Please try again.',-101); -- we want you to clear screen but stay on screen and display message.. 
			END IF;
		END IF;
	ELSE
		CALL p_insert_email($1,x);
		IF x > 0 THEN 
			insert into insert_native_login_tokens (email_id, token, expires) values (x, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN
				result_set = f_format_result_set(x,'We a link to your invitee to finish joining.',-100);
			ELSE
				result_set = f_format_result_set(0,'Something went wrong with process. Sorry! Please try again.',-101);
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
--------



--email_id old guy, person_id, club_id, email_id of new guy,token
CREATE OR REPLACE PROCEDURE p_insert_invite_club_email(int, int, int, int, TEXT, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_invite_club_person_id invite_club_emails.id%TYPE;
        found_club_administrator_id club_administrators.id%TYPE;
BEGIN
	insert into invite_club_emails (email_id, club_id, club_invite_token, expires) values ($4, $3, $5, NOW() + interval '1 week') returning id into returning_invite_club_person_id;	
	select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id join persons on persons.id=club_persons.person_id join clubs on clubs.id=club_persons.club_id where club_id = $3 and persons.id = $2; 
	insert into invite_club_emails_club_administrators (invite_club_person_id, club_administrator_id) values (returning_invite_club_person_id, found_club_administrator_id);

	insert into club_emails (club_id, email_id) values ($3,$4);

	select email_id into x from emails_persons where person_id = $2;
END;
$$;


CREATE OR REPLACE FUNCTION f_insert_invite_club_email(int, int, int, TEXT, TEXT) --email_id, person_id, club_id, email,token
RETURNS text AS $$
DECLARE
	DECLARE x int := -1;
        found_email_id emails.id%TYPE;
        returning_email_id emails.id%TYPE;
        found_club_email_id club_emails.id%TYPE;
        result_set text;
BEGIN
        select into found_email_id f_get_email_id($4);

	IF found_email_id > 0 THEN
		select id into found_club_email_id from club_emails where club_id = $3 AND email_id = found_email_id; 

		IF found_club_email_id > 0 THEN
			result_set = f_format_result_set($1,'This email is already associated with this club',-100);
		ELSE
			CALL p_insert_invite_club_email($1,$2,$3,found_email_id,$5,x);
		END IF;
	ELSE --call without a found_email_id
		insert into emails (email) values ($4) returning id into returning_email_id; 
		CALL p_insert_invite_club_email($1,$2,$3,returning_email_id,$5,x);
	END IF;

	IF x > 0 THEN
		result_set = f_format_result_set($1,null,-100);
	ELSE
		result_set = f_format_result_set($1,'Something went wrong.',-101);
	END IF;

        
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

