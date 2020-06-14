
select 
	* 
from 
	team_club_persons_club_players	
;

select 
	persons.first_name, persons.last_name, games_players_availability.availability_id 
from 
	team_club_persons_club_players
left outer join games_players_availability on games_players_availability.team_club_persons_club_players_id = team_club_persons_club_players.id 

	join team_club_persons on team_club_persons.id = team_club_persons_club_players.team_club_person_id
	join club_persons on club_persons.id = team_club_persons.club_person_id
	join persons on persons.id = club_persons.person_id
	


		;	

	
