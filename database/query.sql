                select
                        distinct games.id as game_id, team_club_players.id as players, persons.first_name, persons.last_name
                from
                        games

                        join teams_games on teams_games.game_id = games.id
                        join team_club_players on team_club_players.team_id = teams_games.team_id
                        join club_players on club_players.id = team_club_players.id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join persons on persons.id = club_persons.person_id
                        join emails_persons on emails_persons.person_id = persons.id

                where
                        games.id = 1 
			;

