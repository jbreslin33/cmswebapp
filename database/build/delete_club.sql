

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
                        	j_select_codes(-103)
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
        rec RECORD;
        recA RECORD;
        recB RECORD;
        recC RECORD;
        recD RECORD;

BEGIN
	delete from club_emails where club_id = $1;

	--games_players_availability
        FOR rec IN
                select team_club_players.id from team_club_players
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id

                where club_persons.club_id = $1
        LOOP
                delete from games_players_availability where team_club_player_id = rec.id;
        END LOOP;

	--practices_players_availability
	FOR rec IN
		select team_club_players.id from team_club_players 
			join club_players on club_players.id = team_club_players.club_player_id
			join club_persons on club_persons.id = club_players.club_person_id	
			
		where club_persons.club_id = $1
	LOOP
		delete from practices_players_availability where team_club_player_id = rec.id;		
	END LOOP;	

	--team_club_players
        FOR rec IN
                select team_club_players.id from team_club_players
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id

                where club_persons.club_id = $1
        LOOP
                delete from team_club_players where id = rec.id;
        END LOOP;

	--team_club_parents
        FOR rec IN
                select team_club_parents.id from team_club_parents
                        join club_parents on club_parents.id = team_club_parents.club_parent_id
                        join club_persons on club_persons.id = club_parents.club_person_id

                where club_persons.club_id = $1
        LOOP
                delete from team_club_parents where id = rec.id;
        END LOOP;

        --team_club_coaches
        FOR rec IN
                select team_club_coaches.id from team_club_coaches
                        join club_coaches on club_coaches.id = team_club_coaches.club_coach_id
                        join club_persons on club_persons.id = club_coaches.club_person_id

                where club_persons.club_id = $1
        LOOP
                delete from team_club_coaches where id = rec.id;
        END LOOP;

        --team_club_managers
        FOR rec IN
                select team_club_managers.id from team_club_managers
                        join club_managers on club_managers.id = team_club_managers.club_manager_id
                        join club_persons on club_persons.id = club_managers.club_person_id

                where club_persons.club_id = $1
        LOOP
                delete from team_club_managers where id = rec.id;
        END LOOP;

	--club_players
        FOR rec IN
		select id from club_persons where club_id = $1  
        LOOP
		delete from club_players where club_person_id = rec.id; 	
        END LOOP;
	
	--club_parents
        FOR rec IN
		select id from club_persons where club_id = $1  
        LOOP
		delete from club_parents where club_person_id = rec.id; 	
        END LOOP;
	
	--club_coaches
        FOR rec IN
		select id from club_persons where club_id = $1  
        LOOP
		delete from club_coaches where club_person_id = rec.id; 	
        END LOOP;
	
	--club_managers
        FOR rec IN
		select id from club_persons where club_id = $1  
        LOOP
		delete from club_managers where club_person_id = rec.id; 	
        END LOOP;
	
	--club_administrators
        FOR rec IN
		select id from club_persons where club_id = $1  
        LOOP
		delete from club_administrators where club_person_id = rec.id; 	
        END LOOP;







END;
$$;
--END DELETE CLUB
