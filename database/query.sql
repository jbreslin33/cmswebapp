select * from teams;
select * from team_club_persons;

		select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates,(select pitches.name from pitches where practices.pitch_id = pitches.id) as pitch_name, practices.field_name, clubs.name as club_name, teams.name as team_name, team_club_persons_club_players.id as team_club_persons_club_players_id, persons.first_name, persons.last_name, (select practices_players_availability.availability_id from practices_players_availability where practices_players_availability.practice_id = practices.id) as availability_id
                from practices
                join practice on practice.id=practices.practice_id
                join teams on teams.id=practice.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

                join club_players on club_players.club_person_id=club_persons.id

                join team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id AND team_club_persons_club_players.club_player_id=club_players.id

                where emails_persons.email_id = 21; 

