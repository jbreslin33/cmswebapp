
--INVITE TO CLUB
CREATE OR REPLACE FUNCTION f_invite_to_club(TEXT, TEXT, int)
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
                                j_select_messages('That email already has a login associated with it. But we added it to your club.'),
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
                                	j_select_messages('We sent an email to your invitee to finish joining.'),
                                	',',
                                	j_select_codes(-100)
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
                                        j_select_messages('We a link to your invitee to finish joining.'),
                                        ',',
                                        j_select_codes(-100)
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
--END INVITE TO CLUB

