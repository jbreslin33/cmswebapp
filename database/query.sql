		select team_club_players.id as team_club_player_id from team_club_players 
			join club_players on club_players.id = team_club_players.club_player_id
			join club_persons on club_persons.id = club_players.club_person_id
			join persons on persons.id = club_persons.person_id
			join emails_persons on emails_persons.person_id = persons.id
		
		where emails_persons.email_id = 21 AND team_club_players.id = 11 
		;


		select distinct families.id, families.name 

		from families
			join families_persons on families_persons.family_id = families.id
			join emails_persons on emails_persons.person_id = families_persons.person_id

		where emails_persons.email_id = 21
		;
			

