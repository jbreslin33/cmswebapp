

--BEGIN DELETE CLUB
CREATE OR REPLACE FUNCTION f_delete_practice(p_family_id int, p_person_id int, p_team_id int, p_game_id int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	found_team_club_manager_id team_club_managers.id%TYPE;
BEGIN

	select team_club_managers.id into found_team_club_manager_id
       	from teams
        
                join team_club_managers on team_club_managers.team_id = teams.id
               	join club_managers on club_managers.id = team_club_managers.club_manager_id
		join club_persons on club_persons.id = club_managers.club_person_id

	where club_persons.person_id = p_person_id AND teams.id = p_team_id;

	IF found_team_club_manager_id > 0 THEN

		CALL p_delete_practice($3,x);

               	IF x > 0 THEN
		        result_set = CONCAT
                	(
                        	j_select_persons(p_family_id),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(-103) --delete success to stay on screen
                	);

                ELSE
                       	result_set = CONCAT
                        (
                                j_select_persons(p_family_id),
                                ',',
                                j_select_messages('Something went wrong while trying to delete practice. Sorry.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons(p_family_id),
                        ',',
                        j_select_messages('You do not have permission to delete this practice. Only a team manager can delete a practice.'),
                        ',',
                        j_select_codes(-101)
            	);

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_practice(p_practice_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN

	delete from practices_pitches where practice_id = p_practice_id;
	delete from practice_practices where practice_id = p_practice_id;
	delete from teams_practices where practice_id = p_practice_id;
	delete from practices_players_availability where practice_id = p_practice_id; 
	delete from practices where id = p_practice_id returning id into x;

END;
$$;
--END DELETE CLUB
