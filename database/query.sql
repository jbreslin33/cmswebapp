                select practices.id
                from practices

                join practice on 
		practice.id=practices.practice_id
                
		join teams on 
		teams.id=practice.team_id

                join team_club_persons on 
		team_club_persons.team_id=teams.id
		

                join club_persons on 
		club_persons.id=team_club_persons.club_person_id

                join clubs on 
		clubs.id=club_persons.club_id

                join persons on 
		persons.id=club_persons.person_id

                join emails_persons on 
		emails_persons.person_id=persons.id

                --join club_players on 
		--club_players.club_person_id=club_persons.id

                join club_managers on 
		club_managers.club_person_id=club_persons.id

                --join team_club_persons_club_players
                --on team_club_persons_club_players.team_club_person_id=team_club_persons.id
                --AND team_club_persons_club_players.club_player_id=club_players.id


                join team_club_persons_club_managers
                on team_club_persons_club_managers.team_club_person_id=team_club_persons.id
                AND team_club_persons_club_managers.club_manager_id=club_managers.id;
		;


