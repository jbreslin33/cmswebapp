
--BEGIN UPDATE CLUB PROFILE
CREATE OR REPLACE FUNCTION f_update_club_profile(int,int,int,int,int)
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

                IF x = -100 THEN
			RAISE LOG '1st:%', x;
                       	result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101)
                        );
                END IF;
                
		IF x = -101 THEN
			RAISE LOG '2nd:%', x;
			
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is associated with teams you must remove them from team first.'),
                                ',',
                                j_select_codes(-101)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_club_player(int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                --lets check if you are club_admin

                CALL p_insert_club_player($3,x);

                IF x = -100 THEN
                        RAISE LOG '1st:%', x;
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101)
                        );
                END IF;

                IF x = -101 THEN
                        RAISE LOG '2nd:%', x;

                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is player asscociated with a team or teams at the club. You must remove them from team or teams before removing them as a club wide player.'),
                                ',',
                                j_select_codes(-101)
                        );
                END IF;

        END IF;

RETURN result_set;
END;

$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION f_delete_club_player(int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                --lets check if you are club_admin

                CALL p_delete_club_player($3,x);

                IF x = -100 THEN
                        RAISE LOG '1st:%', x;
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101)
                        );
                END IF;

                IF x = -101 THEN
                        RAISE LOG '2nd:%', x;

                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is player asscociated with a team or teams at the club. You must remove them from team or teams before removing them as a club wide player.'),
                                ',',
                                j_select_codes(-101)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE PROCEDURE p_insert_club_player(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	found_player_id players.id%TYPE;
	found_club_player_id club_players.id%TYPE;
	found_club_person_id club_persons.id%TYPE;
BEGIN
	x := -100;

       	--do we need to add to players????
        select id into found_player_id from players where person_id = $1;

        IF found_player_id IS NULL THEN
              	insert into players (person_id) values ($1) returning id into found_player_id;
        END IF;

        --do we need to add to club_players
        select id into found_club_person_id from club_persons where person_id = $1;

        IF found_club_person_id > 0 THEN

          	--insert into club_players if it does not already exist...
               	select id into found_club_player_id from club_players where club_person_id = found_club_person_id;

      		IF found_club_player_id IS NULL THEN
      			insert into club_players(club_person_id,player_id) values (found_club_person_id, found_player_id);
              	END IF;

       	END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_club_player(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        --found_player_id players.id%TYPE;
        found_club_player_id club_players.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
	found_team_club_persons_club_players_id team_club_persons_club_players.id%TYPE;

BEGIN
        x := -100;

        select id into found_club_person_id from club_persons where person_id = $1;

        --team_club_persons_club_players
        IF found_club_person_id > 0  THEN

        	select id into found_club_player_id from club_players where club_person_id = found_club_person_id;

                IF found_club_player_id > 0 THEN

                	select id into found_team_club_persons_club_players_id from team_club_persons_club_players where club_player_id = found_club_player_id;

                        IF found_team_club_persons_club_players_id IS NULL THEN
                        	delete from club_players where club_person_id = found_club_person_id;

                       	ELSE
				x := -101;
                        END IF;
            	END IF;
	END IF;

END;
$$;



--role,active?,persontochange
CREATE OR REPLACE PROCEDURE p_update_club_profile(int,int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	found_person_id persons.id%TYPE;

	found_club_person_id club_persons.id%TYPE;

	found_player_id players.id%TYPE;
	found_parent_id parents.id%TYPE;
	found_coach_id coaches.id%TYPE;
	found_manager_id managers.id%TYPE;
	found_administrator_id administrators.id%TYPE;

	found_club_player_id club_players.id%TYPE;
	found_club_parent_id club_parents.id%TYPE;
	found_club_coach_id club_coaches.id%TYPE;
	found_club_manager_id club_managers.id%TYPE;
	found_club_administrator_id club_administrators.id%TYPE;

	found_team_club_persons_club_players_id team_club_persons_club_players.id%TYPE;
BEGIN
	x := -100;
	IF $2 = 2 THEN

		--keep in mind anyone on this screen is a club_person

--when you goto add add colleen to player again is when error occurs....

		IF $1 = 1 THEN
			--do we need to add to players????
			select id into found_player_id from players where person_id = $3; 

			IF found_player_id IS NULL THEN
				insert into players (person_id) values ($3) returning id into found_player_id;
			END IF;
			
			--do we need to add to club_players
			select id into found_club_person_id from club_persons where person_id = $3; 

			IF found_club_person_id > 0 THEN
				
				--insert into club_players if it does not already exist...
				select id into found_club_player_id from club_players where club_person_id = found_club_person_id; 

				IF found_club_player_id IS NULL THEN
					insert into club_players(club_person_id,player_id) values (found_club_person_id, found_player_id);
				END IF;
				
			END IF;
		END IF;


		IF $1 = 2 THEN
			--do we need to add to parents????
			select id into found_parent_id from parents where person_id = $3; 
			IF found_parent_id > 0  THEN
				-- DO NOTHING
			ELSE
				RAISE LOG 'person_id:%', $3;
				insert into parents (person_id) values ($3) returning id into found_parent_id;
			END IF;
			
			--do we need to add to club_parents
			select id into found_club_person_id from club_persons where person_id = $3; 
			IF found_club_person_id > 0  THEN
				--insert into club_parents if it does not already exist...
				select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id; 
				IF found_club_parent_id > 0  THEN
					--do nothing as club_parent already exists
				ELSE
					insert into club_parents(club_person_id,parent_id) values (found_club_person_id, found_parent_id);
				END IF;
				
			ELSE
				--did not find club_person error...
			END IF;
		ELSE
			--DO NOTHING
		END IF;
		
		IF $1 = 3 THEN
			--do we need to add to coaches????
			select id into found_coach_id from coaches where person_id = $3; 
			IF found_coach_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into coaches (person_id) values ($3) returning id into found_coach_id;
			END IF;
			
			--do we need to add to club_coaches
			select id into found_club_person_id from club_persons where person_id = $3; 
			IF found_club_person_id > 0  THEN
				--insert into club_coaches if it does not already exist...
				select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id; 
				IF found_club_coach_id > 0  THEN
					--do nothing as club_coach already exists
				ELSE
					insert into club_coaches(club_person_id,coach_id) values (found_club_person_id, found_coach_id);
				END IF;
				
			ELSE
				--did not find club_person error...
			END IF;
		ELSE
			--DO NOTHING
		END IF;
		
		IF $1 = 4 THEN
			--do we need to add to managers????
			select id into found_manager_id from managers where person_id = $3; 
			IF found_manager_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into managers (person_id) values ($3) returning id into found_manager_id;
			END IF;
			
			--do we need to add to club_managers
			select id into found_club_person_id from club_persons where person_id = $3; 
			IF found_club_person_id > 0  THEN
				--insert into club_managers if it does not already exist...
				select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id; 
				IF found_club_manager_id > 0  THEN
					--do nothing as club_manager already exists
				ELSE
					insert into club_managers(club_person_id,manager_id) values (found_club_person_id, found_manager_id);
				END IF;
				
			ELSE
				--did not find club_person error...
			END IF;
		ELSE
			--DO NOTHING
		END IF;
		
				--RAISE LOG 'person_id:%', $3;
				--RAISE LOG 'club_person_id:%', found_club_person_id;

	ELSE
		IF $1 = 1 THEN

			select id into found_club_person_id from club_persons where person_id = $3;

			--team_club_persons_club_players	
			IF found_club_person_id > 0  THEN
			
				select id into found_club_player_id from club_players where club_person_id = found_club_person_id;

				IF found_club_player_id > 0 THEN

				       	select id into found_team_club_persons_club_players_id from team_club_persons_club_players where club_player_id = found_club_player_id;
					
					IF found_team_club_persons_club_players_id IS NULL THEN
						delete from club_players where club_person_id = found_club_person_id;	

					ELSE 
						x := -101; 
					END IF;
				END IF;
			END IF;

		ELSE
			--DO NOTHING 
		END IF;

                
		IF $1 = 2 THEN
                        select id into found_club_person_id from club_persons where person_id = $3;

                        IF found_club_person_id > 0  THEN
                                delete from club_parents where club_person_id = found_club_person_id;
                        ELSE
                                --did not find club_person_id so we have an error...
                        END IF;

                ELSE
                        --DO NOTHING
                END IF;
		
		IF $1 = 3 THEN
                        select id into found_club_person_id from club_persons where person_id = $3;

                        IF found_club_person_id > 0  THEN
                                delete from club_coaches where club_person_id = found_club_person_id;
                        ELSE
                                --did not find club_person_id so we have an error...
                        END IF;

                ELSE
                        --DO NOTHING
                END IF;
		
		IF $1 = 4 THEN
                        select id into found_club_person_id from club_persons where person_id = $3;

                        IF found_club_person_id > 0  THEN
                                delete from club_managers where club_person_id = found_club_person_id;
                        ELSE
                                --did not find club_person_id so we have an error...
                        END IF;

                ELSE
                        --DO NOTHING
                END IF;

		IF $1 = 5 THEN
                        select id into found_club_person_id from club_persons where person_id = $3;

                        IF found_club_person_id > 0  THEN
                                delete from club_administrators where club_person_id = found_club_person_id;
                        ELSE
                                --did not find club_person_id so we have an error...
                        END IF;

                ELSE
                        --DO NOTHING
                END IF;


	END IF;
END;
$$;

CREATE OR REPLACE FUNCTION f_club_persons(email_id_p int, person_id_p int, club_id_p int)
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
                	j_select_club_persons(person_id_p, club_id_p)
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
--END F CLUB PERSON

CREATE OR REPLACE FUNCTION f_club_person_profile(email_id_p int, person_id_p int, club_id_p int, person_to_show_id int)
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
                        j_select_club_teams($3),
                        ',',
                        j_select_club_players_id($3,$4),
                        ',',
                        j_select_club_parents_id($3,$4),
                        ',',
                        j_select_club_coaches_id($3,$4),
                        ',',
                        j_select_club_managers_id($3,$4),
                        ',',
                        j_select_team_players_id($3,$4),
                        ',',
                        j_select_team_parents_id($3,$4),
                        ',',
                        j_select_team_coaches_id($3,$4),
                        ',',
                        j_select_team_managers_id($3,$4)
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



