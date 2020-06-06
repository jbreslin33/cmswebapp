
--INSERT CLUB
CREATE OR REPLACE PROCEDURE p_insert_club(name TEXT, address TEXT, email_id int, person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_club_person_id integer;
        returning_club_id integer;
        returning_club_email_id integer;
        found_club_person_id integer;
BEGIN
        insert into clubs (name,address) values (name,address) returning id into returning_club_id;
	insert into club_emails (club_id, email_id) values (returning_club_id,$3);

	--loop for other persons....
	CALL p_insert_club_persons(returning_club_id,$3);

	--get the club_person that is me
	select club_persons.id into found_club_person_id from club_persons where club_persons.club_id = returning_club_id AND club_persons.person_id = $4; 

	--then if you found one insert into admistrators and club_administrators
	IF found_club_person_id > 0 THEN 
		CALL p_insert_club_administrator(found_club_person_id,$4,x);
	ELSE
	END IF;
END;
$$;

CREATE OR REPLACE FUNCTION f_insert_club(TEXT, TEXT, email_id int, person_id int)
RETURNS text AS $$
DECLARE
        found_club_id clubs.id%TYPE;
	DECLARE x int := -1;
	result_set text;
BEGIN
        SELECT id INTO found_club_id FROM clubs
        WHERE name = $1;

        IF found_club_id > 0 THEN
		result_set = CONCAT
                (
                	j_select_persons(email_id),
                        ',',
                       	j_select_messages('Club name already exists.'),
                        ',',
                       	j_select_codes(-101)
               	);
       	ELSE
		IF person_id > 0 THEN

			CALL p_insert_club($1,$2,email_id,person_id,x);
			IF x > 0 THEN
			        result_set = CONCAT
                		(
                        		j_select_persons(email_id),
                        		',',
                        		j_select_messages(null),
                        		',',
                        		j_select_codes(-101)
                		);
			ELSE
				result_set = CONCAT
                                (
                                        j_select_persons(email_id),
                                        ',',
                                        j_select_messages('Something went wrong with adding club. Sorry!'),
                                        ',',
                                        j_select_codes(-101)
                                );
			END IF;
		ELSE
			result_set = CONCAT
                        (
                        	j_select_persons(email_id),
                                ',',
                                j_select_messages('You must add a person to this account before you add a club.'),
                               	',',
                                j_select_codes(-101)
                        );
		END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
