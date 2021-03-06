


--BEGIN J_SELECT PITCHES
CREATE OR REPLACE FUNCTION j_select_pitches(p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select pitches.id, pitches.name, pitches.address from pitches 
			join clubs_pitches on clubs_pitches.pitch_id = pitches.id
		where clubs_pitches.club_id = p_club_id
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
CREATE OR REPLACE FUNCTION j_select_administrated_clubs(p_person_id int)
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
                where club_persons.person_id = p_person_id
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
CREATE OR REPLACE FUNCTION j_select_clubs_of_teams_managed(p_person_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
               	select distinct clubs.id, clubs.name from team_club_managers
			join club_managers on club_managers.id = team_club_managers.club_manager_id
			join club_persons on club_persons.id = club_managers.club_person_id
			join clubs on clubs.id = club_persons.club_id
                where club_persons.person_id = p_person_id 

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


--BEGIN J_SELECT FAMILIES
CREATE OR REPLACE FUNCTION j_select_families(email_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select distinct families.id, families.name

                from families
                        join families_persons on families_persons.family_id = families.id
                        join emails_persons on emails_persons.person_id = families_persons.person_id

                where emails_persons.email_id = $1

        ) t;
        IF raw_json is NULL THEN
                result_set = CONCAT('"families": []', raw_json);
        ELSE
                result_set = CONCAT('"families": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT FAMILIES


--BEGIN J_SELECT PERSONS
CREATE OR REPLACE FUNCTION j_select_persons(family_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
	from
        (
		select persons.id as id, first_name, case when middle_name IS NULL THEN '' ELSE middle_name END, last_name, players.id as player_id, parents.id as parent_id, coaches.id as coach_id, managers.id as manager_id, administrators.id as administrator_id from persons 
			full outer join emails_persons on emails_persons.person_id=persons.id 
			full outer join families_persons on families_persons.person_id = emails_persons.person_id 
			full outer join players on players.person_id=persons.id 
			full outer join parents on parents.person_id=persons.id 
			full outer join coaches on coaches.person_id=persons.id 
			full outer join managers on managers.person_id=persons.id 
			full outer join administrators on administrators.person_id=persons.id 
		where families_persons.family_id = $1 

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
CREATE OR REPLACE FUNCTION j_select_teams(p_family_id int)
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
                join families_persons on families_persons.person_id=persons.id
                where families_persons.family_id = p_family_id 
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

--BEGIN J_SELECT TEAMS
CREATE OR REPLACE FUNCTION j_select_club_teams(p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select teams.id as team_id, teams.name as team_name from teams
			join clubs_teams on clubs_teams.team_id = teams.id
		where clubs_teams.club_id = p_club_id
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

--BEGIN J_SELECT PITCHES
CREATE OR REPLACE FUNCTION j_select_club_pitches(p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select pitches.id as pitch_id, pitches.name as pitch_name 
		from pitches
			join clubs_pitches on clubs_pitches.pitch_id = pitches.id
                where clubs_pitches.club_id = p_club_id
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


CREATE OR REPLACE FUNCTION j_select_club_players_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_players

                join
                        club_persons on club_persons.id=club_players.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_players_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_players_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_players_interest_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_players_interest

                join
                        club_persons on club_persons.id=club_players_interest.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_players_interest_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_players_interest_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_players_lead_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_players_lead

                join
                        club_persons on club_persons.id=club_players_lead.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_players_lead_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_players_lead_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_players_prospect_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_players_prospect

                join
                        club_persons on club_persons.id=club_players_prospect.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_players_prospect_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_players_prospect_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_players_potential_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_players_potential

                join
                        club_persons on club_persons.id=club_players_potential.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_players_potential_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_players_potential_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION j_select_club_parents_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_parents

                join
                        club_persons on club_persons.id=club_parents.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_parents_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_parents_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_club_parents_interest_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_parents_interest

                join
                        club_persons on club_persons.id=club_parents_interest.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_parents_interest_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_parents_interest_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_club_parents_lead_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_parents_lead

                join
                        club_persons on club_persons.id=club_parents_lead.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_parents_lead_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_parents_lead_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_parents_prospect_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_parents_prospect

                join
                        club_persons on club_persons.id=club_parents_prospect.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_parents_prospect_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_parents_prospect_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_club_parents_potential_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_parents_potential

                join
                        club_persons on club_persons.id=club_parents_potential.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_parents_potential_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_parents_potential_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION j_select_club_coaches_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_coaches

                join
                        club_persons on club_persons.id=club_coaches.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_coaches_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_coaches_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_club_coaches_interest_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_coaches_interest

                join
                        club_persons on club_persons.id=club_coaches_interest.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_coaches_interest_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_coaches_interest_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_coaches_lead_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        ( 
                select
                        persons.id as person_id

                from
                        club_coaches_lead

                join
                        club_persons on club_persons.id=club_coaches_lead.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_coaches_lead_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_coaches_lead_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_coaches_prospect_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_coaches_prospect

                join
                        club_persons on club_persons.id=club_coaches_prospect.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_coaches_prospect_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_coaches_prospect_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_club_coaches_potential_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_coaches_potential

                join
                        club_persons on club_persons.id=club_coaches_potential.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_coaches_potential_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_coaches_potential_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_club_managers_id(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        persons.id as person_id

                from
                        club_managers

                join
                        club_persons on club_persons.id=club_managers.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = p_person_id AND club_persons.club_id = p_club_id 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_managers_id": []', raw_json);
        ELSE
                result_set = CONCAT('"club_managers_id": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_team_club_players(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                       	team_club_players.team_id as team_id,
                        team_club_players.id as team_club_player_id 

                        from
                                team_club_players
                join
			club_players on club_players.id = team_club_players.club_player_id	

		join
                        club_persons on club_persons.id = club_players.club_person_id

                where
                        club_persons.person_id = p_person_id AND club_persons.club_id = p_club_id 
	) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"team_club_players": []', raw_json);
        ELSE
                result_set = CONCAT('"team_club_players": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_team_club_players_interest(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        team_club_players_interest.team_id as team_id,
                        team_club_players_interest.id as team_club_player_id

                        from
                                team_club_players_interest
                join
                        club_players_interest on club_players_interest.id = team_club_players_interest.club_players_interest_id

                join
                        club_persons on club_persons.id = club_players_interest.club_person_id

                where
                        club_persons.person_id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"team_club_players": []', raw_json);
        ELSE
                result_set = CONCAT('"team_club_players": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION j_select_team_club_parents(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        team_club_parents.team_id as team_id,
                        team_club_parents.id as team_club_parent_id

                        from
                                team_club_parents
                join
                        club_parents on club_parents.id = team_club_parents.club_parent_id

                join
                        club_persons on club_persons.id = club_parents.club_person_id

                where
                        club_persons.person_id = p_person_id AND club_persons.club_id = p_club_id 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"team_club_parents": []', raw_json);
        ELSE
                result_set = CONCAT('"team_club_parents": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_team_club_coaches(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        team_club_coaches.team_id as team_id,
                        team_club_coaches.id as team_club_coach_id

                        from
                                team_club_coaches
                join
                        club_coaches on club_coaches.id = team_club_coaches.club_coach_id

                join
                        club_persons on club_persons.id = club_coaches.club_person_id

                where
                        club_persons.person_id = p_person_id AND club_persons.club_id = p_club_id 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"team_club_coaches": []', raw_json);
        ELSE
                result_set = CONCAT('"team_club_coaches": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_team_club_managers(p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        team_club_managers.team_id as team_id,
                        team_club_managers.id as team_club_manager_id

                        from
                                team_club_managers
                join
                        club_managers on club_managers.id = team_club_managers.club_manager_id

                join
                        club_persons on club_persons.id = club_managers.club_person_id

                where
                        club_persons.person_id = p_person_id AND club_persons.club_id = p_club_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"team_club_managers": []', raw_json);
        ELSE
                result_set = CONCAT('"team_club_managers": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN J_SELECT PROFILES
CREATE OR REPLACE FUNCTION j_select_profiles(p_person_id int)
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
		where persons.id = p_person_id

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

--BEGIN J_SELECT CLUB PERSONS
CREATE OR REPLACE FUNCTION j_select_club_persons(int,int)
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
                persons.id as id

                from persons

                order by persons.last_name asc

        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"club_persons": []', raw_json);
        ELSE
                result_set = CONCAT('"club_persons": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT CLUB PERSONS


--BEGIN J_SELECT TEAMS MANAGED
CREATE OR REPLACE FUNCTION j_select_teams_managed(p_person_id int,p_club_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select teams.id, teams.name from teams
                        join team_club_managers on team_club_managers.team_id = teams.id
			join club_managers on club_managers.id = team_club_managers.club_manager_id
			join club_persons on club_persons.id = club_managers.club_person_id

                where
                        club_persons.club_id = p_club_id AND club_persons.person_id = p_person_id 
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

--BEGIN J_SELECT ALL TEAMS MANAGED
CREATE OR REPLACE FUNCTION j_select_all_teams_managed(p_person_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        teams.id, teams.name
                from
                        teams
                join team_club_managers on team_club_managers.team_id = teams.id
		join club_managers on club_managers.id = team_club_managers.club_manager_id 
		join club_persons on club_persons.id = club_managers.club_person_id
                where club_persons.person_id = p_person_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"teams": []', raw_json);
        ELSE
                result_set = CONCAT('"teams": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT ALL TEAMS MANAGED


--BEGIN J_SELECT CLUBS
--        result_set = CONCAT($1,',','{',json_result_clubs,',',json_result_teams,',',json_result_persons,'}');


--BEGIN J_SELECT PRACTICES
CREATE OR REPLACE FUNCTION j_select_practices(p_family_id int, first_day_of_query date, last_day_of_query date)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (

                select distinct club_persons.id as club_person_id, practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, pitches.name as pitch_name, practices.field_name, clubs.name as club_name, teams.name as team_name, teams.id as team_id, persons.first_name, persons.last_name

                from practices
		
		join practice_practices on practice_practices.practices_id = practices.id
                join practice on practice.id = practice_practices.practice_id

                join teams_practices on teams_practices.practice_id = practices.id
                join practices_pitches on practices_pitches.practice_id = practices.id
                join pitches on pitches.id = practices_pitches.pitch_id
                join teams on teams.id = teams_practices.team_id

                join team_club_persons on team_club_persons.team_id=teams.id

                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join families_persons on families_persons.person_id=persons.id

                full outer join club_players on club_players.club_person_id = club_persons.id
                full outer join club_parents on club_parents.club_person_id = club_persons.id

                full outer join team_club_players on team_club_players.team_id=teams.id

                where families_persons.family_id = p_family_id AND practices.event_date > $2 - interval '1 day' AND practices.event_date < $3

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

--BEGIN J_SELECT GAMES_PLAYER_AVAILABILITY
CREATE OR REPLACE FUNCTION j_select_games_player_availability(p_family_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select games_players_availability.id, games_players_availability.game_id, games_players_availability.team_club_player_id, games_players_availability.availability_id

                from
                        games_players_availability

                        join team_club_players on team_club_players.id=games_players_availability.team_club_player_id
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join families_persons on families_persons.person_id = club_persons.person_id

                        where families_persons.family_id = p_family_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"games_player_availability": []', raw_json);
        ELSE
                result_set = CONCAT('"games_player_availability": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_game_team_availability(p_game_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select distinct games_players_availability.id, games_players_availability.game_id, games_players_availability.team_club_player_id, games_players_availability.availability_id

                from
                        games_players_availability

                        join team_club_players on team_club_players.id=games_players_availability.team_club_player_id
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join families_persons on families_persons.person_id = club_persons.person_id

                        where games_players_availability.game_id = p_game_id
	) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"game_team_availability": []', raw_json);
        ELSE
                result_set = CONCAT('"game_team_availability": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--game
CREATE OR REPLACE FUNCTION j_select_practice_team_availability(p_practice_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select distinct practices_players_availability.id, practices_players_availability.practice_id, practices_players_availability.team_club_player_id, practices_players_availability.availability_id

                from
                        practices_players_availability

                        join team_club_players on team_club_players.id=practices_players_availability.team_club_player_id
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join emails_persons on emails_persons.person_id = club_persons.person_id

                        where practices_players_availability.practice_id = p_practice_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"practice_team_availability": []', raw_json);
        ELSE
                result_set = CONCAT('"practice_team_availability": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN J_SELECT PRACTICES_PLAYER_AVAILABILITY
CREATE OR REPLACE FUNCTION j_select_practices_player_availability(p_family_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select practices_players_availability.id, practices_players_availability.practice_id, practices_players_availability.team_club_player_id, practices_players_availability.availability_id

                from
                        practices_players_availability

                        join team_club_players on team_club_players.id = practices_players_availability.team_club_player_id
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join families_persons on families_persons.person_id = club_persons.person_id

                        where families_persons.family_id = p_family_id 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"practices_player_availability": []', raw_json);
        ELSE
                result_set = CONCAT('"practices_player_availability": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PRACTICES_PLAYER_AVAILABILITY



CREATE OR REPLACE FUNCTION j_select_games(p_family_id int, first_day_of_query date, last_day_of_query date)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (

                select distinct club_persons.id as club_person_id, games.id, games.event_date, games.arrival_time, games.start_time, games.end_time, games.address, games.coordinates, pitches.name as pitch_name, games.field_name, clubs.name as club_name, teams.name as team_name, teams.id as team_id, persons.first_name, persons.last_name

                from games

                join teams_games on teams_games.game_id = games.id
                join games_pitches on games_pitches.game_id = games.id
                join pitches on pitches.id = games_pitches.pitch_id
                join teams on teams.id = teams_games.team_id

                join team_club_persons on team_club_persons.team_id=teams.id

                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join families_persons on families_persons.person_id=persons.id

               	full outer join club_players on club_players.club_person_id = club_persons.id
               	full outer join club_parents on club_parents.club_person_id = club_persons.id

               	full outer join team_club_players on team_club_players.team_id=teams.id

                where families_persons.family_id = p_family_id AND games.event_date > $2 - interval '1 day' AND games.event_date < $3
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"games": []', raw_json);
	ELSE
                result_set = CONCAT('"games": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_games_players(p_family_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        distinct games.id as game_id, team_club_players.id as players, persons.first_name, persons.last_name
                from
                        games

                        join teams_games on teams_games.game_id = games.id
                        join team_club_players on team_club_players.team_id = teams_games.team_id
                        join club_players on club_players.id = team_club_players.id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join persons on persons.id = club_persons.person_id
                        join families_persons on families_persons.person_id = persons.id

                where
                        families_persons.family_id = p_family_id
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"games_players": []', raw_json);
        ELSE
                result_set = CONCAT('"games_players": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_practices_players(p_family_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        practices.id as practice_id, team_club_players.id as players, persons.first_name, persons.last_name
                from
                        practices

                        join teams_practices on teams_practices.practice_id = practices.id
                        join team_club_players on team_club_players.team_id = teams_practices.team_id
                        join club_players on club_players.id = team_club_players.id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join persons on persons.id = club_persons.person_id
                        join families_persons on families_persons.person_id = persons.id

                where
                        families_persons.family_id = p_family_id 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"practices_players": []', raw_json);
        ELSE
                result_set = CONCAT('"practices_players": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION j_select_game_roster(p_game_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        distinct games.id as game_id, team_club_players.id as players, persons.first_name, persons.last_name
                from
                        games

                        join teams_games on teams_games.game_id = games.id
                        join team_club_players on team_club_players.team_id = teams_games.team_id
                        join club_players on club_players.id = team_club_players.id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join persons on persons.id = club_persons.person_id
                        join emails_persons on emails_persons.person_id = persons.id

                where
                        games.id = p_game_id

	) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"game_roster": []', raw_json);
        ELSE
                result_set = CONCAT('"game_roster": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_practice_roster(p_practice_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        distinct practices.id as practice_id, team_club_players.id as players, persons.first_name, persons.last_name
                from
                        practices

                        join teams_practices on teams_practices.practice_id = practices.id
                        join team_club_players on team_club_players.team_id = teams_practices.team_id
                        join club_players on club_players.id = team_club_players.id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join persons on persons.id = club_persons.person_id
                        join emails_persons on emails_persons.person_id = persons.id

                where
                        practices.id = p_practice_id

        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"practice_roster": []', raw_json);
        ELSE
                result_set = CONCAT('"practice_roster": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION j_select_games_availability(int[])
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        distinct id as games_players_availability_id, game_id, team_club_player_id as players, availability_id
                from
			games_players_availability
                where game_id = ANY($1)
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"games_availability": []', raw_json);
        ELSE
                result_set = CONCAT('"games_availability": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION j_select_practices_availability(int[])
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select
                        distinct id as practices_players_availability_id, practice_id, team_club_player_id as players, availability_id
                from    
                        practices_players_availability
                where practice_id = ANY($1)

        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"practices_availability": []', raw_json);
        ELSE
                result_set = CONCAT('"practices_availability": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

