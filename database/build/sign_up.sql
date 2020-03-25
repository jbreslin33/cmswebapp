CREATE OR REPLACE FUNCTION f_insert_email(TEXT, TEXT)
RETURNS text AS $$
DECLARE
	DECLARE x int := -1;
        found_email_id emails.id%TYPE;
        found_native_login_id native_logins.id%TYPE;
        returning_insert_native_login_token_id insert_native_login_tokens.id%TYPE;
        message text;
        result_set text;
BEGIN
        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN 
		select id into found_native_login_id from native_logins where email_id = found_email_id;

		IF found_native_login_id > 0 THEN
	                result_set = CONCAT
                	(
                        	j_select_persons(found_email_id),
                        	',',
                        	j_select_messages('That email already has a login associated with it. Would you like to login?'),
                        	',',
                        	j_select_codes(-101)
                	);

		ELSE
			insert into insert_native_login_tokens (email_id, token, expires) values (found_email_id, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN

	                        result_set = CONCAT
                        	(
                               		j_select_persons(found_email_id),
                                	',',
                                	j_select_messages('We sent you a link to your email to finish joining.'),
                                	',',
                                	j_select_codes(-101)
                        	);

			ELSE
                                result_set = CONCAT
                                (
                                        j_select_persons(found_email_id),
                                        ',',
                                        j_select_messages('Something went wrong with process. Sorry! Please try again.'),
                                        ',',
                                        j_select_codes(-101)
                                );

			END IF;
		END IF;
	ELSE
		CALL p_insert_email($1,x);
		IF x > 0 THEN 

			insert into insert_native_login_tokens (email_id, token, expires) values (x, $2, NOW() + interval '1 hour') returning id into returning_insert_native_login_token_id;	
			IF returning_insert_native_login_token_id > 0 THEN
                              	
				result_set = CONCAT
                                (
                                        j_select_persons(x),
                                        ',',
                                        j_select_messages('We sent you a link to your email to finish joining.'),
                                        ',',
                                        j_select_codes(-101)
                                );

			ELSE

                                result_set = CONCAT
                                (
                                        j_select_persons(0),
                                        ',',
                                        j_select_messages('Something went wrong with process. Sorry! Please try again.'),
                                        ',',
                                        j_select_codes(-101)
                                );

			END IF;
		ELSE
		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END SIGN UP

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

