

--BEGIN DELETE TEAM
CREATE OR REPLACE FUNCTION f_delete_team(int, int, int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	found_club_administrator_id club_administrators.id%TYPE;
BEGIN

	select 
		club_administrators.id 
	into 
		found_club_administrator_id 
	from 
		club_administrators 
	join 
		club_persons 
	on 
		club_persons.id=club_administrators.club_person_id 
	where 
		club_persons.person_id = $2;

	if found_club_administrator_id > 0 THEN

		CALL p_delete_team($3,x);

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
                                j_select_messages('Something went wrong while trying to delete team. Sorry.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                        ',',
                        j_select_messages('You do not have permission to delete this team. Only a club administrator can delete a team.'),
                        ',',
                        j_select_codes(-101)
            	);

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_team(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

rec RECORD;

BEGIN
	delete from team_club_players where team_id = $1; 
	delete from team_club_parents where team_id = $1;
	delete from team_club_coaches where team_id = $1;
	delete from team_club_managers where team_id = $1;

	delete from team_club_persons where team_id = $1;

	delete from teams where teams.id = $1 returning id into x; 
END;
$$;
--END DELETE TEAM
