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
                                j_select_messages('Something went wrong with adding game.'),
                                ',',
                                j_select_codes(-101)
                        );

        	END IF;
	ELSE
		result_set = CONCAT
                (
                	j_select_persons($1),
                       	',',
                        j_select_messages('You must be a manager of this team to create a game. Contact your administrator.'),
                        ',',
                       j_select_codes(-101)
               	);
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

--INSERT TEAM
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

