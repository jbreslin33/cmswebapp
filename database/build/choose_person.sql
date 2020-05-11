--BEGIN CHOOSE PERSON
CREATE OR REPLACE FUNCTION f_choose_person(int,int)
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
               	j_select_roles($2),
                ',',
               	j_select_codes(-100)
       	);
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END CHOOSE PERSON
