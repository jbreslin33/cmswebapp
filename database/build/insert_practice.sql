
--BEGIN INSERT PRACTICE --11                                                               --11
CREATE OR REPLACE FUNCTION f_insert_practice(int,int,date,time,time,time,text,text,int,text,int, date,date,boolean,boolean,boolean,boolean,boolean,boolean,boolean)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
	found_team_club_manager_id team_club_managers.id%TYPE;
BEGIN
        select team_club_managers.id into found_team_club_manager_id
        from team_club_managers

        	join club_managers on club_managers.id = team_club_managers.club_manager_id
        	join club_persons on club_persons.id = club_managers.club_person_id
        	join teams on teams.id = team_club_managers.team_id

        where teams.id = $2 AND club_persons.person_id = $2;

	IF found_team_club_manager_id > 0 THEN                     --dont need 11 because it is person id
        	CALL p_insert_practice($2,$3,$4,$5,$6,$7,$8,$9,$10,$12,$13,$14,$15,$16,$17,$18,$19,$20,x);
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
                                j_select_messages('Something went wrong with adding practice.'),
                                ',',
                                j_select_codes(-101)
                        );
        	END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                        ',',
                        j_select_messages('You must be a manager of this team to create a practice. Contact your administrator.'),
                        ',',
                        j_select_codes(-101)
                );
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT PRACTICE

--BEGIN INSERT PRACTICE                                                                  --date
CREATE OR REPLACE PROCEDURE p_insert_practice(int,date,time,time,time,text,text,int,text,date,date,boolean,boolean,boolean,boolean,boolean,boolean,boolean,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

next_date DATE := $10;
duration  INTERVAL;
day       INTERVAL;
day_of_week int := -1;

sunday_num    int := -1;
monday_num    int := -1;
tuesday_num   int := -1;
wednesday_num int := -1;
thursday_num  int := -1;
friday_num    int := -1;
saturday_num  int := -1;
	
returning_practice_id practice.id%TYPE;
returning_practices_id practices.id%TYPE;

BEGIN
	IF $12 THEN
		sunday_num = 7;
	END IF;

	IF $13 THEN
		monday_num = 1;
	END IF;

	IF $14 THEN
		tuesday_num = 2;
	END IF;

	IF $15 THEN
		wednesday_num = 3;
	END IF;

	IF $16 THEN
		thursday_num = 4;
	END IF;

	IF $17 THEN
		friday_num = 5;
	END IF;

	IF $18 THEN
		saturday_num = 6;
	END IF;
	
	--insert practice
	IF $10 is null THEN
		
		insert into practice (start_date, end_date) values ($2,$2) returning id into returning_practice_id;
		insert into practices (event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values ($2, $3,$4,$5,$6,$7,$9) returning id into returning_practices_id;

		IF $8 > 0 THEN
			insert into practices_pitches (practice_id, pitch_id) values (returning_practices_id, $8);
		END IF;

		insert into practice_practices (practice_id, practices_id) values (returning_practice_id, returning_practices_id);

	ELSE

		insert into practice (start_date, end_date) values ($10,$11) returning id into returning_practice_id;

	END IF;

	insert into teams_practices (team_id, practice_id) values ($1, returning_practice_id) returning id into x;

	--insert practices
	duration := '1 day'::interval;

        WHILE next_date <= $11 LOOP

		SELECT EXTRACT(ISODOW FROM next_date) INTO day_of_week;
		day_of_week := day_of_week;
	
		IF day_of_week = sunday_num OR day_of_week = monday_num OR day_of_week = tuesday_num OR day_of_week = wednesday_num OR day_of_week = thursday_num OR day_of_week = friday_num OR day_of_week = saturday_num THEN
			--you need to check pitch status here now as well....
			insert into practices (event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values (next_date, $3,$4,$5,$6,$7,$9) returning id into returning_practices_id;

       			IF $8 > 0 THEN
				insert into practices_pitches (practice_id, pitch_id) values (returning_practices_id, $8);
			END IF;

			insert into practice_practices (practice_id, practices_id) values (returning_practice_id, returning_practices_id);

		END IF;

		--increment date
		next_date := next_date + duration;
        END LOOP;

END;
$$;
--END INSERT PRACTICE



