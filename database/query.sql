		select 
			teams.id as team_id, 
			teams.name as team_name, 
			team_club_persons_club_players.id as team_club_persons_club_player_id,
			team_club_persons_club_parents.id as team_club_persons_club_parent_id,
			team_club_persons_club_coaches.id as team_club_persons_club_coach_id,
			team_club_persons_club_managers.id as team_club_persons_club_manager_id
		from 
			teams

		full outer join 
			club_persons on club_persons.club_id=teams.club_id
		full outer join 
			persons on persons.id=club_persons.person_id
		left join 
			team_club_persons on team_club_persons.club_person_id=club_persons.id
		left join 
			team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id
		left join 
			team_club_persons_club_parents on team_club_persons_club_parents.team_club_person_id=team_club_persons.id
		left join 
			team_club_persons_club_coaches on team_club_persons_club_coaches.team_club_person_id=team_club_persons.id
		left join 
			team_club_persons_club_managers on team_club_persons_club_managers.team_club_person_id=team_club_persons.id

		where persons.id = 25 AND teams.club_id = 1
		group by 
			team_name, 
			teams.id, 
			team_club_persons_club_players.id,
			team_club_persons_club_parents.id,
			team_club_persons_club_coaches.id,
			team_club_persons_club_managers.id
			;

		select 
			teams.name, 
			team_club_persons_club_players.id as player
			
			from 
				team_club_persons_club_players
		full outer join 
			team_club_persons on team_club_persons.id=team_club_persons_club_players.team_club_person_id			
		full outer join 
			teams on teams.id=team_club_persons.team_id			

		join    
			club_persons on club_persons.id=team_club_persons.club_person_id
		join    
			persons on persons.id=club_persons.person_id

		where 
			--teams.club_id = 1
			persons.id = 25 AND teams.club_id = 1
		;
		--where persons.id = 25 AND teams.club_id = 1


