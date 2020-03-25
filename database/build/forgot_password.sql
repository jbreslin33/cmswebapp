--FORGOT PASSWORD
CREATE OR REPLACE FUNCTION f_insert_forgot_password(TEXT, TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
        returning_forgot_passwords_id forgot_passwords.id%TYPE;
        result_set text;
BEGIN
        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN 
		delete from forgot_passwords where email_id = found_email_id; 
		insert into forgot_passwords (email_id, forgot_password_token, expires) values (found_email_id, $2, NOW() + interval '1 hour') returning id into returning_forgot_passwords_id;	
		IF returning_forgot_passwords_id > 0 THEN
		        result_set = CONCAT
                	(
                        	found_email_id,
                        	',',
                        	j_select_messages('We sent you an email to change password.'),
                        	',',
                        	j_select_codes(-101)
                	);

		ELSE
                        result_set = CONCAT
                        (
                                found_email_id,
                                ',',
                                j_select_messages('Something went wrong with process. Sorry! Please try again.'),
                                ',',
                                j_select_codes(-101)
                        );

		END IF;
	ELSE
                result_set = CONCAT
                (
                	found_email_id,
                       	',',
                        j_select_messages('That email does not exist in our system. Please try a valid email address.'),
                        ',',
                        j_select_codes(-101)
               	);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

-- UPDATE FORGOT PASSWORD
CREATE OR REPLACE FUNCTION f_update_forgot_password(update_forgot_password_token TEXT, password TEXT)
RETURNS text AS $$
DECLARE
        found_email_id forgot_passwords.email_id%TYPE;
        found_native_login_id native_logins.id%TYPE;
        result_set text;
        DECLARE x int := -1;
BEGIN
        SELECT email_id INTO found_email_id FROM forgot_passwords WHERE expires > NOW() and forgot_password_token = update_forgot_password_token;
        IF found_email_id > 0 THEN
		--we need to check if you have a native login associated with email if not insert one
		SELECT id INTO found_native_login_id FROM native_logins WHERE email_id = found_email_id;		
        	IF found_native_login_id > 0 THEN
			update native_logins set password = CRYPT($2, GEN_SALT('md5')) where email_id = found_email_id;     
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
                                        j_select_messages('Something went wrong can you submit a new request please?'),
                                        ',',
                                        j_select_codes(-101)
                                );
			END IF;
		END IF;
        ELSE
                result_set = CONCAT
                (
			found_email_id,
                       	',',
               		j_select_persons(found_email_id),
                        ',',
                        j_select_messages('Something went wrong can you submit a new request please?'),
                        ',',
                        j_select_codes(-101)
               	);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
