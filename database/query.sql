
		select 
			teams.name, 
			team_club_persons_club_players.id as player,
			team_club_persons_club_parents.id as parent,
			team_club_persons_club_coaches.id as coach,
			team_club_persons_club_managers.id as manager
			
			from 
				team_club_persons 

		full outer join 
			team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id		
		
		full outer join 
			team_club_persons_club_parents on team_club_persons_club_parents.team_club_person_id=team_club_persons.id		
		
		full outer join 
			team_club_persons_club_coaches on team_club_persons_club_coaches.team_club_person_id=team_club_persons.id		

		full outer join 
			team_club_persons_club_managers on team_club_persons_club_managers.team_club_person_id=team_club_persons.id		

		full outer join 
			teams on teams.id=team_club_persons.team_id			
		
		join    
			club_persons on club_persons.id=team_club_persons.club_person_id
		join    
			persons on persons.id=club_persons.person_id

		where 
			persons.id = 25 AND teams.club_id = 1
		;
