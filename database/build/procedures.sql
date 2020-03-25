



--EMAIL
CREATE OR REPLACE FUNCTION f_get_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
BEGIN
        SELECT id INTO found_email_id FROM emails
        WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;


--do we send email link for signup????? 
CREATE OR REPLACE PROCEDURE p_insert_email(email_name TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
BEGIN
	insert into emails (email) values (email_name) returning id into x;
END;
$$;

--insert_native_login  INOUT x int
CREATE OR REPLACE PROCEDURE p_insert_native_login(email_id int, password TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
	returning_person_id integer;
BEGIN
	insert into native_logins (email_id, password) values (email_id, CRYPT($2, GEN_SALT('md5'))) returning id into x;
END;
$$;


--get_native_email
CREATE OR REPLACE FUNCTION f_get_native_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
	found_email_id native_logins.email_id%TYPE;
BEGIN
    	SELECT native_logins.email_id INTO found_email_id FROM native_logins 
	join emails on emails.id=native_logins.email_id
	WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;

--select clubs.id, clubs.name from clubs join club_persons on club_persons.club_id=clubs.id join persons on persons.id=club_persons.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1;





	--RAISE INFO 'information message %', now() ;
  	--RAISE LOG 'log message %', now();
  	--RAISE DEBUG 'debug message %', now();
  	--RAISE WARNING 'warning message %', now();
  	--RAISE NOTICE 'notice message %', now();

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









--BEGIN SELECT PITCHES
CREATE OR REPLACE FUNCTION f_select_pitches_and_teams(email_id_p int,club_id_p int,person_id_p int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_messages(null),
               	',',
                j_select_codes(-102),
               	',',
		j_select_pitches(club_id_p),
               	',',
		j_select_teams_managed(club_id_p, person_id_p)
      	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT PERSON
CREATE OR REPLACE FUNCTION f_select_person(email_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_persons(email_id),
                ',',
                j_select_messages(null),
                ',',
                j_select_codes(-102)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECTED PERSON
CREATE OR REPLACE FUNCTION f_selected_person(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_persons(email_id),
                ',',
                j_select_messages(null),
                ',',
                j_select_codes(-100)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;




--BEGIN SELECT ADMINISTRATED CLUBS
CREATE OR REPLACE FUNCTION f_select_administrated_clubs(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
	
       	result_set = CONCAT
        (
                j_select_messages(null),
               	',',
                j_select_codes(-102),
               	',',
                j_select_administrated_clubs($2)
      	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT CLUBS OF TEAMS MANAGED
CREATE OR REPLACE FUNCTION f_select_clubs_of_teams_managed(email_id int, person_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN

	result_set = CONCAT
        (
                j_select_messages(null),
                ',',
                j_select_codes(-101),
                ',',
		j_select_clubs_of_teams_managed($2)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--------

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
-------



