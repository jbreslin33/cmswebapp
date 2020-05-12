
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

                IF x > 0 THEN
                       	result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101)
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
--role,active?,persontochange
CREATE OR REPLACE PROCEDURE p_update_club_profile(int,int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        ids INT[];
	found_person_id persons.id%TYPE;

	found_club_person_id club_persons.id%TYPE;

	found_player_id players.id%TYPE;
	found_parent_id parents.id%TYPE;
	found_coache_id coaches.id%TYPE;
	found_manager_id managers.id%TYPE;
	found_administrator_id administrators.id%TYPE;

	found_club_player_id club_players.id%TYPE;
	found_club_parent_id club_parents.id%TYPE;
	found_club_coach_id club_coaches.id%TYPE;
	found_club_manager_id club_managers.id%TYPE;
	found_club_administrator_id club_administrators.id%TYPE;
BEGIN
	IF $2 = 2 THEN

		--keep in mind anyone on this screen is a club_person

		IF $1 = 1 THEN
			--do we need to add to players????
			select person_id into found_player_id from players where person_id = $3; 
			IF found_player_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into players (person_id) values ($3) returning id into found_player_id;
			END IF;
			
			--do we need to add to club_players
			select id into found_club_person_id from club_persons where person_id = $3; 
			IF found_club_person_id > 0  THEN
				--insert into club_players if it does not already exist...
				select id into found_club_player_id from club_players where club_person_id = found_club_person_id; 
				IF found_club_player_id > 0  THEN
					--do nothing as club_player already exists
				ELSE
					insert into club_players(club_person_id,player_id) values (found_club_person_id, found_player_id);
				END IF;
				
			ELSE
				--did not find club_person error...
			END IF;
		ELSE
			--DO NOTHING
		END IF;

		IF $1 = 2 THEN
			--do we need to add to players????
			select person_id into found_parent_id from players where person_id = $3; 
			IF found_parent_id > 0  THEN
				-- DO NOTHING
			ELSE
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


	ELSE
		IF $1 = 1 THEN
			select id into found_club_person_id from club_persons where person_id = $3;
			
			IF found_club_person_id > 0  THEN
				RAISE LOG 'person_id:%', $3;
				RAISE LOG 'club_person_id:%', found_club_person_id;
				delete from club_players where club_person_id = found_club_person_id;	
			ELSE
				--did not find club_person_id so we have an error...
			END IF;

		ELSE
			--DO NOTHING 
		END IF;

	END IF;
	x := 1;
END;
$$;

CREATE OR REPLACE FUNCTION f_club_profile(email_id_p int, person_id_p int, club_id_p int)
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
                	j_select_club_profiles(person_id_p, club_id_p)
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
--END UPDATE CLUB PROFILE
