
select 
	* 
from 
	team_club_persons_club_players	
;

select 
	persons.first_name, persons.last_name, games_players_availability.availability_id, games.id
from 
	team_club_persons_club_players
left outer join games_players_availability on games_players_availability.team_club_persons_club_players_id = team_club_persons_club_players.id 

	join team_club_persons on team_club_persons.id = team_club_persons_club_players.team_club_person_id
	join club_persons on club_persons.id = team_club_persons.club_person_id
	join persons on persons.id = club_persons.person_id

	join games on games.id = games_players_availability.game_id

where 

	games.id = 1


		;	

                select distinct games.id, team_club_persons_club_players.id as team_club_persons_club_players_id, persons.first_name, persons.last_name,
                team_club_persons_club_players.id as players, games_players_availability.availability_id
                from games

                join teams on teams.id=games.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join clubs on clubs.id=club_persons.club_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id
                join club_players on club_players.club_person_id=club_persons.id

                join team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id
		full outer join games_players_availability on games_players_availability.team_club_persons_club_players_id = team_club_persons_club_players.id 

		--where emails_persons.email_id = 21 
		where games.id = 1 
		--AND team_club_persons_club_players.id > 0 


		;
	
