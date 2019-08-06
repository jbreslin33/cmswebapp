 select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, pitches.name as pitch_name, practices.field_name, teams.name as team_name
                from practices

                join teams on teams.id=practices.team_id

                join team_club_players on team_club_players.team_id=teams.id
                join club_players on club_players.id=team_club_players.club_player_id
                join players on players.id=club_players.player_id
                join persons on persons.id=players.person_id
                join pitches on pitches.club_id=teams.club_id

                join emails_persons on emails_persons.person_id=persons.id;

                --where emails_persons.email_id = 1 AND practices.event_date > now() - interval '1 day';


 select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, pitches.name as pitch_name, practices.field_name, teams.name as team_name
                from practices

                join teams on teams.id=practices.team_id
                join pitches on pitches.club_id=teams.club_id;

                --join team_club_players on team_club_players.team_id=teams.id
                --join club_players on club_players.id=team_club_players.club_player_id
                --join players on players.id=club_players.player_id
                --join persons on persons.id=players.person_id

                --join emails_persons on emails_persons.person_id=persons.id;

                --where emails_persons.email_id = 1 AND practices.event_date > now() - interval '1 day';

