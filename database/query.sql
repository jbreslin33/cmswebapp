                select distinct clubs.id, clubs.name from clubs
                join club_persons on club_persons.club_id=clubs.id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id
                join emails on emails.id=emails_persons.email_id
                where email_id = 24; 

	select team_club_managers.id from team_club_managers 
	join team_club_persons on team_club_persons.id=team_club_managers.team_club_person_id
	join teams on teams.id=team_club_persons.team_id
	where teams.id = 1;

	select team_club_players.id from team_club_players
	join team_club_persons on team_club_persons.id=team_club_players.team_club_person_id
	join club_persons on club_persons.id=team_club_persons.club_person_id
	where club_persons.person_id = 27;

	select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, pitches.name as pitch_name, practices.field_name, teams.name as team_name
	--select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, practices.field_name, teams.name as team_name
                from practices

                join teams on teams.id=practices.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

                left outer join pitches on pitches.club_id=teams.club_id

                where emails_persons.email_id = 34 AND practices.event_date > now() - interval '1 day'
