
--select club_administrators.id from club_administrators join club_members on club_members.id=club_administrators.club_member_id where club_members.person_id = 1;

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 
select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, pitches.name as pitch_name, practices.field_name, teams.name as team_name
	                from practices
	
	                join teams on teams.id=practices.team_id
	                join pitches on pitches.club_id=teams.club_id



	                join team_club_coaches on team_club_coaches.team_id=teams.id
	                join club_coaches on club_coaches.id=team_club_coaches.club_coach_id
	                join coaches on coaches.id=club_coaches.coach_id
	                join persons on persons.id=coaches.person_id

	                join emails_persons on emails_persons.person_id=persons.id
	
	                where emails_persons.email_id = 1 AND practices.event_date > now() - interval '1 day'

union

select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, pitches.name as pitch_name, practices.field_name, teams.name as team_name
                        from practices

                        join teams on teams.id=practices.team_id
                        join pitches on pitches.club_id=teams.club_id

                        join team_club_coaches on team_club_coaches.team_id=teams.id
                        join club_coaches on club_coaches.id=team_club_coaches.club_coach_id
                        join coaches on coaches.id=club_coaches.coach_id
                        join persons on persons.id=coaches.person_id

                        join emails_persons on emails_persons.person_id=persons.id

                        where emails_persons.email_id = 1 AND practices.event_date > now() - interval '1 day';



select persons.id from persons
;
