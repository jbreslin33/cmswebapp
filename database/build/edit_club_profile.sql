

CREATE OR REPLACE FUNCTION f_insert_club_player(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_player(p_screen_person_id, x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide player.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION f_insert_club_parent(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_parent(p_screen_person_id, x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_club_coach(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_coach(p_screen_person_id, x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_club_manager(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_manager(p_screen_person_id, x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a manager asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide manager.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_club_player(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_player(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide player.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_club_parent(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_parent(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_club_coach(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_coach(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_club_manager(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_manager(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_teams(p_club_id),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_managers_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_parents(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_managers(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a manager asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide manager.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE p_insert_club_player(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	found_player_id players.id%TYPE;
	found_club_player_id club_players.id%TYPE;
	found_club_person_id club_persons.id%TYPE;
BEGIN
	x := -101;

       	--do we need to add to players????
        select id into found_player_id from players where person_id = p_person_id;

        IF found_player_id IS NULL THEN
              	insert into players (person_id) values (p_person_id) returning id into found_player_id;
        END IF;

        --do we need to add to club_players
        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

          	--insert into club_players if it does not already exist...
               	select id into found_club_player_id from club_players where club_person_id = found_club_person_id;

      		IF found_club_player_id IS NULL THEN
      			insert into club_players(club_person_id,player_id) values (found_club_person_id, found_player_id);
              	END IF;

       	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_parent(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_parent_id parents.id%TYPE;
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        select id into found_parent_id from parents where person_id = p_person_id;

        IF found_parent_id IS NULL THEN
                insert into parents (person_id) values (p_person_id) returning id into found_parent_id;
        END IF;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;

                IF found_club_parent_id IS NULL THEN
                        insert into club_parents(club_person_id,parent_id) values (found_club_person_id, found_parent_id);
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_coach(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_coach_id coaches.id%TYPE;
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        select id into found_coach_id from coaches where person_id = p_person_id;

        IF found_coach_id IS NULL THEN
                insert into coaches (person_id) values (p_person_id) returning id into found_coach_id;
        END IF;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;

                IF found_club_coach_id IS NULL THEN
                        insert into club_coaches(club_person_id,coach_id) values (found_club_person_id, found_coach_id);
                END IF;

        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_manager(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_manager_id managers.id%TYPE;
        found_club_manager_id club_managers.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        select id into found_manager_id from managers where person_id = p_person_id;

        IF found_manager_id IS NULL THEN
                insert into managers (person_id) values (p_person_id) returning id into found_manager_id;
        END IF;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;

                IF found_club_manager_id IS NULL THEN
                        insert into club_managers(club_person_id,manager_id) values (found_club_person_id, found_manager_id);
                END IF;
        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_club_player(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_player_id club_players.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
	found_team_club_player_id team_club_players.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

        	select id into found_club_player_id from club_players where club_person_id = found_club_person_id;

                IF found_club_player_id > 0 THEN

                	select id into found_team_club_player_id from team_club_players where club_player_id = found_club_player_id;

                        IF found_team_club_player_id IS NULL THEN
                        	delete from club_players where club_person_id = found_club_person_id;
				x := -101;

                       	ELSE
				x := -102;
                        END IF;
            	END IF;
	END IF;
END;
$$;



CREATE OR REPLACE PROCEDURE p_delete_club_parent(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_parents_id team_club_parents.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;

                IF found_club_parent_id > 0 THEN

                        select id into found_team_club_parents_id from team_club_parents where club_parent_id = found_club_parent_id;

                        IF found_team_club_parents_id IS NULL THEN
                                delete from club_parents where club_person_id = found_club_person_id;
                                x := -101;

                        ELSE
                                x := -102;
                        END IF;
                END IF;
        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_club_coach(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_coaches_id team_club_coaches.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;

                IF found_club_coach_id > 0 THEN

                        select id into found_team_club_coaches_id from team_club_coaches where club_coach_id = found_club_coach_id;

                        IF found_team_club_coaches_id IS NULL THEN
                                delete from club_coaches where club_person_id = found_club_person_id;
                                x := -101;

                        ELSE
                                x := -102;
                        END IF;
                END IF;
        END IF;
END;
$$;



CREATE OR REPLACE PROCEDURE p_delete_club_manager(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_manager_id club_managers.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_manager_id team_club_managers.id%TYPE;


BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;

                IF found_club_manager_id > 0 THEN

                        select id into found_team_club_manager_id from team_club_managers where club_manager_id = found_club_manager_id;

                        IF found_team_club_manager_id IS NULL THEN
                                delete from club_managers where club_person_id = found_club_person_id;
                                x := -101;

                        ELSE
                                x := -102;
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE FUNCTION f_club_persons(p_family_id int, p_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
	found_club_administrator_id club_administrators.id%TYPE;

BEGIN
	select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.person_id = $2;
	IF found_club_administrator_id > 0 THEN
	        result_set = CONCAT
        	(
                	j_select_persons(p_family_id),
                	',',
                	j_select_messages(null),
                	',',
                	j_select_codes(-102),
                	',',
                	j_select_club_persons(p_person_id, p_club_id)
        	);
	ELSE
	        result_set = CONCAT
        	(
                	j_select_persons(p_family_id),
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

CREATE OR REPLACE FUNCTION f_club_person_profile(p_family_id int, p_person_id int, p_club_id int, p_screen_person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        found_club_administrator_id club_administrators.id%TYPE;

BEGIN
	--RAISE LOG 'f_club_person_profile p_screen_person_id: %', p_screen_person_id;
        select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.person_id = p_person_id;
        IF found_club_administrator_id > 0 THEN
                result_set = CONCAT
                (
                        j_select_persons(p_family_id),
                        ',',
                        j_select_messages(null),
                        ',',
                        j_select_codes(-102),
                        ',',
                        j_select_club_teams(p_club_id),
                        ',',
                        j_select_club_players_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_parents_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_coaches_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_managers_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_team_club_players(p_screen_person_id, p_club_id),
                        ',',
                        j_select_team_club_parents(p_screen_person_id, p_club_id),
                        ',',
                        j_select_team_club_coaches(p_screen_person_id, p_club_id),
                        ',',
                        j_select_team_club_managers(p_screen_person_id, p_club_id)
                );
        ELSE
                result_set = CONCAT
                (
                        j_select_persons(p_family_id),
                        ',',
                        j_select_messages('You are not a club administrator.'),
                        ',',
                        j_select_codes(-101)
                );
        END IF;
	
	--RAISE LOG 'f_club_person_profile result: %', result_set;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_insert_team_player(int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_insert_team_player($3,$4,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide player.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_insert_team_parent(int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_insert_team_parent($3,$4,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_insert_team_coach(int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_insert_team_coach($3,$4,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_insert_team_manager(int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_insert_team_manager($3,$4,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is manager asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide manager.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_delete_team_player(int,int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_team_player($6,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide player.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_delete_team_parent(int,int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_team_parent($6,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_delete_team_coach(int,int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_team_coach($6,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id, person_id, screen_person_id, team_id, club_id
CREATE OR REPLACE FUNCTION f_delete_team_manager(int,int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_team_manager($6,x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_teams($5),
                        	',',
                        	j_select_club_players_id($5,$3),
                        	',',
                        	j_select_club_parents_id($5,$3),
                        	',',
                        	j_select_club_coaches_id($5,$3),
                        	',',
                        	j_select_club_managers_id($5,$3),
                        	',',
                        	j_select_team_club_players($5,$3),
                        	',',
                        	j_select_team_club_parents($5,$3),
                        	',',
                        	j_select_team_club_coaches($5,$3),
                        	',',
                        	j_select_team_club_managers($5,$3)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('This person is manager asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide manager.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_team_player(int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_person_id                   club_persons.id%TYPE;
        found_club_player_id                   club_players.id%TYPE;
        found_team_club_person_id              team_club_persons.id%TYPE;
	found_team_club_player_id              team_club_players.id%TYPE;
        found_player_id                        players.id%TYPE;


BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = $1;

	IF found_club_person_id > 0 THEN

		select id into found_player_id from players where person_id = $1;
		IF found_player_id IS NULL THEN
			insert into players (person_id) values ($1) returning id into found_player_id;
		END IF;

		select id into found_club_player_id from club_players where club_person_id = found_club_person_id;
		IF found_club_player_id IS NULL THEN
			insert into club_players (club_person_id, player_id) values (found_club_person_id, found_player_id) returning id into found_club_player_id; 
		END IF;

		select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = $2;
		IF found_team_club_person_id IS NULL THEN
			insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, $2) returning id into found_team_club_person_id;
		END IF;

		select id into found_team_club_player_id from team_club_players where club_player_id = found_club_player_id AND team_id = $2;
		IF found_team_club_player_id IS NULL THEN
			insert into team_club_players (club_player_id, team_id) values (found_club_player_id, $2);
		END IF;

	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_team_parent(int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_person_id                   club_persons.id%TYPE;
        found_club_parent_id                   club_players.id%TYPE;
        found_team_club_person_id              team_club_persons.id%TYPE;
        found_team_club_parent_id              team_club_parents.id%TYPE;
        found_parent_id                        parents.id%TYPE;


BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = $1;

        IF found_club_person_id > 0 THEN

                select id into found_parent_id from parents where person_id = $1;
                IF found_parent_id IS NULL THEN
                        insert into parents (person_id) values ($1) returning id into found_parent_id;
                END IF;

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;
                IF found_club_parent_id IS NULL THEN
                        insert into club_parents (club_person_id, parent_id) values (found_club_person_id, found_parent_id) returning id into found_club_parent_id;
                END IF;

                select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = $2;
                IF found_team_club_person_id IS NULL THEN
                        insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, $2) returning id into found_team_club_person_id;
                END IF;

                select id into found_team_club_parent_id from team_club_parents where club_parent_id = found_club_parent_id AND team_id = $2;
                IF found_team_club_parent_id IS NULL THEN
                        insert into team_club_parents (club_parent_id, team_id) values (found_club_parent_id, $2);
                END IF;

        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_team_coach(int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_person_id                   club_persons.id%TYPE;
        found_club_coach_id                    club_coaches.id%TYPE;
        found_team_club_person_id              team_club_persons.id%TYPE;
        found_team_club_coach_id               team_club_coaches.id%TYPE;
        found_coach_id                         coaches.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = $1;

        IF found_club_person_id > 0 THEN

                select id into found_coach_id from coaches where person_id = $1;
                IF found_coach_id IS NULL THEN
                        insert into coaches (person_id) values ($1) returning id into found_coach_id;
                END IF;

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;
                IF found_club_coach_id IS NULL THEN
                        insert into club_coaches (club_person_id, coach_id) values (found_club_person_id, found_coach_id) returning id into found_club_coach_id;
                END IF;

                select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = $2;
                IF found_team_club_person_id IS NULL THEN
                        insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, $2) returning id into found_team_club_person_id;
                END IF;

                select id into found_team_club_coach_id from team_club_coaches where club_coach_id = found_club_coach_id AND team_id = $2;
                IF found_team_club_coach_id IS NULL THEN
                        insert into team_club_coaches (club_coach_id, team_id) values (found_club_coach_id, $2);
                END IF;

        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_insert_team_manager(int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_person_id                   club_persons.id%TYPE;
        found_club_manager_id                  club_managers.id%TYPE;
        found_team_club_person_id              team_club_persons.id%TYPE;
        found_team_club_manager_id             team_club_managers.id%TYPE;
        found_manager_id                       managers.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = $1;

        IF found_club_person_id > 0 THEN

                select id into found_manager_id from managers where person_id = $1;
                IF found_manager_id IS NULL THEN
                        insert into managers (person_id) values ($1) returning id into found_manager_id;
                END IF;

                select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;
                IF found_club_manager_id IS NULL THEN
                        insert into club_managers (club_person_id, manager_id) values (found_club_person_id, found_manager_id) returning id into found_club_manager_id;
                END IF;

                select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = $2;
                IF found_team_club_person_id IS NULL THEN
                        insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, $2) returning id into found_team_club_person_id;
                END IF;

                select id into found_team_club_manager_id from team_club_managers where club_manager_id = found_club_manager_id AND team_id = $2;
                IF found_team_club_manager_id IS NULL THEN
                        insert into team_club_managers (club_manager_id, team_id) values (found_club_manager_id, $2);
                END IF;

        END IF;
END;
$$;



CREATE OR REPLACE PROCEDURE p_delete_team_player(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;
	delete from practices_players_availability where practices_players_availability.team_club_player_id = $1;
	delete from team_club_players where team_club_players.id = $1;
END;
$$;



CREATE OR REPLACE PROCEDURE p_delete_team_parent(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;

	delete from team_club_parents where team_club_parents.id = $1;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_team_coach(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;

	delete from team_club_coaches where team_club_coaches.id = $1;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_team_manager(int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;

	delete from team_club_managers where team_club_managers.id = $1;
END;
$$;




