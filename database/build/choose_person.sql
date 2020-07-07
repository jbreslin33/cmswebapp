--BEGIN CHOOSE PERSON
CREATE OR REPLACE FUNCTION f_choose_person(p_email_id int, p_family_id int)
RETURNS text AS $$
DECLARE
        result_set text;
BEGIN
	result_set = CONCAT
        (
        	j_select_families(p_email_id),
       		',',
        	j_select_persons(p_family_id),
       		',',
               	j_select_messages(null),
                ',',
               	j_select_codes(-100)
       	);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END CHOOSE PERSON
