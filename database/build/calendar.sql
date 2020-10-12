

--BEGIN SELECT EVENTS
CREATE OR REPLACE FUNCTION f_select_events(email_id int, family_id int, person_id int, first_day_of_query date, last_day_of_query date)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        
	result_set = CONCAT
        (
        	j_select_persons(family_id),
                ',',
                j_select_messages(null),
                ',',
                j_select_codes(-100),
                ',',
		j_select_games(family_id,first_day_of_query,last_day_of_query),
                ',',
		j_select_practices(family_id,first_day_of_query,last_day_of_query),
                ',',
		j_select_games_players(family_id),
                ',',
		j_select_practices_players(family_id),
                ',',
		j_select_games_player_availability(family_id),
                ',',
		j_select_practices_player_availability(family_id),
                ',',
		j_select_all_teams_managed(person_id)
       	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT EVENTS
CREATE OR REPLACE FUNCTION f_select_team_game_availability(family_id int, game_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN

        result_set = CONCAT
        (
                j_select_persons(family_id),
                ',',
                j_select_messages(null),
                ',',
                j_select_codes(-100),
                ',',
                j_select_game_roster(game_id),
                ',',
		j_select_game_team_availability(game_id)
        );

	--RAISE LOG 'result: %', result_set;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_select_team_practice_availability(family_id int, practice_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN

        result_set = CONCAT
        (
                j_select_persons(family_id),
                ',',
                j_select_messages(null),
                ',',
                j_select_codes(-100),
                ',',
                j_select_practice_roster(practice_id),
                ',',
                j_select_practice_team_availability(practice_id)
        );

       --RAISE LOG 'result: %', result_set;

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
			insert into games_players_availability (availability_id, game_id, team_club_player_id) values (ids[i + 1], ids[i + 2], ids[i + 3]) 
			ON CONFLICT (game_id, team_club_player_id) 
			DO UPDATE SET availability_id = ids[i + 1], modified = now() returning games_players_availability.id into x;   
		ELSE

		END IF;

		IF ids[i] = 2 THEN
			insert into practices_players_availability (availability_id, practice_id, team_club_player_id) values (ids[i + 1], ids[i + 2], ids[i + 3]) 
			ON CONFLICT (practice_id, team_club_player_id) 
			DO UPDATE SET availability_id = ids[i + 1], modified = now() returning practices_players_availability.id into x;   
		ELSE

		END IF;
	END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION f_update_availability(p_family_id int, p_person_id int, text)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := 1;
        DECLARE b int := 1;
        json_result text;
	idsA INT[];
	game_id_array INT[];
	practice_id_array INT[];
	found_team_club_manager_id             team_club_managers.id%TYPE;
	found_team_club_player_id             team_club_players.id%TYPE;
BEGIN

        idsA = string_to_array($3,',');

        FOR i IN 1..array_upper(idsA, 1) BY 4
        
	LOOP
		--email check
                select team_club_players.id into found_team_club_player_id from team_club_players
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join persons on persons.id = club_persons.person_id
                        join families_persons on families_persons.person_id = persons.id

                where families_persons.family_id = p_family_id AND team_club_players.id = idsA[i + 3] 
                ;
		IF idsA[i] = 1 THEN  
			--game manager check
                	select team_club_managers.id into found_team_club_manager_id
                	from team_club_managers

                        	join teams on teams.id = team_club_managers.team_id
                        	join teams_games on teams_games.team_id = teams.id
                        	join games on teams_games.team_id = teams.id
                        	join club_managers on club_managers.id = team_club_managers.club_manager_id
                        	join club_persons on club_persons.id = club_managers.club_person_id
                        	where games.id = idsA[i + 2] AND club_persons.person_id = p_person_id 
			;
			
			--check if your a manager if not check if you are email related
                	IF found_team_club_manager_id > 0 THEN
                	ELSE
				IF found_team_club_player_id > 0 THEN
				ELSE
                        		b := 0;
				END IF;
                	END IF;
		END IF;

		IF idsA[i] = 2 THEN  
			--practice manager check
                	select team_club_managers.id into found_team_club_manager_id
                	from team_club_managers

                        	join teams on teams.id = team_club_managers.team_id
                        	join teams_practices on teams_practices.team_id = teams.id
                        	join practices on teams_practices.team_id = teams.id
                       		join club_managers on club_managers.id = team_club_managers.club_manager_id
                        	join club_persons on club_persons.id = club_managers.club_person_id
                        	where practices.id = idsA[i + 2] AND club_persons.person_id = p_person_id
                	;
			
			--check if your a manager if not check if you are email related
                	IF found_team_club_manager_id > 0 THEN
                	ELSE
				IF found_team_club_player_id > 0 THEN
				ELSE
                        		b := 0;
				END IF;
                	END IF;
		END IF;



        END LOOP;

	IF b > 0 THEN

		CALL p_update_availability($3,x);

		idsA = string_to_array($3,',');

		FOR i IN 1..array_upper(idsA, 1) BY 4
		
		LOOP

			IF idsA[i] = 1 THEN
				SELECT array_append(game_id_array, idsA[i + 2]) INTO game_id_array;
			END IF;
			
			IF idsA[i] = 2 THEN
				SELECT array_append(practice_id_array, idsA[i + 2]) INTO practice_id_array;
			END IF;
		END LOOP;

        	IF x > 0 THEN
			result_set = CONCAT
                	(
                      		j_select_persons(p_family_id),
                        	',',
                        	j_select_messages(null),
                        	',',
                       		j_select_codes(-100),
                        	',',
				j_select_games_availability(game_id_array),
                        	',',
				j_select_practices_availability(practice_id_array)
                	);
        	ELSE
              		result_set = CONCAT
                	(
                		j_select_persons(p_family_id),
                        	',',
                        	j_select_messages('Something went wrong with setting availability. Please try again.'),
                        	',',
                        	j_select_codes(-101)
               		);
        	END IF;
	ELSE
		result_set = CONCAT
               	(
               		j_select_persons(p_family_id),
                        ',',
                        j_select_messages('You do not have permission to set availability for some or all of players. So we are not changing anything.'),
                        ',',
                        j_select_codes(-101)
               	);

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
