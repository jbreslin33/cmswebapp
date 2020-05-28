

--BEGIN DELETE CLUB
CREATE OR REPLACE FUNCTION f_delete_practice(int, int, int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	found_team_club_persons_club_manager_id team_club_persons_club_managers.id%TYPE;
BEGIN

	--select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.person_id = $2;
	select
        	team_club_persons_club_managers.id
	into  
       		found_team_club_persons_club_manager_id 
	from
        	teams
        join
                team_club_persons
        on
                team_club_persons.team_id = teams.id
        join
               	club_persons
        on
                club_persons.id = team_club_persons.club_person_id

        join
                team_club_persons_club_managers
        on
                team_club_persons_club_managers.team_club_person_id = team_club_persons.id

        where
                club_persons.person_id = $2 AND teams.id = $3;



	IF found_team_club_persons_club_manager_id > 0 THEN

		CALL p_delete_practice($3,x);

               	IF x > 0 THEN
		        result_set = CONCAT
                	(
                        	j_select_persons($1),
                        	',',
                        	j_select_messages(null),
                        	',',
                        	j_select_codes(-103) --delete success to stay on screen
                	);

                ELSE
                       	result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Something went wrong while trying to delete practice. Sorry.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                        ',',
                        j_select_messages('You do not have permission to delete this practice. Only a team manager can delete a practice.'),
                        ',',
                        j_select_codes(-101)
            	);

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_practice(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN

	delete from practices_players_availability where practice_id = $1; 
	delete from practices where id = $1 returning id into x;

END;
$$;
--END DELETE CLUB
