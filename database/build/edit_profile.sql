
CREATE OR REPLACE FUNCTION f_profile(person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
	(
		j_select_messages(null),
		',',
		j_select_codes(-102),
		',',
		j_select_profiles(person_id)
	);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_player_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN
	CALL p_insert_player_profile($1,x);

        result_set = CONCAT
        (
              	j_select_messages('You are now a Player.'),
               	',',
                j_select_codes(-101),
               	',',
		j_select_profiles($1)
	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_player_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;

BEGIN

	CALL p_delete_player_profile($1,x);

        IF x > 0 THEN
        	result_set = CONCAT
                (
                	j_select_messages('You are now a Player.'),
                        ',',
                        j_select_codes(-101),
                       	',',
                        j_select_profiles($1)
               	);

        END IF;

	EXCEPTION
		WHEN others THEN
               		result_set = CONCAT
                	(
                        	j_select_messages('You are a Player on a team(s) so you must be removed from teams in order to not be listed as a Player.'),
                        	',',
                        	j_select_codes(-101),
                        	',',
                        	j_select_profiles($1)
                	);

        		x := -100;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE p_insert_player_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

        insert into players (person_id) values ($1) returning id into x;

END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_player_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

	delete from players where person_id = $1 returning id into x;  

END;
$$;


