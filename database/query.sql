--select teams.id, teams.name
--from users 
--full outer join teams_users on teams_users.user_id=users.id 
--full outer join teams on teams.id=teams_users.team_id 
--where users.username = 'lo';

--insert into users_clubs_roles (users_id,club_id,roles_id,default_timestamp) values (1,1,1,current_timestamp); --luke celta  player

--select * from users_clubs_roles;

select users.id, users_clubs_roles.club_id, users_clubs_roles.default_timestamp
from users 
full outer join users_clubs_roles on users_clubs_roles.users_id=users.id
where users.username = 'l'
order by users_clubs_roles.default_timestamp desc LIMIT 1;

select * from users_clubs_roles;

select affair_date, arrival_time, start_time, end_time, affairs.address, affairs.coordinates, pitches.name, field_name, teams.name, affair_types.name 
from affairs 
full outer join teams on teams.id=affairs.team_id 
full outer join affair_types on affair_types.id=affairs.affair_types_id 
full outer join pitches      on pitches.id=affairs.pitch_id 
where affair_date >= now() 
AND teams.id = 3;

select users.id, users.password
from users
where users.username = 'l';

select users.id, users.password, users_clubs_roles.club_id, users_clubs_roles.roles_id, users_clubs_roles_teams.team_id, users_clubs_roles.default_timestamp
from users
full outer join users_clubs_roles on users_clubs_roles.users_id=users.id
full outer join users_clubs_roles_teams on users_clubs_roles_teams.users_clubs_roles_id=users_clubs_roles.id
where users.username = 'l'
order by users_clubs_roles.default_timestamp desc LIMIT 1;

select team_id, users_clubs_roles.users_id, users.username 
from users_clubs_roles_teams
full outer join users_clubs_roles on users_clubs_roles.id=users_clubs_roles_teams.users_clubs_roles_id
full outer join users on users.id=users_clubs_roles.users_id
; 

select team_id, users_clubs_roles.users_id, users.username 
from users_clubs_roles_teams
full outer join users_clubs_roles on users_clubs_roles.id=users_clubs_roles_teams.users_clubs_roles_id
full outer join users on users.id=users_clubs_roles.users_id
where team_id = 3; 

select pitches.id, pitches.name
from users
full outer join clubs_users on clubs_users.user_id=users.id
full outer join clubs on clubs.id=clubs_users.club_id
full outer join pitches on pitches.club_id=clubs.id
where users.username = 'lo'
and clubs.id = 1 
order by pitches.name asc;

select * from users;
select * from clubs;
select * from teams;
select * from roles;
select * from users_clubs_roles;
select * from users_clubs_roles_teams order by default_timestamp desc;

select users.id, users.password, users_clubs_roles.club_id, users_clubs_roles.roles_id, users_clubs_roles_teams.team_id, users_clubs_roles_teams.default_timestamp
                        from users
                        full outer join users_clubs_roles on users_clubs_roles.users_id=users.id
                        join users_clubs_roles_teams on users_clubs_roles_teams.users_clubs_roles_id=users_clubs_roles.id
			and users.username = 'l'
                        order by users_clubs_roles_teams.default_timestamp desc;

select users_clubs_roles_teams.id, clubs.name, roles.name, roles.id, teams.name, users_clubs_roles_teams.default_timestamp 
                        from users
                        full outer join users_clubs_roles on users_clubs_roles.users_id=users.id
                        join users_clubs_roles_teams on users_clubs_roles_teams.users_clubs_roles_id=users_clubs_roles.id
                        join clubs on clubs.id=users_clubs_roles.club_id 
                        join roles on roles.id=users_clubs_roles.roles_id 
                        join teams on teams.id=users_clubs_roles_teams.team_id 
			where users.username = 's'
                        order by users_clubs_roles_teams.default_timestamp desc;

--insert into users_clubs_roles (users_id,club_id,roles_id) values (5,1,5); --stelian director celta

select users.id, users.username, clubs.id, clubs.name, roles.id, roles.name
from users_clubs_roles_teams
full outer join users_clubs_roles on users_clubs_roles.id=users_clubs_roles_teams.users_clubs_roles_id
full outer join users on users.id=users_clubs_roles.users_id
join clubs on clubs.id=users_clubs_roles.club_id 
join roles on roles.id=users_clubs_roles.roles_id 
where username = 's'; 



                        select affair_date, arrival_time, start_time, end_time, affairs.address, affairs.coordinates, pitches.name, field_name, teams.name, affair_types.name
                        from affairs
                        full outer join teams on teams.id=affairs.team_id
                        full outer join affair_types on affair_types.id=affairs.affair_types_id
                        full outer join pitches on pitches.id=affairs.pitch_id
                        full outer join users_clubs_roles_teams on users_clubs_roles_teams.team_id=teams.id
                        full outer join users_clubs_roles on users_clubs_roles.id=users_clubs_roles_teams.users_clubs_roles_id
                        full outer join users on users.id=users_clubs_roles.users_id
                        where affair_date >= now()
                        and users.username = 'l'
                        order by affair_date asc;



			                        select users_clubs_roles_teams.id, clubs.name, teams.name, roles.name, roles.id, users_clubs_roles_teams.default_timestamp
                        from users
                        full outer join users_clubs_roles on users_clubs_roles.users_id=users.id
                        join users_clubs_roles_teams on users_clubs_roles_teams.users_clubs_roles_id=users_clubs_roles.id
                        join clubs on clubs.id=users_clubs_roles.club_id
                        join roles on roles.id=users_clubs_roles.roles_id
                        join teams on teams.id=users_clubs_roles_teams.team_id
                        where users.username = 'l'
                        order by users_clubs_roles_teams.default_timestamp desc;


select roles.id, roles.name 
from 
users_clubs_roles
join users on users.id=users_clubs_roles.users_id
join roles on roles.id=users_clubs_roles.id
where username = 'l';

select distinct roles.id, roles.name 
from 
roles
join users_clubs_roles on users_clubs_roles.roles_id=roles.id
join users on users.id=users_clubs_roles.users_id
where username = 'l';


                        select affair_date, arrival_time, start_time, end_time, affairs.address, affairs.coordinates, pitches.name, field_name, teams.name, affair_types.name, availability.id 
                        from affairs
                        full outer join teams on teams.id=affairs.team_id
                        full outer join affair_types on affair_types.id=affairs.affair_types_id
                        full outer join pitches on pitches.id=affairs.pitch_id
                        full outer join users_clubs_roles_teams on users_clubs_roles_teams.team_id=teams.id
                        full outer join users_clubs_roles on users_clubs_roles.id=users_clubs_roles_teams.users_clubs_roles_id
                        full outer join users on users.id=users_clubs_roles.users_id
                        full outer join affairs_users_availability on affairs_users_availability.affair_id=affairs.id
                        full outer join availability on availability.id=affairs_users_availability.availability_id
                        where affair_date >= now()
                        and users.username = 'l'
                        order by affair_date asc;




