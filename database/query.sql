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
                        teams.id as team_id,
                        teams.name as team_name,

                        team_club_persons.id as team_club_person_id,

                        club_players.id as club_players_id,
                        club_parents.id as club_parents_id,
                        club_coaches.id as club_coaches_id,
                        club_managers.id as club_managers_id,

                        team_club_persons_club_players.id as player,
                        team_club_persons_club_parents.id as parent,
                        team_club_persons_club_coaches.id as coach,
                        team_club_persons_club_managers.id as manager

			from 
				teams 

		join team_club_persons on team_club_persons.team_id=teams.id

		join    
			club_persons on club_persons.id=team_club_persons.club_person_id
		
		join    
			club_players on club_players.club_person_id=club_persons.id
		
		join    
			club_parents on club_parents.club_person_id=club_persons.id
		
		join    
			club_coaches on club_coaches.club_person_id=club_persons.id
		
		join    
			club_managers on club_managers.club_person_id=club_persons.id

		join    
			persons on persons.id=club_persons.person_id

		where 
			persons.id = 24 AND teams.club_id = 1
		;

		select * from team_club_persons_club_managers;
