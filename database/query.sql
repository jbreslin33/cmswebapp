
		select practices.id, practices.event_date, practice.arrival_time, practice.start_time, practice.end_time, practice.address, practice.coordinates, (select pitches.name from pitches where practice.pitch_id = pitches.id) as pitch_name, practice.field_name, clubs.name as club_name, teams.name as team_name
                from practices
                join practice on practice.id=practices.practice_id
                join teams on teams.id=practice.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

                left outer join pitches on pitches.club_id=teams.club_id

                where emails_persons.email_id = 23 AND practices.event_date > now() - interval '1 day';

