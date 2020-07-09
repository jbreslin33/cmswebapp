--INSERT CLUB MEMBERS
CREATE OR REPLACE PROCEDURE p_insert_club_persons(p_family_id int, p_club_id int)
LANGUAGE plpgsql
AS $$
DECLARE
        rec RECORD;
BEGIN
        FOR rec IN
                select persons.id from persons 
			join families_persons on families_persons.person_id=persons.id 
		where families_persons.family_id = p_family_id  
        LOOP
                insert into club_persons (club_id, person_id) values (p_club_id, rec.id);
        END LOOP;
END;
$$;

--INSERT CLUB ADMINISTRATOR
CREATE OR REPLACE PROCEDURE p_insert_club_administrator(p_person_id int, p_club_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_administrator_id administrators.id%TYPE;
        found_administrator_id administrators.id%TYPE;
BEGIN
	select id into found_administrator_id from administrators where person_id = p_person_id; 
	IF found_administrator_id > 0 THEN
        	insert into club_administrators (club_person_id,administrator_id) values (p_club_person_id, found_administrator_id) returning id into x;
	ELSE
        	insert into administrators (person_id) values (p_person_id) returning id into returning_administrator_id;
        	insert into club_administrators (club_person_id, administrator_id) values (p_club_person_id, returning_administrator_id) returning id into x;
	END IF;
END;
$$;
--END INSERT CLUB ADMINISTRATOR




