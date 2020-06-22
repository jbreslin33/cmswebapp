--BEGIN INSERT GAME
CREATE OR REPLACE FUNCTION f_insert_game(int,int,date,time,time,time,text,text,int,text,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
	found_team_club_manager_id team_club_managers.id%TYPE;
BEGIN
        select team_club_managers.id into found_team_club_manager_id 
	from team_club_managers

		join club_managers on club_managers.id = team_club_managers.club_manager_id
        	join club_persons on club_persons.id = club_managers.club_person_id
        	join teams on teams.id = team_club_managers.team_id

        where teams.id = $2 AND club_persons.person_id = $2;

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

	returning_game_id games.id%TYPE;

BEGIN

	insert into games (event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values ($2,$3,$4,$5,$6,$7,$9) returning id into returning_game_id;
	insert into teams_games (team_id,game_id) values ($1,returning_game_id) returning id into x;

	IF $8 > 0 THEN
		insert into games_pitches (game_id, pitch_id) values (returning_game_id, $8); 
	END IF;
END;
$$;
--END INSERT PRACTICE


