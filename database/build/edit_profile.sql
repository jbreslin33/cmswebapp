
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

CREATE OR REPLACE FUNCTION f_insert_parent_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN
        CALL p_insert_parent_profile($1,x);

        result_set = CONCAT
        (
                j_select_messages('You are now a Parent.'),
                ',',
                j_select_codes(-101),
                ',',
                j_select_profiles($1)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_coach_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN
        CALL p_insert_coach_profile($1,x);

        result_set = CONCAT
        (
                j_select_messages('You are now a Coach.'),
                ',',
                j_select_codes(-101),
                ',',
                j_select_profiles($1)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_manager_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN
        CALL p_insert_manager_profile($1,x);

        result_set = CONCAT
        (
                j_select_messages('You are now a Manager.'),
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
                	j_select_messages('You are no longer a player.'),
                        ',',
                        j_select_codes(-101),
                       	',',
                        j_select_profiles($1)
               	);

	ELSE
               	result_set = CONCAT
               	(
                	j_select_messages('You are a player on a team(s) so you must be removed from team(s) as a player in order to not be listed as a player.'),
                       	',',
                        j_select_codes(-101),
                        ',',
                        j_select_profiles($1)
                );

        END IF;


RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_parent_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;

BEGIN

        CALL p_delete_parent_profile($1,x);

        IF x > 0 THEN
                result_set = CONCAT
                (
                        j_select_messages('You are now a parent.'),
                        ',',
                        j_select_codes(-101),
                        ',',
                        j_select_profiles($1)
                );

	ELSE
        
		result_set = CONCAT
                (
                	j_select_messages('You are a parent on a team(s) so you must be removed from team(s) as a parent in order to not be listed as a parent.'),
                        ',',
                        j_select_codes(-101),
                        ',',
                        j_select_profiles($1)
                );

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_coach_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;

BEGIN

        CALL p_delete_coach_profile($1,x);

        IF x > 0 THEN
                result_set = CONCAT
                (
                        j_select_messages('You have been removed as a Coach.'),
                        ',',
                        j_select_codes(-101),
                        ',',
                        j_select_profiles($1)
                );

	ELSE
                result_set = CONCAT
                (
                      	j_select_messages('You are a coach on a team(s) so you must be removed from team(s) as a coach in order to not be listed as a coach.'),
                        ',',
                        j_select_codes(-101),
                        ',',
                        j_select_profiles($1)
                );

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_manager_profile(int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;

BEGIN

        CALL p_delete_manager_profile($1,x);

        IF x > 0 THEN
                result_set = CONCAT
                (
                        j_select_messages('You are now a manager.'),
                        ',',
                        j_select_codes(-101),
                        ',',
                        j_select_profiles($1)
                );

	ELSE
                        result_set = CONCAT
                        (
                                j_select_messages('You are a manager on a team(s) so you must be removed from team(s) as a manager in order to not be listed as a manager.'),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_profiles($1)
                        );

        END IF;

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

CREATE OR REPLACE PROCEDURE p_insert_parent_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

        insert into parents (person_id) values ($1) returning id into x;

END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_coach_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

        insert into coaches (person_id) values ($1) returning id into x;

END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_manager_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

        insert into managers (person_id) values ($1) returning id into x;

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

CREATE OR REPLACE PROCEDURE p_delete_parent_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

        delete from parents where person_id = $1 returning id into x;

END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_coach_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

        delete from coaches where person_id = $1 returning id into x;

END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_manager_profile(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_person_id persons.id%TYPE;
BEGIN

        delete from managers where person_id = $1 returning id into x;

END;
$$;


