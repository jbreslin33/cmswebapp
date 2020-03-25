

--BEGIN DELETE CLUB
CREATE OR REPLACE FUNCTION f_delete_club(int, int, int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	found_club_administrator_id club_administrators.id%TYPE;
BEGIN

	select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.person_id = $2;

	IF found_club_administrator_id > 0 THEN

		CALL p_delete_club($3,x);

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
                                j_select_messages('Something went wrong while trying to delete club. Sorry.'),
                                ',',
                                j_select_codes(-101)
                        );

                END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                        ',',
                        j_select_messages('You do not have permission to delete this club. Only a club administrator can delete a club.'),
                        ',',
                        j_select_codes(-101)
            	);

	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_club(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        recA RECORD;
        recB RECORD;
        recC RECORD;
        recD RECORD;

BEGIN
	delete from club_emails where club_id = $1;

	--not deleteing below

	--delete from practices_players_availability using team_club_persons, club_persons where club_persons.club_id = $1;
	FOR recA IN
		select id from club_persons where club_id = $1
		
	LOOP
		FOR recB IN
			select id from club_players where club_person_id = recA.id
		LOOP
			FOR recC IN
				select id from team_club_persons_club_players where club_player_id = recB.id
			LOOP
				delete from practices_players_availability where team_club_persons_club_players_id = recC.id;		
			END LOOP;
		END LOOP;			
	END LOOP;	

	--delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from teams where club_id = $1  
        LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where team_id = recA.id	
		LOOP
			delete from team_club_persons_club_players where team_club_person_id = recB.id; 	
		END LOOP;
        END LOOP;

	--delete from club_players using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
        LOOP
			delete from club_players where club_person_id = recA.id; 	
        END LOOP;


	--delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_administrators where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;


	--delete from club_administrators using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
        LOOP
			delete from club_administrators where club_person_id = recA.id; 	
        END LOOP;


	--delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_players  where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;

	--delete from practices using practice, teams  where teams.club_id = $1;
        FOR recA IN
		select id from teams where club_id = $1
	LOOP
		FOR recB IN
			select id from practice where team_id = recA.id
		LOOP
			delete from practices where practice_id = recB.id;	
		END LOOP;
	END LOOP;

	--delete from practice using teams where teams.club_id = $1;
        FOR recA IN
		select id from teams where club_id = $1
	LOOP
		delete from practice where team_id = recA.id;	
	END LOOP;
			
	--delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_administrators where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;


	--delete from team_club_persons_club_managers using club_managers, club_persons  where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		FOR recB IN
			select team_club_persons.id from team_club_persons where club_person_id = recA.id	
		LOOP
			delete from team_club_persons_club_managers where team_club_person_id = recB.id; 	
		END LOOP;
	END LOOP;

	--delete from team_club_persons using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		delete from team_club_persons where club_person_id = recA.id;
	END LOOP;

	--delete from club_managers using club_persons where club_persons.club_id = $1;
        FOR recA IN
		select id from club_persons where club_id = $1  
	LOOP
		delete from club_managers where club_person_id = recA.id;
	END LOOP;

	delete from club_persons where club_id = $1;
	delete from teams where club_id = $1;
	delete from pitches where club_id = $1;
	delete from clubs where id = $1 returning id into x;

END;
$$;
--END DELETE CLUB
