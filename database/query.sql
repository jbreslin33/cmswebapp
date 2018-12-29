select users.id, clubs_users.user_id, pitches.name
from 
users
FULL OUTER JOIN clubs_users on clubs_users.user_id=users.id full outer join clubs on clubs.id=clubs_users.club_id full outer join pitches on pitches.club_id=clubs.id
where users.username = 'l';
