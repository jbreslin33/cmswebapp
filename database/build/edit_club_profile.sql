
CREATE OR REPLACE PROCEDURE p_check_for_member_status(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

found_club_person_id club_persons.id%TYPE;

found_club_player_id club_players.id%TYPE;
found_club_parent_id club_parents.id%TYPE;
found_club_coach_id club_coaches.id%TYPE;
found_club_manager_id club_managers.id%TYPE;

BEGIN

        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                --player
                select id into found_club_player_id from club_players where club_person_id = found_club_person_id;
                IF found_club_player_id > 0 THEN
                        x := -102;
                END IF;
                
		--parent
                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;
                IF found_club_parent_id > 0 THEN
                        x := -102;
                END IF;
		
		--coach
                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;
                IF found_club_coach_id > 0 THEN
                        x := -102;
                END IF;
		
		--manager
                select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;
                IF found_club_manager_id > 0 THEN
                        x := -102;
                END IF;

	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_check_for_non_member_status(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

found_club_person_id club_persons.id%TYPE;

found_club_player_interest_id club_players_interest.id%TYPE;
found_club_player_lead_id club_players_lead.id%TYPE;
found_club_player_prospect_id club_players_prospect.id%TYPE;
found_club_player_potential_id club_players_potential.id%TYPE;

found_club_parent_interest_id club_parents_interest.id%TYPE;
found_club_parent_lead_id club_parents_lead.id%TYPE;
found_club_parent_prospect_id club_parents_prospect.id%TYPE;
found_club_parent_potential_id club_parents_potential.id%TYPE;

found_club_coach_interest_id club_coaches_interest.id%TYPE;
found_club_coach_lead_id club_coaches_lead.id%TYPE;
found_club_coach_prospect_id club_coaches_prospect.id%TYPE;
found_club_coach_potential_id club_coaches_potential.id%TYPE;

BEGIN
        x := -101;
        
	select id into found_club_person_id from club_persons where person_id = p_person_id;

	IF found_club_person_id > 0 THEN

		--player
       		select id into found_club_player_interest_id from club_players_interest where club_person_id = found_club_person_id;
		IF found_club_player_interest_id > 0 THEN
			x := -102;
		END IF;
       		
		select id into found_club_player_lead_id from club_players_lead where club_person_id = found_club_person_id;
		IF found_club_player_lead_id > 0 THEN
			x := -102;
		END IF;
		
		select id into found_club_player_prospect_id from club_players_prospect where club_person_id = found_club_person_id;
		IF found_club_player_prospect_id > 0 THEN
			x := -102;
		END IF;
		
		select id into found_club_player_potential_id from club_players_potential where club_person_id = found_club_person_id;
		IF found_club_player_potential_id > 0 THEN
			x := -102;
		END IF;

		--parent
                select id into found_club_parent_interest_id from club_parents_interest where club_person_id = found_club_person_id;
                IF found_club_parent_interest_id > 0 THEN
                        x := -102;
                END IF;

                select id into found_club_parent_lead_id from club_parents_lead where club_person_id = found_club_person_id;
                IF found_club_parent_lead_id > 0 THEN
                        x := -102;
                END IF;

                select id into found_club_parent_prospect_id from club_parents_prospect where club_person_id = found_club_person_id;
                IF found_club_parent_prospect_id > 0 THEN
                        x := -102;
                END IF;

                select id into found_club_parent_potential_id from club_parents_potential where club_person_id = found_club_person_id;
                IF found_club_parent_potential_id > 0 THEN
                        x := -102;
                END IF;

                --coach
                select id into found_club_coach_interest_id from club_coaches_interest where club_person_id = found_club_person_id;
                IF found_club_coach_interest_id > 0 THEN
                        x := -102;
                END IF;

                select id into found_club_coach_lead_id from club_coaches_lead where club_person_id = found_club_person_id;
                IF found_club_coach_lead_id > 0 THEN
                        x := -102;
                END IF;

                select id into found_club_coach_prospect_id from club_coaches_prospect where club_person_id = found_club_person_id;
                IF found_club_coach_prospect_id > 0 THEN
                        x := -102;
                END IF;

                select id into found_club_coach_potential_id from club_coaches_potential where club_person_id = found_club_person_id;
                IF found_club_coach_potential_id > 0 THEN
                        x := -102;
                END IF;

	ELSE
		--this guy aint even a club person....

	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_check_for_player_non_member_status(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

found_club_person_id club_persons.id%TYPE;

found_club_player_interest_id  club_players_interest.id%TYPE;
found_club_player_lead_id      club_players_lead.id%TYPE;
found_club_player_prospect_id  club_players_prospect.id%TYPE;
found_club_player_potential_id club_players_potential.id%TYPE;

BEGIN
        x := -101;
        
	select id into found_club_person_id from club_persons where person_id = p_person_id;

	IF found_club_person_id > 0 THEN

		--player
       		select id into found_club_player_interest_id from club_players_interest where club_person_id = found_club_person_id;
		IF found_club_player_interest_id > 0 THEN
			x := -102;
		END IF;
       		
		select id into found_club_player_lead_id from club_players_lead where club_person_id = found_club_person_id;
		IF found_club_player_lead_id > 0 THEN
			x := -102;
		END IF;
		
		select id into found_club_player_prospect_id from club_players_prospect where club_person_id = found_club_person_id;
		IF found_club_player_prospect_id > 0 THEN
			x := -102;
		END IF;
		
		select id into found_club_player_potential_id from club_players_potential where club_person_id = found_club_person_id;
		IF found_club_player_potential_id > 0 THEN
			x := -102;
		END IF;
	END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_check_for_player_non_member_status_excluding(p_person_id int, INOUT x int, ex int)
LANGUAGE plpgsql
AS $$
DECLARE

found_club_person_id club_persons.id%TYPE;

found_club_player_interest_id club_players_interest.id%TYPE;
found_club_player_lead_id club_players_lead.id%TYPE;
found_club_player_prospect_id club_players_prospect.id%TYPE;
found_club_player_potential_id club_players_potential.id%TYPE;

BEGIN
        x := -101;
        
	select id into found_club_person_id from club_persons where person_id = p_person_id;

	IF found_club_person_id > 0 THEN

		IF ex != 1 THEN
			select id into found_club_player_interest_id from club_players_interest where club_person_id = found_club_person_id;
			IF found_club_player_interest_id > 0 THEN
				x := -102;
			END IF;
		END IF;

		IF ex != 2 THEN
			select id into found_club_player_lead_id from club_players_lead where club_person_id = found_club_person_id;
			IF found_club_player_lead_id > 0 THEN
				x := -102;
			END IF;
		END IF;
		
		IF ex != 3 THEN
			select id into found_club_player_prospect_id from club_players_prospect where club_person_id = found_club_person_id;
			IF found_club_player_prospect_id > 0 THEN
				x := -102;
			END IF;
		END IF;
		
		IF ex != 4 THEN
			select id into found_club_player_potential_id from club_players_potential where club_person_id = found_club_person_id;
			IF found_club_player_potential_id > 0 THEN
				x := -102;
			END IF;
		END IF;
	END IF;
END;
$$;



CREATE OR REPLACE FUNCTION f_insert_club_player(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
		CALL p_check_for_player_non_member_status(p_screen_person_id,x);

                IF x = -101 THEN

                	CALL p_insert_club_player(p_screen_person_id, x);

                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a player non-member. You must remove them from the player non-member list(interest, leads, prospects or potential) before adding them aa a club player.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION f_insert_club_player_interest(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id > 0 THEN

		CALL p_check_for_player_non_member_status_excluding(p_screen_person_id, x, 1);

		IF x = -102 THEN --checking for non members

                	result_set = CONCAT
                        (
                        	j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already listed as a lead, prospective or potential player. You must remove from them all those roles before adding them as an interested club player.'),
                                ',',
                                j_select_codes(x)
                        );

		ELSE --checking for members
			
			CALL p_insert_club_players_interest(p_screen_person_id, x);

                	IF x > 0 THEN
                        	result_set = CONCAT
                        	(
                                	j_select_persons(p_family_id),
                                	',',
                                	j_select_messages(null),
                                	',',
                                	j_select_codes(-101),
                                	',',
                                	j_select_club_players_interest_id(p_screen_person_id, p_club_id),
                                	',',
                                	j_select_club_players_lead_id(p_screen_person_id, p_club_id),
                                	',',
                                	j_select_club_players_prospect_id(p_screen_person_id, p_club_id),
                                	',',
                                	j_select_club_players_potential_id(p_screen_person_id, p_club_id)
                        	);
                	END IF;

                	IF x = -102 THEN
                        	result_set = CONCAT
                        	(
                                	j_select_persons(p_family_id),
                                	',',
                                	j_select_messages('This person is already a member at the club. You must remove from them all roles of the club before adding them as an interested club player.'),
                                	',',
                                	j_select_codes(x)
                        	);
                	END IF;
		END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_club_player_lead(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_players_lead(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_players_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a club player lead.'),
                                ',',
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_club_player_prospect(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_players_prospect(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_players_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a club parent prospect.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_club_player_potential(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_players_potential(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_players_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_players_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a potential club parent.'),
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
                                j_select_club_parents_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a non-member. You must remove them from the non-member list before adding them aa a club parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_club_parent_interest(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_parents_interest(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_parents_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a interested club parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_club_parent_lead(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_parents_lead(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_parents_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_potential_id(p_screen_person_id, p_club_id)

                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a club parent lead.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_club_parent_prospect(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_parents_prospect(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_parents_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a club parent prospect.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_club_parent_potential(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_parents_potential(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_parents_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_parents_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a potential club parent prospect.'),
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
                                j_select_club_coaches_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_coaches(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a non-member. You must remove them from the non-member list before adding them aa a club coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_club_coach_interest(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_coaches_interest(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_coaches_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a interested club coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_club_coach_lead(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_coaches_lead(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_coaches_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a club coach lead.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_club_coach_prospect(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_coaches_prospect(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_coaches_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a club coach prospect.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_club_coach_potential(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_club_coaches_potential(p_screen_person_id, x);

                IF x > 0 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101),
                                ',',
                                j_select_club_coaches_interest_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_lead_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_prospect_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_club_coaches_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is already a member at the club. You must remove them from all roles of the club before adding them as a potential club coach.'),
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
                                j_select_club_managers_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a non-member. You must remove them from the non-member list before adding them aa a club manager.'),
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
                                j_select_club_players_id(p_screen_person_id, p_club_id)
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

CREATE OR REPLACE FUNCTION f_delete_club_player_interest(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_player_interest(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_players_interest_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a interested club player.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_club_player_lead(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_player_lead(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_players_lead_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club player lead.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_club_player_prospect(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_player_prospect(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_players_prospect_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club player prospect.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_club_player_potential(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_player_potential(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_players_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a potential club player.'),
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
                                j_select_club_parents_id(p_screen_person_id, p_club_id)
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

CREATE OR REPLACE FUNCTION f_delete_club_parent_interest(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_parent_interest(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_parents_interest_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a interested club parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_club_parent_lead(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_parent_lead(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_parents_lead_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club parent lead.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_club_parent_prospect(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_parent_prospect(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_parents_prospect_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club parent prospect.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_club_parent_potential(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_parent_potential(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_parents_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a potential club parent.'),
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
                                j_select_club_coaches_id(p_screen_person_id, p_club_id)
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

CREATE OR REPLACE FUNCTION f_delete_club_coach_interest(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_coach_interest(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_coaches_interest_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a interested club coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_club_coach_lead(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_coach_lead(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_coaches_lead_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club coach lead.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_club_coach_prospect(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_coach_prospect(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_coaches_prospect_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club coach prospect.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_club_coach_potential(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_club_coach_potential(p_screen_person_id,x);

                IF x = -101 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_coaches_potential_id(p_screen_person_id, p_club_id)
                        );
                END IF;

                IF x = -102 THEN
                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('This person is a coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a potential club coach.'),
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
                                j_select_club_managers_id(p_screen_person_id, p_club_id)
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

        select id into found_player_id from players where person_id = p_person_id;

        IF found_player_id IS NULL THEN --if no player than insert one
        	insert into players (person_id) values (p_person_id) returning id into found_player_id;
        END IF;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

       	IF found_club_person_id > 0 THEN --if we have a club person than we can insert into club_players

      		select id into found_club_player_id from club_players where club_person_id = found_club_person_id;

		IF found_club_player_id IS NULL THEN
      			insert into club_players(club_person_id,player_id) values (found_club_person_id, found_player_id) returning id into x;
              	END IF;
       	END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_insert_club_players_interest(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_player_id players.id%TYPE;
        found_club_players_interest_id club_players_interest.id%TYPE;
        found_club_player_id club_players.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
	x := -101;

	CALL p_check_for_member_status(p_person_id, x); --check for non member status
	CALL p_check_for_player_non_member_status_excluding(p_person_id, x, 1);


	IF x = -102 THEN --we have non member so do not do insert into club_players

	ELSE --we are free to insert 

        	--do we need to add to players????
        	select id into found_player_id from players where person_id = p_person_id;

        	IF found_player_id IS NULL THEN
                	insert into players (person_id) values (p_person_id) returning id into found_player_id;
        	END IF;

        	--do we need to add to club_players
        	select id into found_club_person_id from club_persons where person_id = p_person_id;

        	IF found_club_person_id > 0 THEN

                	select id into found_club_players_interest_id from club_players_interest where club_person_id = found_club_person_id;

                	IF found_club_players_interest_id IS NULL THEN
                        	insert into club_players_interest(club_person_id, player_id) values (found_club_person_id, found_player_id) returning id into x;
				delete from club_players_lead where club_person_id = found_club_person_id;
				delete from club_players_prospect where club_person_id = found_club_person_id;
				delete from club_players_potential where club_person_id = found_club_person_id;
                	END IF;
		END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_players_lead(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_player_id players.id%TYPE;
        found_club_players_lead_id club_players_lead.id%TYPE;
        found_club_player_id club_players.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert 

                --do we need to add to players????
                select id into found_player_id from players where person_id = p_person_id;

                IF found_player_id IS NULL THEN
                        insert into players (person_id) values (p_person_id) returning id into found_player_id;
                END IF;

                --do we need to add to club_players
                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_players_lead_id from club_players_lead where club_person_id = found_club_person_id;

                        IF found_club_players_lead_id IS NULL THEN
                                delete from club_players_interest where club_person_id = found_club_person_id;
                                insert into club_players_lead(club_person_id, player_id) values (found_club_person_id, found_player_id) returning id into x;
                                delete from club_players_prospect where club_person_id = found_club_person_id;
                                delete from club_players_potential where club_person_id = found_club_person_id;

                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_players_prospect(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_player_id players.id%TYPE;
        found_club_players_prospect_id club_players_prospect.id%TYPE;
        found_club_player_id club_players.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert 

                --do we need to add to players????
                select id into found_player_id from players where person_id = p_person_id;

                IF found_player_id IS NULL THEN
                        insert into players (person_id) values (p_person_id) returning id into found_player_id;
                END IF;

                --do we need to add to club_players
                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_players_prospect_id from club_players_prospect where club_person_id = found_club_person_id;

                        IF found_club_players_prospect_id IS NULL THEN
                                delete from club_players_interest where club_person_id = found_club_person_id;
                                delete from club_players_lead where club_person_id = found_club_person_id;
                                insert into club_players_prospect(club_person_id, player_id) values (found_club_person_id, found_player_id) returning id into x;
                                delete from club_players_potential where club_person_id = found_club_person_id;
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_players_potential(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_player_id players.id%TYPE;
        found_club_players_potential_id club_players_potential.id%TYPE;
        found_club_player_id club_players.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                --do we need to add to players????
                select id into found_player_id from players where person_id = p_person_id;

                IF found_player_id IS NULL THEN
                        insert into players (person_id) values (p_person_id) returning id into found_player_id;
                END IF;

                --do we need to add to club_players
                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_players_potential_id from club_players_potential where club_person_id = found_club_person_id;

                        IF found_club_players_potential_id IS NULL THEN
                                delete from club_players_interest where club_person_id = found_club_person_id;
                                delete from club_players_lead where club_person_id = found_club_person_id;
                                delete from club_players_prospect where club_person_id = found_club_person_id;
                                insert into club_players_potential(club_person_id, player_id) values (found_club_person_id, found_player_id) returning id into x;
                        END IF;
                END IF;
        END IF;
END;
$$;




CREATE OR REPLACE PROCEDURE p_insert_club_parent(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_parent_id parents.id%TYPE;
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_non_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_parents

        ELSE --we are free to insert into club_parents
                select id into found_parent_id from parents where person_id = p_person_id;

                IF found_parent_id IS NULL THEN --if no parent than insert one
                        insert into parents (person_id) values (p_person_id) returning id into found_parent_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN --if we have a club person than we can insert into club_parents

                        select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;

                        IF found_club_parent_id IS NULL THEN
                                insert into club_parents(club_person_id, parent_id) values (found_club_person_id, found_parent_id);
                        END IF;
                END IF;
        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_insert_club_parents_interest(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_parent_id parents.id%TYPE;
        found_club_parents_interest_id club_parents_interest.id%TYPE;
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_parent_id from parents where person_id = p_person_id;

                IF found_parent_id IS NULL THEN
                        insert into parents (person_id) values (p_person_id) returning id into found_parent_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_parents_interest_id from club_parents_interest where club_person_id = found_club_person_id;

                        IF found_club_parents_interest_id IS NULL THEN
                                insert into club_parents_interest(club_person_id, parent_id) values (found_club_person_id, found_parent_id) returning id into x;
                                delete from club_parents_lead where club_person_id = found_club_person_id;
                                delete from club_parents_prospect where club_person_id = found_club_person_id;
                                delete from club_parents_potential where club_person_id = found_club_person_id;
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_parents_lead(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_parent_id parents.id%TYPE;
        found_club_parents_lead_id club_parents_lead.id%TYPE;
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_parent_id from parents where person_id = p_person_id;

                IF found_parent_id IS NULL THEN
                        insert into parents (person_id) values (p_person_id) returning id into found_parent_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_parents_lead_id from club_parents_lead where club_person_id = found_club_person_id;

                        IF found_club_parents_lead_id IS NULL THEN
                                delete from club_parents_interest where club_person_id = found_club_person_id;
                                insert into club_parents_lead(club_person_id, parent_id) values (found_club_person_id, found_parent_id) returning id into x;
                                delete from club_parents_prospect where club_person_id = found_club_person_id;
                                delete from club_parents_potential where club_person_id = found_club_person_id;
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_parents_prospect(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_parent_id parents.id%TYPE;
        found_club_parents_prospect_id club_parents_prospect.id%TYPE;
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_parent_id from parents where person_id = p_person_id;

                IF found_parent_id IS NULL THEN
                        insert into parents (person_id) values (p_person_id) returning id into found_parent_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_parents_prospect_id from club_parents_prospect where club_person_id = found_club_person_id;

                        IF found_club_parents_prospect_id IS NULL THEN
                                delete from club_parents_interest where club_person_id = found_club_person_id;
                                delete from club_parents_lead where club_person_id = found_club_person_id;
                                insert into club_parents_prospect(club_person_id, parent_id) values (found_club_person_id, found_parent_id) returning id into x;
                                delete from club_parents_potential where club_person_id = found_club_person_id;
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_parents_potential(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_parent_id parents.id%TYPE;
        found_club_parents_potential_id club_parents_potential.id%TYPE;
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_parent_id from parents where person_id = p_person_id;

                IF found_parent_id IS NULL THEN
                        insert into parents (person_id) values (p_person_id) returning id into found_parent_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_parents_potential_id from club_parents_potential where club_person_id = found_club_person_id;

                        IF found_club_parents_potential_id IS NULL THEN
                                delete from club_parents_interest where club_person_id = found_club_person_id;
                                delete from club_parents_lead where club_person_id = found_club_person_id;
                                delete from club_parents_prospect where club_person_id = found_club_person_id;
                                insert into club_parents_potential(club_person_id, parent_id) values (found_club_person_id, found_parent_id) returning id into x;
                        END IF;
                END IF;
        END IF;
END;
$$;





CREATE OR REPLACE PROCEDURE p_insert_club_coach(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_coach_id coaches.id%TYPE;
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_non_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_coaches

        ELSE --we are free to insert into club_coaches
                select id into found_coach_id from coaches where person_id = p_person_id;

                IF found_coach_id IS NULL THEN --if no coach than insert one
                        insert into coaches (person_id) values (p_person_id) returning id into found_coach_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN --if we have a club person than we can insert into club_coaches

                        select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;

                        IF found_club_coach_id IS NULL THEN
                                insert into club_coaches(club_person_id, coach_id) values (found_club_person_id, found_coach_id);
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_coaches_interest(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_coach_id parents.id%TYPE;
        found_club_coaches_interest_id club_coaches_interest.id%TYPE;
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_coach_id from coaches where person_id = p_person_id;

                IF found_coach_id IS NULL THEN
                        insert into coaches (person_id) values (p_person_id) returning id into found_coach_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_coaches_interest_id from club_coaches_interest where club_person_id = found_club_person_id;

                        IF found_club_coaches_interest_id IS NULL THEN
                                insert into club_coaches_interest(club_person_id, coach_id) values (found_club_person_id, found_coach_id) returning id into x;
                                delete from club_coaches_lead where club_person_id = found_club_person_id;
                                delete from club_coaches_prospect where club_person_id = found_club_person_id;
                                delete from club_coaches_potential where club_person_id = found_club_person_id;
                        END IF;
                END IF;
        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_insert_club_coaches_lead(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_coach_id parents.id%TYPE;
        found_club_coaches_lead_id club_coaches_lead.id%TYPE;
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_coach_id from coaches where person_id = p_person_id;

                IF found_coach_id IS NULL THEN
                        insert into coaches (person_id) values (p_person_id) returning id into found_coach_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_coaches_lead_id from club_coaches_lead where club_person_id = found_club_person_id;

                        IF found_club_coaches_lead_id IS NULL THEN
                                delete from club_coaches_interest where club_person_id = found_club_person_id;
                                insert into club_coaches_lead(club_person_id, coach_id) values (found_club_person_id, found_coach_id) returning id into x;
                                delete from club_coaches_prospect where club_person_id = found_club_person_id;
                                delete from club_coaches_potential where club_person_id = found_club_person_id;
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_coaches_prospect(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_coach_id parents.id%TYPE;
        found_club_coaches_prospect_id club_coaches_prospect.id%TYPE;
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_coach_id from coaches where person_id = p_person_id;

                IF found_coach_id IS NULL THEN
                        insert into coaches (person_id) values (p_person_id) returning id into found_coach_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_coaches_prospect_id from club_coaches_prospect where club_person_id = found_club_person_id;

                        IF found_club_coaches_prospect_id IS NULL THEN
                                delete from club_coaches_interest where club_person_id = found_club_person_id;
                                delete from club_coaches_lead where club_person_id = found_club_person_id;
                                insert into club_coaches_prospect(club_person_id, coach_id) values (found_club_person_id, found_coach_id) returning id into x;
                                delete from club_coaches_potential where club_person_id = found_club_person_id;
                        END IF;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_club_coaches_potential(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_coach_id parents.id%TYPE;
        found_club_coaches_potential_id club_coaches_potential.id%TYPE;
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_players

        ELSE --we are free to insert

                select id into found_coach_id from coaches where person_id = p_person_id;

                IF found_coach_id IS NULL THEN
                        insert into coaches (person_id) values (p_person_id) returning id into found_coach_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN

                        select id into found_club_coaches_potential_id from club_coaches_potential where club_person_id = found_club_person_id;

                        IF found_club_coaches_potential_id IS NULL THEN
                                delete from club_coaches_interest where club_person_id = found_club_person_id;
                                delete from club_coaches_lead where club_person_id = found_club_person_id;
                                delete from club_coaches_prospect where club_person_id = found_club_person_id;
                                insert into club_coaches_potential(club_person_id, coach_id) values (found_club_person_id, found_coach_id) returning id into x;
                        END IF;
                END IF;
        END IF;
END;
$$;




CREATE OR REPLACE PROCEDURE p_insert_club_manager(p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_manager_id managers.id%TYPE;
        found_club_manager_id club_managers.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
BEGIN
        x := -101;

        CALL p_check_for_non_member_status(p_person_id, x); --check for non member status

        IF x = -102 THEN --we have non member so do not do insert into club_managers

        ELSE --we are free to insert into club_managers
                select id into found_manager_id from managers where person_id = p_person_id;

                IF found_manager_id IS NULL THEN --if no manager than insert one
                        insert into managers (person_id) values (p_person_id) returning id into found_manager_id;
                END IF;

                select id into found_club_person_id from club_persons where person_id = p_person_id;

                IF found_club_person_id > 0 THEN --if we have a club person than we can insert into club_managers

                        select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;

                        IF found_club_manager_id IS NULL THEN
                                insert into club_managers(club_person_id, manager_id) values (found_club_person_id, found_manager_id);
                        END IF;
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

CREATE OR REPLACE PROCEDURE p_delete_club_player_interest(p_person_id int,INOUT x int)
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
                	x := -102;

		ELSE
                        delete from club_players_interest where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_player_lead(p_person_id int,INOUT x int)
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
                        x := -102;

                ELSE
                        delete from club_players_lead where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_player_prospect(p_person_id int,INOUT x int)
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
                        x := -102;

                ELSE
                        delete from club_players_prospect where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_player_potential(p_person_id int,INOUT x int)
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
                        x := -102;

                ELSE
                        delete from club_players_potential where club_person_id = found_club_person_id;
                        x := -101;
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

CREATE OR REPLACE PROCEDURE p_delete_club_parent_interest(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_parent_id team_club_parents.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;

                IF found_club_parent_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_parents_interest where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_parent_lead(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_parent_id team_club_parents.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;

                IF found_club_parent_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_parents_lead where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_parent_prospect(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_parent_id team_club_parents.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;

                IF found_club_parent_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_parents_prospect where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_club_parent_potential(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_parent_id club_parents.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_parent_id team_club_parents.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;

                IF found_club_parent_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_parents_potential where club_person_id = found_club_person_id;
                        x := -101;
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


CREATE OR REPLACE PROCEDURE p_delete_club_coach_interest(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_coach_id team_club_coaches.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;

                IF found_club_coach_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_coaches_interest where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_coach_lead(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_coach_id team_club_coaches.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;

                IF found_club_coach_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_coaches_lead where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_coach_prospect(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_coach_id team_club_coaches.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;

                IF found_club_coach_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_coaches_prospect where club_person_id = found_club_person_id;
                        x := -101;
                END IF;
        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_delete_club_coach_potential(p_person_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_coach_id club_coaches.id%TYPE;
        found_club_person_id club_persons.id%TYPE;
        found_team_club_coach_id team_club_coaches.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0  THEN

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;

                IF found_club_coach_id > 0 THEN
                        x := -102;

                ELSE
                        delete from club_coaches_potential where club_person_id = found_club_person_id;
                        x := -101;
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
                        j_select_club_players_interest_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_players_lead_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_players_prospect_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_players_potential_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_parents_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_parents_interest_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_parents_lead_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_parents_prospect_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_parents_potential_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_coaches_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_coaches_interest_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_coaches_lead_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_coaches_prospect_id(p_screen_person_id, p_club_id),
                        ',',
                        j_select_club_coaches_potential_id(p_screen_person_id, p_club_id),
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
	
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_team_player(p_family_id int, p_person_id int, p_screen_person_id int, p_team_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id > 0 THEN

		CALL p_check_for_player_non_member_status(p_screen_person_id, x);
		
		IF x = -101 THEN

			CALL p_insert_team_player(p_screen_person_id, p_team_id, x);

                        result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(x),
                                ',',
                                j_select_club_players_id(p_screen_person_id, p_club_id),
                                ',',
                                j_select_team_club_players(p_screen_person_id, p_club_id)
                        );
			RAISE LOG 'p_insert_team_player result_set: %', result_set;
		END IF;

		IF x = -102 THEN
	
              		result_set = CONCAT
                      	(
                               	j_select_persons(p_family_id),
                               	',',
                               	j_select_messages('This person is entered as a non-member. You must remove them from all non-member roles before adding them as a team player.'),
                               	',',
                               	j_select_codes(x)
                       	);
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_insert_team_player_interest(p_family_id int, p_person_id int, p_screen_person_id int, p_team_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_team_player_interest(p_screen_person_id, p_team_id, x);

                IF x = -101 THEN

                        result_set = CONCAT
                        (
                        	j_select_persons(p_family_id),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(x),
                        	',',
                        	j_select_club_players_interest_id(p_screen_person_id, p_club_id),
                        	',',
                        	j_select_team_club_players_interest(p_screen_person_id, p_club_id)
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




CREATE OR REPLACE FUNCTION f_insert_team_parent(p_family_id int, p_person_id int, p_screen_person_id int, p_team_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_team_parent(p_screen_person_id, p_team_id, x);

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

CREATE OR REPLACE FUNCTION f_insert_team_coach(p_family_id int, p_person_id int, p_screen_person_id int, p_team_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_team_coach(p_screen_person_id, p_team_id, x);

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

CREATE OR REPLACE FUNCTION f_insert_team_manager(p_family_id int, p_person_id int, p_screen_person_id int, p_team_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_insert_team_manager(p_screen_person_id, p_team_id, x);

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

CREATE OR REPLACE FUNCTION f_delete_team_player(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int, p_team_club_player_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
                CALL p_delete_team_player(p_team_club_player_id,x);

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
                                j_select_messages('This person is player asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide player.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION f_delete_team_parent(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int, p_team_club_player_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_delete_team_parent(p_team_club_player_id,x);

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
                                j_select_messages('This person is parent asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide parent.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_team_coach(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int, p_team_club_player_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_delete_team_coach(p_team_club_player_id,x);

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
                                j_select_messages('This person is coach asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide coach.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_delete_team_manager(p_family_id int, p_person_id int, p_screen_person_id int, p_club_id int, p_team_club_player_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF p_screen_person_id is NULL THEN
        ELSE
                CALL p_delete_team_manager(p_team_club_player_id,x);

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
                                j_select_messages('This person is manager asscociated with a team or teams at the club. You must remove them from the team or teams before removing them as a club wide manager.'),
                                ',',
                                j_select_codes(x)
                        );
                END IF;

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_team_player(p_person_id int, p_team_id int, INOUT x int)
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

        select id into found_club_person_id from club_persons where person_id = p_person_id;

	IF found_club_person_id > 0 THEN

		select id into found_player_id from players where person_id = p_person_id;
		IF found_player_id IS NULL THEN
			insert into players (person_id) values (p_person_id) returning id into found_player_id;
		END IF;

		select id into found_club_player_id from club_players where club_person_id = found_club_person_id;
		IF found_club_player_id IS NULL THEN
			insert into club_players (club_person_id, player_id) values (found_club_person_id, found_player_id) returning id into found_club_player_id; 
		END IF;

		select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = p_team_id;
		IF found_team_club_person_id IS NULL THEN
			insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, p_team_id) returning id into found_team_club_person_id;
		END IF;

		select id into found_team_club_player_id from team_club_players where club_player_id = found_club_player_id AND team_id = p_team_id;
		IF found_team_club_player_id IS NULL THEN
			insert into team_club_players (club_player_id, team_id) values (found_club_player_id, p_team_id) returning id into x;
		END IF;

	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_team_player_interest(p_person_id int, p_team_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_club_person_id                   club_persons.id%TYPE;
        found_club_player_interest_id          club_players_interest.id%TYPE;
        found_team_club_person_id              team_club_persons.id%TYPE;
        found_team_club_player_interest_id     team_club_players_interest.id%TYPE;
        found_player_id                        players.id%TYPE;

BEGIN
        x := -101;

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                select id into found_player_id from players where person_id = p_person_id;
                IF found_player_id IS NULL THEN
                        insert into players (person_id) values (p_person_id) returning id into found_player_id;
                END IF;

                select id into found_club_player_interest_id from club_players_interest where club_person_id = found_club_person_id;
                IF found_club_player_interest_id IS NULL THEN
                        insert into club_players_interest (club_person_id, player_id) values (found_club_person_id, found_player_id) returning id into found_club_player_interest_id;
                END IF;

                select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = p_team_id;
                IF found_team_club_person_id IS NULL THEN
                        insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, p_team_id) returning id into found_team_club_person_id;
                END IF;

                select id into found_team_club_player_interest_id from team_club_players_interest where club_player_interest_id = found_club_player_interest_id AND team_id = p_team_id;
                IF found_team_club_player_interest_id IS NULL THEN
                        insert into team_club_players_interest (club_player_interest_id, team_id) values (found_club_player_interest_id, p_team_id);
                END IF;

        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_insert_team_parent(p_person_id int, p_team_id int,INOUT x int)
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

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                select id into found_parent_id from parents where person_id = p_person_id;
                IF found_parent_id IS NULL THEN
                        insert into parents (person_id) values (p_person_id) returning id into found_parent_id;
                END IF;

                select id into found_club_parent_id from club_parents where club_person_id = found_club_person_id;
                IF found_club_parent_id IS NULL THEN
                        insert into club_parents (club_person_id, parent_id) values (found_club_person_id, found_parent_id) returning id into found_club_parent_id;
                END IF;

                select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = p_team_id;
                IF found_team_club_person_id IS NULL THEN
                        insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, p_team_id) returning id into found_team_club_person_id;
                END IF;

                select id into found_team_club_parent_id from team_club_parents where club_parent_id = found_club_parent_id AND team_id = p_team_id;
                IF found_team_club_parent_id IS NULL THEN
                        insert into team_club_parents (club_parent_id, team_id) values (found_club_parent_id, p_team_id);
                END IF;

        END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE p_insert_team_coach(p_person_id int, p_team_id int,INOUT x int)
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

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                select id into found_coach_id from coaches where person_id = p_person_id;
                IF found_coach_id IS NULL THEN
                        insert into coaches (person_id) values (p_person_id) returning id into found_coach_id;
                END IF;

                select id into found_club_coach_id from club_coaches where club_person_id = found_club_person_id;
                IF found_club_coach_id IS NULL THEN
                        insert into club_coaches (club_person_id, coach_id) values (found_club_person_id, found_coach_id) returning id into found_club_coach_id;
                END IF;

                select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = p_team_id;
                IF found_team_club_person_id IS NULL THEN
                        insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, p_team_id) returning id into found_team_club_person_id;
                END IF;

                select id into found_team_club_coach_id from team_club_coaches where club_coach_id = found_club_coach_id AND team_id = p_team_id;
                IF found_team_club_coach_id IS NULL THEN
                        insert into team_club_coaches (club_coach_id, team_id) values (found_club_coach_id, p_team_id);
                END IF;

        END IF;
END;
$$;


CREATE OR REPLACE PROCEDURE p_insert_team_manager(p_person_id int, p_team_id int,INOUT x int)
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

        select id into found_club_person_id from club_persons where person_id = p_person_id;

        IF found_club_person_id > 0 THEN

                select id into found_manager_id from managers where person_id = p_person_id;
                IF found_manager_id IS NULL THEN
                        insert into managers (person_id) values (p_person_id) returning id into found_manager_id;
                END IF;

                select id into found_club_manager_id from club_managers where club_person_id = found_club_person_id;
                IF found_club_manager_id IS NULL THEN
                        insert into club_managers (club_person_id, manager_id) values (found_club_person_id, found_manager_id) returning id into found_club_manager_id;
                END IF;

                select id into found_team_club_person_id from team_club_persons where club_person_id = found_club_person_id AND team_id = p_team_id;
                IF found_team_club_person_id IS NULL THEN
                        insert into team_club_persons (club_person_id, team_id) values (found_club_person_id, p_team_id) returning id into found_team_club_person_id;
                END IF;

                select id into found_team_club_manager_id from team_club_managers where club_manager_id = found_club_manager_id AND team_id = p_team_id;
                IF found_team_club_manager_id IS NULL THEN
                        insert into team_club_managers (club_manager_id, team_id) values (found_club_manager_id, p_team_id);
                END IF;

        END IF;
END;
$$;



CREATE OR REPLACE PROCEDURE p_delete_team_player(p_team_club_player_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;
	delete from practices_players_availability where practices_players_availability.team_club_player_id = p_team_club_player_id;
	delete from team_club_players where team_club_players.id = p_team_club_player_id;
END;
$$;



CREATE OR REPLACE PROCEDURE p_delete_team_parent(p_team_club_parent_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;

	delete from team_club_parents where team_club_parents.id = p_team_club_parent_id;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_team_coach(p_team_club_coach_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;

	delete from team_club_coaches where team_club_coaches.id = p_team_club_coach_id;
END;
$$;


CREATE OR REPLACE PROCEDURE p_delete_team_manager(p_team_club_manager_id int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
        x := -101;

	delete from team_club_managers where team_club_managers.id = p_team_club_manager_id;
END;
$$;




