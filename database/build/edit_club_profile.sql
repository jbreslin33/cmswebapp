
--BEGIN UPDATE CLUB PROFILE
CREATE OR REPLACE FUNCTION f_update_club_profile(int,int,int,int,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN

        IF $2 is NULL THEN
        ELSE
		--lets check if you are club_admin

                CALL p_update_club_profile($3,$4,$5,x);

                IF x > 0 THEN
                       	result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-101)
                        );

                ELSE
                        result_set = CONCAT
                        (
                                j_select_persons($1),
                                ',',
                                j_select_messages('Something went wrong with setting availability. Please try again.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_update_club_profile(int,int,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        ids INT[];
	found_person_id persons.id%TYPE;
BEGIN

	RAISE LOG 'log message in 1 in p %', $1;
	RAISE LOG 'log message in 2 in p %', $2;
	RAISE LOG 'log message in 3 in p %', $3;

	IF $3 = 2 THEN

		IF $2 = 1 THEN
			select person_id into found_person_id from players where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into players (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 2 THEN
			select person_id into found_person_id from parents where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into parents (person_id) values ($1);
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
				insert into coaches (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;


		IF $2 = 4 THEN
			select person_id into found_person_id from managers where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into managers (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;
	
		IF $2 = 5 THEN
			select person_id into found_person_id from administrators where person_id = $1; 
			IF found_person_id > 0  THEN
				-- DO NOTHING
			ELSE
				insert into administrators (person_id) values ($1);
			END IF;
		ELSE
			--DO NOTHING
		END IF;

	ELSE
		IF $2 = 1 THEN
			delete from players where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 2 THEN
			delete from parents where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 3 THEN
			delete from coaches where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 4 THEN
			delete from managers where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;

		IF $2 = 5 THEN
			delete from administrators where person_id = $1; 
		ELSE
			--DO NOTHING
		END IF;


	END IF;
	x := 1;

END;
$$;

CREATE OR REPLACE FUNCTION f_club_profile(email_id_p int, person_id_p int, club_id_p int)
RETURNS text AS $$
DECLARE
        result_set text;
	found_club_administrator_id club_administrators.id%TYPE;

BEGIN
	select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.person_id = $2;
	IF found_club_administrator_id > 0 THEN
	        result_set = CONCAT
        	(
                	j_select_persons(email_id_p),
                	',',
                	j_select_messages(null),
                	',',
                	j_select_codes(-102),
                	',',
                	j_select_club_profiles(person_id_p, club_id_p)
        	);
	ELSE
	        result_set = CONCAT
        	(
                	j_select_persons($1),
                	',',
                	j_select_messages('You are not a club administrator.'),
                	',',
                	j_select_codes(-101)
        	);

	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END UPDATE CLUB PROFILE
