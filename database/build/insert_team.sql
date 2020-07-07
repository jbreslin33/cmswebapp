CREATE OR REPLACE FUNCTION f_select_club_teams(p_family_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -1;
        found_club_administrator_id club_administrators.id%TYPE;
        found_club_persons_id club_persons.id%TYPE;
        found_team_id teams.id%TYPE;
BEGIN

	result_set = CONCAT
       	(
        
		j_select_persons(p_family_id),
                ',',
                j_select_messages(''),
                ',',
                j_select_codes(-101),
                ',',
                j_select_club_teams(p_club_id)
	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT TEAM


CREATE OR REPLACE FUNCTION f_insert_team(p_family_id int, p_person_id int, p_club_id int, p_name text)
RETURNS text AS $$
DECLARE
	result_set text;
	DECLARE x int := -1;
	found_club_administrator_id club_administrators.id%TYPE;
	found_club_persons_id club_persons.id%TYPE;
	found_team_id teams.id%TYPE;
BEGIN
	select teams.id into found_team_id from teams 
		join clubs_teams on clubs_teams.team_id = teams.id
	
	where teams.name = p_name AND clubs_teams.club_id = p_club_id;  	

        IF found_team_id > 0 THEN

                result_set = CONCAT
                (
                        j_select_messages('Team name already exists.'),
                        ',',
                        j_select_codes(-101)
                        ',',
                        j_select_administrated_clubs(p_person_id),
                        ',',
                	j_select_club_teams(p_club_id)
           	);

	ELSE
		--are you a club admin of club $2????
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.club_id = $3 AND club_persons.person_id = $2; 

		IF found_club_administrator_id > 0 THEN

			CALL p_insert_team(p_person_id, p_club_id, p_name, x);

			IF x > 0 THEN
			       	result_set = CONCAT
        			(
                			j_select_persons(p_family_id),
                			',',
                			j_select_messages(null),
                			',',
                			j_select_codes(-101),
                			',',
                			j_select_club_teams(p_club_id)
        			);

			ELSE
                         	result_set = CONCAT
                                (
                                        j_select_persons(p_family_id),
                                        ',',
                                        j_select_messages('Something went wrong with adding team. Sorry!'),
                                        ',',
                                        j_select_codes(-101),
                			',',
                			j_select_club_teams(p_club_id)
                                );

			END IF;
		ELSE
                        result_set = CONCAT
                        (
                        	j_select_persons(p_family_id),
                                ',',
                                j_select_messages('You are not a club administrator. So you cannot add a team to this club.'),
                                ',',
                                j_select_codes(-101),
                		',',
                		j_select_club_teams(p_club_id)
                      	);

		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT TEAM


--INSERT TEAM
CREATE OR REPLACE PROCEDURE p_insert_team(p_person_id int, p_club_id int, p_name text,INOUT x int)
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
        insert into teams (name) values (p_name) returning id into returning_team_id;
	insert into clubs_teams (club_id, team_id) values (p_club_id, returning_team_id);
        select id into found_club_person_id from club_persons where club_id = p_club_id AND person_id = p_person_id;
        insert into team_club_persons (team_id,club_person_id) values (returning_team_id,found_club_person_id) returning id into returning_team_club_person_id;

        select id into found_manager_id from managers where person_id = p_person_id;

        IF found_manager_id > 0 THEN
                --DO NOTHING
        ELSE
                insert into managers (person_id) values (p_person_id) returning id into found_manager_id;
        END IF;


        select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;

        IF found_club_manager_id > 0 THEN
                --DO NOTHING
        ELSE
                insert into club_managers (club_person_id,manager_id) values (found_club_person_id,found_manager_id) returning id into found_club_manager_id;
        END IF;

        insert into team_club_managers (team_id, club_manager_id) values (returning_team_id, found_club_manager_id) returning id into x;

        select id into returning_club_administrator_id from club_administrators where club_person_id = found_club_person_id;

END;
$$;

