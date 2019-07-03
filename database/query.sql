
--select club_administrators.id from club_administrators join club_members on club_members.id=club_administrators.club_member_id where club_members.person_id = 1;

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

--select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1; 

select practices.id, practices.event_date from practices 
join teams on teams.id=practices.team_id
join team_members on team_members.team_id=teams.id
join club_members on club_members.id=team_members.club_members_id
join persons on persons.id=club_members.person_id
join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1
;  

select practices.id, practices.event_date from games, practices 
join teams on teams.id=practices.team_id
--join games on games.team_id=teams.id
join team_members on team_members.team_id=teams.id
join club_members on club_members.id=team_members.club_members_id
join persons on persons.id=club_members.person_id
join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = 1
;  

select practices.id, practices.event_date, practices.arrival_time, practices.field_name from practices
union
select games.id, games.event_date, games.arrival_time, games.opponent from games
;

select id, event_date, arrival_time, coordinates from practices
union
select id, event_date, arrival_time, opponent from games
;

--select * from practices join games on games.team_id=practices.team_id
--;

