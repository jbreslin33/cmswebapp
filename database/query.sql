
		select practices_players_availability.id, practices_players_availability.practice_id, practices_players_availability.team_club_persons_club_players_id, practices_players_availability.availability_id 

		from 
			practices_players_availability

			join team_club_persons_club_players on team_club_persons_club_players.id=practices_players_availability.team_club_persons_club_players_id
			join team_club_persons on team_club_persons.id=team_club_persons_club_players.team_club_person_id
			join club_persons on club_persons.id=team_club_persons.club_person_id
			join emails_persons on emails_persons.person_id = club_persons.person_id

			where emails_persons.email_id = 21;

			;

	select 
		persons.first_name, persons.last_name, games_players_availability.id 

	from 
		games_players_availability

	join team_club_persons_club_players on team_club_persons_club_players.id = games_players_availability.team_club_persons_club_players_id
	join club_players on club_players.id = team_club_persons_club_players.club_player_id
	join club_persons on club_persons.id = club_players.club_person_id
	join persons on persons.id = club_persons.person_id
		
	where
		game_id = 1;	

                select games_players_availability.id, games_players_availability.game_id, games_players_availability.team_club_persons_club_players_id, games_players_availability.availability_id

                from
                        games_players_availability

                        left outer join team_club_persons_club_players on team_club_persons_club_players.id=games_players_availability.team_club_persons_club_players_id
                        left outer join team_club_persons on team_club_persons.id=team_club_persons_club_players.team_club_person_id
                        left outer join club_persons on club_persons.id=team_club_persons.club_person_id
                        left outer join emails_persons on emails_persons.person_id = club_persons.person_id

                        where games_players_availability.game_id = 1 
			;
	
	select 
		* 
	from 
		team_club_persons_club_players
	left outer join games_players_availability on games_players_availability.team_club_persons_club_players_id = team_club_persons_club_players.id 

		;	

