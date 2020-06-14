
select 
	* 
from 
	team_club_persons_club_players	
;

select 
	* 
from 
	team_club_persons_club_players
left outer join games_players_availability on games_players_availability.team_club_persons_club_players_id = team_club_persons_club_players.id 

		;	

