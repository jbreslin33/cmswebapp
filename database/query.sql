                select team_club_players.id from team_club_players
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id

                where club_persons.club_id = 1
		;

