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


	--RAISE INFO 'information message %', now() ;
  	--RAISE LOG 'log message %', now();
  	--RAISE DEBUG 'debug message %', now();
  	--RAISE WARNING 'warning message %', now();
  	--RAISE NOTICE 'notice message %', now();

--BEGIN SELECT PITCHES
--email_id, person_id, club_id
CREATE OR REPLACE FUNCTION f_select_pitches_and_teams(int,int,int)
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
		j_select_pitches($3),
               	',',
		j_select_teams_managed($2,$3)
      	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECT FAMILY
CREATE OR REPLACE FUNCTION f_select_family(email_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_families(email_id),
                ',',
                --j_select_persons(email_id),
                --',',
                j_select_messages(null),
                ',',
                j_select_codes(-102)
        );

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT PERSON
CREATE OR REPLACE FUNCTION f_select_person(email_id int, family_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
        result_set = CONCAT
        (
                j_select_persons($2),
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



