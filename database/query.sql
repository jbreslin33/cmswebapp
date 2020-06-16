                select games.id, games.event_date, games.arrival_time, games.start_time, games.end_time, games.address, games.coordinates, pitches.name as pitch_name, games.field_name, clubs.name as club_name, teams.name as team_name, teams.id as team_id, team_club_persons_club_players.id as team_club_persons_club_players_id, persons.first_name, persons.last_name,

                team_club_persons_club_players.id as players, team_club_persons_club_parents.id as parents, team_club_persons_club_coaches.id as coaches, team_club_persons_club_managers.id as managers
                from games

                join teams_games on teams_games.game_id = games.id
                join games_pitches on games_pitches.game_id = games.id
                join pitches on pitches.id = games_pitches.pitch_id
                join teams on teams.id = teams_games.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id
                join club_players on club_players.club_person_id=club_persons.id

                left outer join team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id
                left outer join team_club_persons_club_parents on team_club_persons_club_parents.team_club_person_id=team_club_persons.id
                left outer join team_club_persons_club_coaches on team_club_persons_club_coaches.team_club_person_id=team_club_persons.id
                left outer join team_club_persons_club_managers on team_club_persons_club_managers.team_club_person_id=team_club_persons.id

                where emails_persons.email_id = 21	
		;
