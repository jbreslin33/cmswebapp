--GOOGLE LOGIN
CREATE OR REPLACE FUNCTION f_google_login(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT)
RETURNS text AS $$
DECLARE
	
        found_email_id emails.id%TYPE;
        found_google_login_id google_logins.id%TYPE;
        found_email_person_id emails_persons.id%TYPE;
        found_person_id persons.id%TYPE;
        found_club_id clubs.id%TYPE;
        
	found_club_invite_token invite_club_emails.club_invite_token%TYPE;
        
	returning_person_id integer;

        result_set text;
	DECLARE x int := -111;
BEGIN

        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN --do an update and if no person or user do an insert on them
        	SELECT id INTO found_google_login_id FROM google_logins
        	WHERE email_id = found_email_id;
		IF found_google_login_id THEN
			update google_logins set id_token = $3   
			where id = found_google_login_id; 
		ELSE
			insert into google_logins (email_id, google_id, id_token) values (found_email_id, $2, $3);
		END IF;

                SELECT id INTO found_email_person_id FROM emails_persons
                WHERE email_id = found_email_id;
                IF found_email_person_id > 0 THEN
			--do nothing
                ELSE
        		insert into persons (first_name, last_name) values ($4,$5) returning id into found_person_id;
                        insert into emails_persons (email_id,person_id) values (found_email_id,found_person_id);
                END IF;

        ELSE --if there is no email then logically you cannot have the other tables so do a full insert, also we wont have an invite as we would have made an insert into email
		CALL p_insert_google_login($1,$2,$3,$4,$5,x);
		found_email_id = x;
	END IF;


        IF found_email_id > 0 THEN
        	result_set = CONCAT
		(
			found_email_id,
			',',
			j_select_families(found_email_id),
			',',
			j_select_messages(null),
			',',
			j_select_codes(-100)
		);
        ELSE
        	result_set = CONCAT
		(
			--j_select_families(found_email_id),
			--',',
			j_select_messages('Could not find email.'),
			',',
			j_select_codes(-101)
		);
        END IF;

	IF $6 is NULL THEN
		--do nothing
	ELSE
		SELECT club_id into found_club_id from invite_club_emails where club_invite_token = $6;
		insert into club_persons (club_id, person_id) values (found_club_id, found_person_id);
	END IF;	

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_google_login(email_name TEXT, google_id text, id_token TEXT, first_name TEXT, last_name TEXT, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	returning_email_id integer;
        returning_google_login_id integer;
	returning_person_id integer;
BEGIN
	insert into emails (email) values (email_name) returning id into x;
        insert into google_logins (email_id, google_id, id_token) values (x, google_id, id_token) returning id into returning_google_login_id;
        insert into persons (first_name, last_name) values (first_name, last_name) returning id into returning_person_id;
	insert into emails_persons (email_id, person_id) values (x, returning_person_id); 
END;
$$;

--NATIVE INSERT LOGIN        SIGNUP
CREATE OR REPLACE FUNCTION f_insert_native_login(token_p TEXT, password TEXT)
RETURNS text AS $$
DECLARE
	found_email_id emails.id%TYPE;
	result_set text;
	DECLARE x int := -1; 
BEGIN

    	SELECT email_id INTO found_email_id FROM insert_native_login_tokens WHERE token = token_p;
	IF found_email_id > 0 THEN
		CALL p_insert_native_login(found_email_id,$2,x);
		IF x > 0 THEN
                        result_set = CONCAT
                        (
				found_email_id,
                                ',',
                        	j_select_persons(found_email_id),
                                ',',
                                j_select_messages(null),
                                ',',
                                j_select_codes(-100)
                       	);
                ELSE
			result_set = CONCAT
                        (
                                found_email_id,
                                ',',
                                j_select_persons(found_email_id),
                                ',',
                                j_select_messages('Something went wrong with signup. Sorry! Please try again.'),
                                ',',
                                j_select_codes(-101)
                        );
		END IF;
	ELSE
                result_set = CONCAT
                (
                	found_email_id,
                        ',',
                        j_select_persons(found_email_id),
                        ',',
                        j_select_messages('Something went wrong. Please resend email email.'),
                       	',',
                       	j_select_codes(-101)
               	);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
