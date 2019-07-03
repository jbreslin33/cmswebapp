
--select club_administrators.id from club_administrators join club_members on club_members.id=club_administrators.club_member_id where club_members.person_id = 1;

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

select practices.id, practices.event_date, practices.arrival_time from practices 
join teams on teams.id=practices.team_id
join team_members on team_members.team_id=teams.id
join club_members on club_members.id=team_members.club_members_id
join persons on persons.id=club_members.person_id
join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1
;  


select games.id, games.event_date, games.arrival_time from games 
join teams on teams.id=games.team_id
join team_members on team_members.team_id=teams.id
join club_members on club_members.id=team_members.club_members_id
join persons on persons.id=club_members.person_id
join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1
;  
