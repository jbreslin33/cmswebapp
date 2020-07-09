
--INSERT CLUB
CREATE OR REPLACE PROCEDURE p_insert_club(p_family_id int, p_person_id int, p_name TEXT, p_address TEXT, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_club_person_id integer;
        returning_club_id integer;
        found_club_person_id integer;
BEGIN
        insert into clubs (name,address) values (p_name, p_address) returning id into returning_club_id;

	--loop for other persons....
	CALL p_insert_club_persons(p_family_id, returning_club_id);

	--get the club_person that is me
	select club_persons.id into found_club_person_id from club_persons where club_persons.club_id = returning_club_id AND club_persons.person_id = p_person_id; 

	--then if you found one insert into admistrators and club_administrators
	IF found_club_person_id > 0 THEN 
		CALL p_insert_club_administrator(p_person_id, found_club_person_id,x);
	ELSE
	END IF;
END;
$$;

CREATE OR REPLACE FUNCTION f_insert_club(p_family_id int, p_person_id int, p_name text, p_address text)
RETURNS text AS $$
DECLARE
        found_club_id clubs.id%TYPE;
	DECLARE x int := -1;
	result_set text;
BEGIN
        SELECT id INTO found_club_id FROM clubs
        WHERE name = p_name;

        IF found_club_id > 0 THEN
		result_set = CONCAT
                (
                	j_select_persons(p_family_id),
                        ',',
                       	j_select_messages('Club name already exists.'),
                        ',',
                       	j_select_codes(-101),
                        ',',
	             	j_select_administrated_clubs(p_person_id)

               	);
       	ELSE
		IF p_person_id > 0 THEN

			CALL p_insert_club(p_family_id, p_person_id, p_name, p_address, x);
			IF x > 0 THEN
			        result_set = CONCAT
                		(
                        		j_select_persons(p_family_id),
                        		',',
                        		j_select_messages(null),
                        		',',
                        		j_select_codes(-101),
                        		',',
	             			j_select_administrated_clubs(p_person_id)
                		);
			ELSE
				result_set = CONCAT
                                (
                                        j_select_persons(p_family_id),
                                        ',',
                                        j_select_messages('Something went wrong with adding club. Sorry!'),
                                        ',',
                                        j_select_codes(-101),
                                        ',',
	             			j_select_administrated_clubs()
                                );
			END IF;
		ELSE
			result_set = CONCAT
                        (
                        	j_select_persons(p_family_id),
                                ',',
                                j_select_messages('You must add a person to this account before you add a club.'),
                               	',',
                                j_select_codes(-101),
                               	',',
	             		j_select_administrated_clubs(p_person_id)
                        );
		END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
