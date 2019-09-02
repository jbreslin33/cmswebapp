 select team_club_persons.id from team_club_persons
        join club_persons on club_persons.id=team_club_persons.club_person_id
        where club_persons.person_id = 1;

	        select club_managers.id from club_managers
        join club_persons on club_persons.id=club_managers.club_person_id
        where club_persons.person_id = 1;

select distinct teams.id, teams.name from teams
	join team_club_persons on team_club_persons.team_id=teams.id
	join club_persons on club_persons.id=team_club_persons.club_person_id
	join clubs on clubs.id=club_persons.club_id
	join persons on persons.id=club_persons.person_id
	join emails_persons on emails_persons.person_id=persons.id
	where persons.id = 1 AND clubs.id = 1; 

select clubs.id, clubs.name from clubs join club_emails on club_emails.club_id=clubs.id where club_emails.email_id = 1;

select clubs.id, clubs.name from clubs 
join club_persons on club_persons.club_id=clubs.id 
join persons on persons.id=club_persons.person_id
where persons.id = 1;
