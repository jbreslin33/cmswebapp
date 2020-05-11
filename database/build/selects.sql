


--BEGIN J_SELECT PITCHES
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


