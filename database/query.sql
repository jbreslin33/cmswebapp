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
