                select
                persons.last_name as last_name,
                persons.first_name as first_name,
                persons.dob as dob,
                persons.id as person_id,
                players.id as player_id,
                parents.id as parent_id,
                coaches.id as coach_id,
                managers.id as manager_id,
                administrators.id as administrator_id

                from persons

                left join players on players.person_id=persons.id
                left join parents on parents.person_id=persons.id
                left join coaches on coaches.person_id=persons.id
                left join managers on managers.person_id=persons.id
                left join administrators on administrators.person_id=persons.id
		where persons.id = 25 
                order by persons.last_name asc;


		select 
			teams.id as team_id, 
			teams.name as team_name, 
			team_club_persons_club_players.id as team_club_persons_club_player_id,
			team_club_persons_club_parents.id as team_club_persons_club_parent_id,
			team_club_persons_club_coaches.id as team_club_persons_club_coach_id,
			team_club_persons_club_managers.id as team_club_persons_club_manager_id
		from 
			teams

		full outer join 
			club_persons on club_persons.club_id=teams.club_id
		full outer join 
			persons on persons.id=club_persons.person_id
		left join 
			team_club_persons on team_club_persons.club_person_id=club_persons.id
		left join 
			team_club_persons_club_players on team_club_persons_club_players.team_club_person_id=team_club_persons.id
		left join 
			team_club_persons_club_parents on team_club_persons_club_parents.team_club_person_id=team_club_persons.id
		left join 
			team_club_persons_club_coaches on team_club_persons_club_coaches.team_club_person_id=team_club_persons.id
		left join 
			team_club_persons_club_managers on team_club_persons_club_managers.team_club_person_id=team_club_persons.id

		
		where persons.id = 25 AND teams.club_id = 1;

