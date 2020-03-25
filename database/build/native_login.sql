--NATIVE LOGIN
CREATE OR REPLACE FUNCTION f_native_login(TEXT, TEXT)
RETURNS text AS $$
DECLARE
        found_email_id native_logins.email_id%TYPE;
        found_native_login_id native_logins.id%TYPE;
        result_set text;
BEGIN
        select into found_email_id f_get_native_email_id($1);

        IF found_email_id > 0 THEN
                SELECT id INTO found_native_login_id FROM native_logins
                WHERE email_id = found_email_id AND password = (CRYPT($2, password));

                IF found_native_login_id > 0 THEN
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
                                j_select_messages('Bad password.'),
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
                        j_select_messages('Email does not exist.'),
                        ',',
                        j_select_codes(-101)
                );
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--END NATIVE LOGIN

