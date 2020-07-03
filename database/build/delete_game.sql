

--BEGIN DELETE CLUB
CREATE OR REPLACE FUNCTION f_delete_game(int, int, int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	found_team_club_manager_id team_club_managers.id%TYPE;
BEGIN

	select
        	team_club_managers.id
	into  
       		found_team_club_manager_id 
	from
        	team_club_managers

        	join club_managers on club_managers.id = team_club_managers.club_manager_id
		join club_persons on club_persons.id = club_managers.club_person_id 
		join teams on teams.id = team_club_managers.team_id

        where club_persons.person_id = $2 AND teams.id = $3;


	IF found_team_club_manager_id > 0 THEN

		CALL p_delete_game($3,x);

               	IF x > 0 THEN
		        result_set = CONCAT
                	(
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(-103) --delete success to stay on screen
                	);
			--RAISE LOG '1st ELSE %', x;

                ELSE
                       	result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Something went wrong while trying to delete game. Sorry.'),
                                ',',
                                j_select_codes(-101)
                        );
			--RAISE LOG '2nd ELSE %', x;

                END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                        ',',
                        j_select_messages('You do not have permission to delete this game. Only a team manager can delete a game.'),
                        ',',
                        j_select_codes(-101)
            	);
		--RAISE LOG '3rd ELSE %', result_set;

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_game(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN

	delete from games_pitches where game_id = $1;
	delete from teams_games where game_id = $1;
	delete from games_players_availability where game_id = $1; 
	delete from games where id = $1 returning id into x;

END;
$$;
--END DELETE CLUB
