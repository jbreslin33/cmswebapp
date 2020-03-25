--INSERT CLUB MEMBERS
CREATE OR REPLACE PROCEDURE p_insert_club_persons(club_id int,email_id int)
LANGUAGE plpgsql
AS $$
DECLARE
        rec RECORD;
BEGIN
        FOR rec IN
                select persons.id from persons join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = $2
        LOOP
                insert into club_persons (club_id, person_id) values (club_id, rec.id);
        END LOOP;
END;
$$;

--INSERT CLUB ADMINISTRATOR
CREATE OR REPLACE PROCEDURE p_insert_club_administrator(club_person_id_p int, person_id_p int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_administrator_id administrators.id%TYPE;
        found_administrator_id administrators.id%TYPE;
BEGIN
	select id into found_administrator_id from administrators where person_id = person_id_p; 
	IF found_administrator_id > 0 THEN
        	insert into club_administrators (club_person_id,administrator_id) values (club_person_id_p, found_administrator_id) returning id into x;
	ELSE
        	insert into administrators (person_id) values (person_id_p) returning id into returning_administrator_id;
        	insert into club_administrators (club_person_id,administrator_id) values (club_person_id_p, returning_administrator_id) returning id into x;
	END IF;
END;
$$;
--END INSERT CLUB ADMINISTRATOR




