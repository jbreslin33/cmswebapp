

--BEGIN DELETE PITCH
CREATE OR REPLACE FUNCTION f_delete_pitch(p_family_id int, p_person_id int, p_pitch_id int)
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
		club_persons.person_id = p_person_id;

	if found_club_administrator_id > 0 THEN

		CALL p_delete_pitch(p_pitch_id,x);

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
                                j_select_messages('Something went wrong while trying to delete pitch. Sorry.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons(p_family_id),
                        ',',
                        j_select_messages('You do not have permission to delete this pitch. Only a club administrator can delete a pitch.'),
                        ',',
                        j_select_codes(-101)
            	);

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_pitch(p_pitch_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

rec RECORD;

BEGIN
	delete from games_pitches where pitch_id = p_pitch_id;
	delete from practices_pitches where pitch_id = p_pitch_id;
	delete from clubs_pitches where pitch_id = p_pitch_id;
	delete from pitches where id = p_pitch_id returning id into x;
END;
$$;
--END DELETE PITCH
