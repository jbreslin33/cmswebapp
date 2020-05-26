
		select practices_players_availability.id, practices_players_availability.practice_id, practices_players_availability.team_club_persons_club_players_id, practices_players_availability.availability_id 

		from 
			practices_players_availability

			join team_club_persons_club_players on team_club_persons_club_players.id=practices_players_availability.team_club_persons_club_players_id
			join team_club_persons on team_club_persons.id=team_club_persons_club_players.team_club_person_id
			join club_persons on club_persons.id=team_club_persons.club_person_id
			join emails_persons on emails_persons.person_id = club_persons.person_id

			where emails_persons.email_id = 21;

			;
	


