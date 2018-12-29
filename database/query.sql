select teams.id, teams.name
from 
users
full outer join teams_users on teams_users.user_id=users.id 
full outer join teams on teams.id=teams_users.team_id 
where users.username = 'l';
