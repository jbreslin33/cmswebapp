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
order by users_clubs_roles.default_timestamp desc;

select * from users_clubs_roles;
