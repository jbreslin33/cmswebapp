                select distinct games_players_availability.id, games_players_availability.game_id, games_players_availability.team_club_player_id, games_players_availability.availability_id

                from
                        games_players_availability

                        join team_club_players on team_club_players.id=games_players_availability.team_club_player_id
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join emails_persons on emails_persons.person_id = club_persons.person_id

                        where games_players_availability.game_id = 1
			;

		select team_club_managers.id 
		
		from team_club_managers
		
			join teams on teams.id = team_club_managers.team_id
			join teams_games on teams_games.team_id = teams.id
			join games on teams_games.team_id = teams.id
			join club_managers on club_managers.id = team_club_managers.club_manager_id
			join club_persons on club_persons.id = club_managers.club_person_id
			where games.id = 1 AND club_persons.person_id = 25 
			
		;

                select team_club_managers.id into found_team_club_manager_id

                from team_club_managers

                        join teams on teams.id = team_club_managers.team_id
                        join teams_games on teams_games.team_id = teams.id
                        join games on teams_games.team_id = teams.id
                        join club_managers on club_managers.id = team_club_managers.club_manager_id
                        join club_persons on club_persons.id = club_managers.club_person_id
                        where games.id = 1 AND club_persons.person_id = 25
                        ;

			

