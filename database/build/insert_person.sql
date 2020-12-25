

--BEGIN INSERT PERSON
CREATE OR REPLACE FUNCTION f_insert_person(TEXT, TEXT, TEXT, TEXT, TEXT, family_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	json_result text; 
BEGIN
	CALL p_insert_person($1,$2,$3,$4,$5,$6,$7,x);

        IF x > 0 THEN
	        result_set = CONCAT
        	(
                	j_select_persons(family_id),
                	',',
                	j_select_messages(null),
                	',',
                	j_select_codes(-101)
        	);

        ELSE
	        result_set = CONCAT
        	(
                	j_select_persons(family_id),
                	',',
                	j_select_messages('Person not added.'),
                	',',
                	j_select_codes(-101)
        	);

        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--I can see maybe if there are no emails_persons associated we need to add one
CREATE OR REPLACE PROCEDURE p_insert_person(first_name TEXT, middle_name TEXT, last_name TEXT, phones TEXT, address TEXT, p_family_id int, p_person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_emails_persons_id integer;
	rec RECORD;
BEGIN
        insert into persons (first_name, middle_name, last_name, phones, address) values (first_name, middle_name, last_name, ARRAY [phones], address) returning id into x;
	select id into found_emails_persons_id from emails_persons where person_id = x;

	IF $7 > 0 THEN
		--old one
		FOR rec IN
			select distinct email_id from emails_persons where person_id = $7
		LOOP
			insert into emails_persons (email_id, person_id) values (rec.email_id, x); 
		END LOOP;
	
	ELSE
		--new one for brand new unaffilated persons
		IF found_emails_persons_id > 0 THEN
			--do nothing		
		ELSE
			--insert an emails_persons
			insert into emails_persons (email_id, person_id) values ($6,x);
		END IF;

		FOR rec IN
			select distinct email_id from emails_persons where person_id = $7
		LOOP
			insert into emails_persons (email_id, person_id) values (rec.email_id, x); 
		END LOOP;

	END IF;

	insert into families_persons (family_id, person_id) values (p_family_id, x);
END;

$$;
--END INSERT PERSON

