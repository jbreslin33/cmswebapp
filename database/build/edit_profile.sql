--BEGIN SELECT PROFILES
CREATE OR REPLACE FUNCTION f_profile(email_id_p int, person_id_p int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
	(
		j_select_persons($1),
		',',
		j_select_messages(null),
		',',
		j_select_codes(-102),
		',',
		j_select_profiles($2)
	);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--email_id,person_id,type,active
CREATE OR REPLACE FUNCTION f_update_profile(int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE

                CALL p_update_profile($2,$3,$4,x);

                IF x > 0 THEN
  			RAISE LOG 'log message IF:%', x;
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Profile Updated.'),
                                ',',
                                j_select_codes(-101),
                                ',',
				j_select_profiles($2)
                        );

                ELSE
			RAISE LOG 'log message ELSE:%', x;
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Something went wrong with updating profile. Please try again.'),
                                ',',
                                j_select_codes(-101),
                                ',',
				j_select_profiles($2)
                        );

                END IF;
        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN UPDATE PROFILE
--person_id,type,active
CREATE OR REPLACE PROCEDURE p_update_profile(int,int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        ids INT[];
	found_person_id persons.id%TYPE;
BEGIN

	IF $3 = 2 THEN

		IF $2 = 1 THEN
			select person_id into found_person_id from players where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into players (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 2 THEN
			select person_id into found_person_id from parents where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into parents (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;

	
		IF $2 = 3 THEN
			--RAISE LOG 'log message in 3 %', $1;
			select person_id into found_person_id from coaches where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into coaches (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 4 THEN
			select person_id into found_person_id from managers where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into managers (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;
	
		IF $2 = 5 THEN
			select person_id into found_person_id from administrators where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into administrators (person_id) values ($1) returning id into x;
			END IF;
		ELSE
			--DO NOTHING
		END IF;

	ELSE
		IF $2 = 1 THEN
			delete from players where person_id = $1 returning id into x;  
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 2 THEN
			delete from parents where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 3 THEN
			delete from coaches where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 4 THEN
			delete from managers where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 5 THEN
			delete from administrators where person_id = $1 returning id into x; 
		ELSE
			--DO NOTHING
		END IF;
		RAISE LOG 'log message x:%', x;

	END IF;

EXCEPTION
	WHEN others THEN
        x := -100;
	
END;
$$;
--END UPDATE PROFILE

