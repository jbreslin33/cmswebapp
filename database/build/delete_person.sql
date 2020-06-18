
--BEGIN DELETE PERSON
--$result = pg_execute($this->mDatabase->mConnection, "f_delete_person", array( $this->getSenderEmailId(), $this->mPersonId, $delete_person_id));
CREATE OR REPLACE FUNCTION f_delete_person(int, int, int)
RETURNS text AS $$
DECLARE
        result_set text;
	total_persons int;
	DECLARE x int := -111;
	found_team_club_player_id team_club_players.id%TYPE;
BEGIN
	select count(*) into total_persons from emails_persons where email_id = $1;
	IF total_persons > 1 THEN
        
		select team_club_players.id into found_team_club_player_id from team_club_players
        	join team_club_persons on team_club_persons.id=team_club_players.team_club_person_id
        	join club_persons on club_persons.id=team_club_persons.club_person_id
        	where club_persons.person_id = $3;

		IF found_team_club_player_id > 0 THEN
			--we have a player on a team the only way to delete is if the deletor is a team manager
	
		        result_set = CONCAT
        		(
                		j_select_persons($1),
                		',',
                		j_select_messages('You do not have permission to delete Person. They are on a team. Let your team manager know.'),
                		',',
                		j_select_codes(-101)
        		);

			--this is good enough as you should delete players on another screen.

		ELSE
			--no worries this person is not a player on a team go ahead and delete
        		CALL p_delete_person($3,x);

        		IF x > 0 THEN
				result_set = CONCAT
                        	(
                                	j_select_persons($1),
                                	',',
                                	j_select_messages(null),
                                	',',
                                	j_select_codes(-101)
                        	);
        		ELSE
                                result_set = CONCAT
                                (
                                        j_select_persons($1),
                                        ',',
                                        j_select_messages('Something went wrong.'),
                                        ',',
                                        j_select_codes(-101)
                                );

        		END IF;

		END IF;
	ELSE
                result_set = CONCAT
                (
                	j_select_persons($1),
                       	',',
                        j_select_messages('Total persons less than 2 so we cannot delete.'),
                        ',',
                        j_select_codes(-101)
               	);

		--not enuf persons prob get rid of this
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_person(int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	found_team_club_player_id team_club_players.id%TYPE;
BEGIN
	delete from emails_persons where person_id = $1;
	delete from club_persons where person_id = $1;
	delete from persons where id = $1 returning id into x;
END;
$$;
--END DELETE PERSON

