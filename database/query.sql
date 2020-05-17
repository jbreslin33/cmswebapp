		select 
			teams.id, teams.name  
	
		from 
			teams 
		where
			teams.club_id = 1;
		
		select 
                      	club_players.id as club_players_id

		from 
			club_players		

		join
			club_persons on club_persons.id=club_players.club_person_id

		join 
			persons on persons.id=club_persons.person_id

		where 
			persons.id = 24 AND club_persons.club_id = 1

		;


		select 
                        team_club_persons.team_id as team_id,
                        team_club_persons_club_players.id as player

			from 
				team_club_persons_club_players
		join
			team_club_persons on team_club_persons.id=team_club_persons_club_players.team_club_person_id

		join    
			club_persons on club_persons.id=team_club_persons.club_person_id


		where 
			club_persons.person_id = 24 AND club_persons.club_id = 1

		;		

