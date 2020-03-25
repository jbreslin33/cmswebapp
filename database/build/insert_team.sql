
CREATE OR REPLACE FUNCTION f_insert_team(int,int,int,text)
RETURNS text AS $$
DECLARE
	result_set text;
	DECLARE x int := -1;
	found_club_administrator_id club_administrators.id%TYPE;
	found_club_persons_id club_persons.id%TYPE;
	found_team_id teams.id%TYPE;
BEGIN
	select id into found_team_id from teams where name = $4 AND club_id = $2;  	

        IF found_team_id > 0 THEN

                result_set = CONCAT
                (
                        j_select_messages('Team name already exists.'),
                        ',',
                        j_select_codes(-101)
                        ',',
                        j_select_administrated_clubs($3)
           	);

	ELSE
		--are you a club admin of club $2????
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.club_id = $2 AND club_persons.person_id = $3; 

		IF found_club_administrator_id > 0 THEN

			CALL p_insert_team($2,$4,$3,x);

			IF x > 0 THEN
			       	result_set = CONCAT
        			(
                			j_select_persons($1),
                			',',
                			j_select_messages(null),
                			',',
                			j_select_codes(-100)
        			);

			ELSE
                         	result_set = CONCAT
                                (
                                        j_select_persons($1),
                                        ',',
                                        j_select_messages('Something went wrong with adding team. Sorry!'),
                                        ',',
                                        j_select_codes(-101)
                                );

			END IF;
		ELSE
                        result_set = CONCAT
                        (
                        	j_select_persons($1),
                                ',',
                                j_select_messages('You are not a club administrator. So you cannot add a team to this club.'),
                                ',',
                                j_select_codes(-101)
                      	);

		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT TEAM
