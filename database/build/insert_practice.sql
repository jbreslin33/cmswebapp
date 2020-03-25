





--BEGIN INSERT PRACTICE --11                                                               --11
CREATE OR REPLACE FUNCTION f_insert_practice(int,int,date,time,time,time,text,text,int,text,int, date,date,boolean,boolean,boolean,boolean,boolean,boolean,boolean)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
	found_team_club_manager_id team_club_persons_club_managers.id%TYPE;
BEGIN
        select team_club_persons_club_managers.id into found_team_club_manager_id 
	from team_club_persons_club_managers
        join team_club_persons on team_club_persons.id=team_club_persons_club_managers.team_club_person_id
        join teams on teams.id=team_club_persons.team_id
        where teams.id = $2;

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
		IF $8 > 0 THEN
			insert into practice (team_id, start_date, end_date) values ($1,$2,$2) returning id into x;
			insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name, pitch_id) values (x, $2, $3,$4,$5,$6,$7,$9,$8) returning id into x;
		ELSE
			insert into practice (team_id, start_date, end_date) values ($1,$2,$2) returning id into x;
			insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values (x, $2, $3,$4,$5,$6,$7,$9) returning id into x;
		END IF;
		--insert into practices (practice_id,event_date) values (x,$2);
	ELSE
       		IF $8 > 0 THEN
			insert into practice (team_id, start_date, end_date) values ($1,$10,$11) returning id into x;
                ELSE
			insert into practice (team_id, start_date, end_date) values ($1,$10,$11) returning id into x;
                END IF;
	END IF;

	--insert practices
	duration := '1 day'::interval;

        WHILE next_date <= $11 LOOP

        	--next_date := next_date;
		--next_date := next_date + duration;

		SELECT EXTRACT(ISODOW FROM next_date) INTO day_of_week;
		day_of_week := day_of_week;
	
		IF day_of_week = sunday_num OR day_of_week = monday_num OR day_of_week = tuesday_num OR day_of_week = wednesday_num OR day_of_week = thursday_num OR day_of_week = friday_num OR day_of_week = saturday_num THEN
			--you need to check pitch status here now as well....
       			IF $8 > 0 THEN

				insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name, pitch_id) values (x, next_date, $3,$4,$5,$6,$7,$9,$8);
			ELSE
				insert into practices (practice_id, event_date, arrival_time, start_time, end_time, address, coordinates, field_name) values (x, next_date, $3,$4,$5,$6,$7,$9);
			END IF;

			--insert into practices (practice_id,event_date) values (x,next_date);
		ELSE
			--do nothing
		END IF;

		--increment date
		next_date := next_date + duration;
        END LOOP;

END;
$$;
--END INSERT PRACTICE



