

--BEGIN SELECT EVENTS
CREATE OR REPLACE FUNCTION f_select_events(email_id int, person_id int, first_day_of_query date, last_day_of_query date)
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
                j_select_codes(-100),
                ',',
		--j_select_clubs(email_id),
                --',',
		--j_select_teams(email_id),
                --',',
		j_select_games(email_id,$3,$4),
                ',',
		j_select_practices(email_id,$3,$4),
                ',',
		j_select_games_player_availability(email_id),
                ',',
		j_select_practices_player_availability(email_id),
                ',',
		j_select_all_teams_managed(person_id)
       	);

	--RAISE LOG 'result_set f_select_events:%s', result_set;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

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
		IF ids[i] = 1 THEN
			insert into games_players_availability (availability_id, game_id, team_club_persons_club_players_id) values (ids[i + 1], ids[i + 2], ids[i + 3]) 
			ON CONFLICT (game_id, team_club_persons_club_players_id) 
			DO UPDATE SET availability_id = ids[i + 1], modified = now() returning games_players_availability.id into x;   

		ELSE

		END IF;

		IF ids[i] = 2 THEN
			insert into practices_players_availability (availability_id, practice_id, team_club_persons_club_players_id) values (ids[i + 1], ids[i + 2], ids[i + 3]) 
			ON CONFLICT (practice_id, team_club_persons_club_players_id) 
			DO UPDATE SET availability_id = ids[i + 1], modified = now() returning practices_players_availability.id into x;   
		ELSE

		END IF;
		

	END LOOP;
END;
$$;


CREATE OR REPLACE FUNCTION f_update_availability(int,text)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := 0;
        json_result text;
BEGIN
        IF $2 is NULL THEN
	ELSE

		CALL p_update_availability($2,x);

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
                                j_select_messages('Something went wrong with setting availability. Please try again.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
