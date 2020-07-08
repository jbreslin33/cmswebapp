
CREATE OR REPLACE FUNCTION f_select_club_pitches(p_family_id int, p_club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN

        result_set = CONCAT
        (

                j_select_persons(p_family_id),
                ',',
                j_select_messages(''),
                ',',
                j_select_codes(-101),
                ',',
                j_select_club_pitches(p_club_id)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT TEAM


CREATE OR REPLACE FUNCTION f_insert_pitch(p_family_id int, p_person_id int, p_club_id int, p_name text)
RETURNS text AS $$
DECLARE
	result_set text;
	DECLARE x int := -1;
	found_pitch_id pitches.id%TYPE;
	found_club_administrator_id club_administrators.id%TYPE;
BEGIN
		
	select pitches.id into found_pitch_id 
	from pitches 
		join clubs_pitches on clubs_pitches.pitch_id = pitches.id	
	where name = p_name AND clubs_pitches.club_id = p_club_id;  	

        IF found_pitch_id > 0 THEN

		result_set = CONCAT
                (
                       	j_select_messages('Pitch name already exists.'),
                        ',',
                        j_select_codes(-101),
                        ',',
			j_select_administrated_clubs(p_person_id),
                	',',
                	j_select_club_pitches(p_club_id)
               	);

	ELSE
		--are you a club admin of club $2????
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.club_id = p_club_id AND club_persons.person_id = p_person_id; 

		IF found_club_administrator_id > 0 THEN

			CALL p_insert_pitch(p_club_id,p_name,x);

			IF x > 0 THEN

	                	result_set = CONCAT
                		(
                        		j_select_persons(p_family_id),
                        		',',
                        		j_select_messages(null),
                        		',',
                        		j_select_codes(-101),
                			',',
                			j_select_club_pitches(p_club_id)
                		);

			ELSE
                                result_set = CONCAT
                                (
                                        j_select_persons(p_family_id),
                                        ',',
                                        j_select_messages('Something went wrong with adding pitch. Sorry!'),
                                        ',',
                                        j_select_codes(-101),
                			',',
                			j_select_club_pitches(p_club_id)
                                );

			END IF;
		ELSE

	                result_set = CONCAT
                        (
                        	j_select_persons(p_family_id),
                               	',',
                                j_select_messages('You are not a club administrator. So you cannot add a pitch to this club.'),
                                ',',
                               	j_select_codes(-101),
                		',',
                		j_select_club_pitches(p_club_id)
                     	);

		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_pitch(p_club_id int, p_name text,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_pitch_id pitches.id%TYPE;
BEGIN
        insert into pitches (name) values (p_name) returning id into returning_pitch_id;
	insert into clubs_pitches(club_id, pitch_id) values (p_club_id, returning_pitch_id) returning id into x;
END;
$$;


----------------
--END INSERT PITCH


